import { useRef, useState } from "react";
import MaskCard, { MaskType } from "./MaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import add from "@/icons/add.svg";
import { v4 as uuidv4 } from "uuid";
import MainPageWrapper from "./wrappers/MainPageWrapper";
import useMaskItems from "./context/MaskItems";
import PopupSave from "./PopupSave";
import SelectSaved from "./SelectSaved";
import { SaveTemplateType } from "./context/SaveItems";

const MockURL = "https://steamcommunity.com/market/listings/730/{NAME}";

const DefaultPage: React.FC = () => {
  const linkRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { maskData, setMaskData } = useMaskItems();
  const [masks, setMasks] = useState<MaskType[]>(
    maskData.items.length
      ? maskData.items.map((item) => ({
          id: uuidv4(),
          mask: { name: "name", defaultValue: item.mask },
          content: {
            name: "content",
            defaultValue: item.contents.join("\n").trim(),
          },
        }))
      : [
          {
            id: uuidv4(),
            mask: { name: "name", defaultValue: "{NAME}" },
            content: { name: "content", defaultValue: "" },
          },
        ]
  );
  const [errors, setErrors] = useState<string[]>(Array(masks.length).fill(""));

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

    setErrors(Array(masks.length).fill(""));
    setMaskData({
      link: linkRef.current!.value,
      items: maskNames.map((mask, index) => ({
        mask: mask,
        contents: contentNames[index].split("\n"),
      })),
      isSet: true,
    });
  };

  const setLink = (newLink: string) => {
    if (linkRef.current) {
      linkRef.current.value = newLink;
    }
  };

  const addMask = () => {
    setMasks([
      ...masks,
      {
        id: uuidv4(),
        mask: { name: "name", defaultValue: "" },
        content: { name: "content", defaultValue: "" },
      },
    ]);
  };

  const removeMask = (id: string) => {
    setMasks((prev) => prev.filter((mask) => mask.id !== id));
  };

  const getFormValues = (): Partial<SaveTemplateType> => {
    const dataForm = new FormData(formRef.current!);
    const maskNames = dataForm.getAll("name") as string[];
    const contentNames = dataForm.getAll("content") as string[];

    return {
      items: maskNames.map((mask, index) => ({
        mask: mask,
        contents: contentNames[index].split("\n"),
      })),
      link: linkRef.current ? linkRef.current.value : "",
    };
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
          defaultValue={maskData.link ? maskData.link : MockURL}
          ref={linkRef}
        />
      </div>
      <SelectSaved setMask={setMasks} setLink={setLink} />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-x-4 gap-y-4 w-3/4 pt-16">
          {masks.map((mask, index) => (
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
          <PopupSave getFormValues={getFormValues} />
          <Button variant="outline" type="submit" size="lg">
            Generate
          </Button>
        </div>
      </form>
    </MainPageWrapper>
  );
};

export default DefaultPage;
