import { useRef, useState } from "react";
import MaskCard, { MaskType } from "./MaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import add from "@/icons/add.svg";
import { v4 as uuidv4 } from "uuid";
import MainPageWrapper from "./wrappers/MainPageWrapper";
import useMaskItems from "./context/MaskItems";

const DefaultPage: React.FC = () => {
  const linkRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { maskData, setMaskData } = useMaskItems();
  const [mask, setMask] = useState<MaskType[]>(
    maskData.masks.length
      ? maskData.masks.map((mask, index) => ({
          id: uuidv4(),
          mask: { name: "name", defaultValue: mask },
          content: { name: "content", defaultValue: maskData.contents[index] },
        }))
      : [
          {
            id: uuidv4(),
            mask: { name: "name", defaultValue: "{NAME}" },
            content: { name: "content", defaultValue: "" },
          },
        ]
  );

  const [errors, setErrors] = useState<string[]>(Array(mask.length).fill(""));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const dataForm = new FormData(formRef.current!);
    const maskNames = dataForm.getAll("name") as string[];
    const contentNames = dataForm.getAll("content") as string[];
    let hasError = false;
    let errors: string[] = [];

    maskNames.forEach((name, index) => {
      if (!name) {
        errors[index] = "Mask is required";
        hasError = true;
      } else if (!linkRef.current?.value.includes(name)) {
        errors[index] = "Mask not found in link";
        hasError = true;
      } else {
        errors[index] = "";
      }
    });

    setErrors(errors);

    if (hasError) return;

    setErrors(Array(mask.length).fill(""));
    setMaskData({
      link: linkRef.current!.value,
      masks: maskNames,
      contents: contentNames,
      isSet: true,
    });
  };

  const addMask = () => {
    setMask([
      ...mask,
      {
        id: uuidv4(),
        mask: { name: "name", defaultValue: "" },
        content: { name: "content", defaultValue: "" },
      },
    ]);
  };

  const removeMask = (id: string) => {
    setMask((prev) => prev.filter((mask) => mask.id !== id));
  };

  return (
    <MainPageWrapper>
      <div className="flex flex-row justify-center items-center w-1/2">
        <p className="text-xl font-semibold whitespace-nowrap mr-4">
          Base URL:
        </p>
        <Input
          placeholder="Base URL"
          className="flex-grow"
          defaultValue={"https://steamcommunity.com/market/listings/730/{NAME}"}
          ref={linkRef}
        />
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-x-4 gap-y-4 w-3/4 pt-16">
          {mask.map((mask, index) => (
            <MaskCard
              key={mask.id}
              {...mask}
              onRemove={removeMask}
              error={errors[index]}
            />
          ))}
          <div className="flex flex-col justify-center items-center min-w-52">
            <button
              type="button"
              className="flex flex-col justify-center items-center cursor-pointer p-2"
              onClick={addMask}
            >
              <img src={add} alt="Add" className="size-12" />
              <p>Add mask</p>
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-5 flex-wrap pt-6">
          <Button variant="outline" type="button" onClick={() => {}} size="lg">
            Save
          </Button>
          <Button variant="outline" type="submit" size="lg">
            Generate
          </Button>
        </div>
      </form>
    </MainPageWrapper>
  );
};

export default DefaultPage;
