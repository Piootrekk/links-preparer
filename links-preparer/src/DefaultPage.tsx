import { useRef, useState } from "react";
import MaskCard, { MaskType } from "./MaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import add from "@/icons/add.svg";
import { v4 as uuidv4 } from "uuid";

const DefaultPage: React.FC = () => {
  const linkRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [masks, setMasks] = useState<MaskType[]>([
    {
      id: uuidv4(),
      mask: { name: "name", defaultValue: "{NAME}" },
      content: { name: "content", defaultValue: "" },
    },
  ]);

  const handleSetError = (id: string, error: string) => {
    setMasks((prevMasks) =>
      prevMasks.map((mask) => (mask.id === id ? { ...mask, error } : mask))
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const dataForm = new FormData(formRef.current!);
    let hasError = false;

    masks.forEach((mask) => {
      const maskName = dataForm.get(mask.mask?.name || "");
      const contentName = dataForm.get(mask.content?.name || "");

      if (!maskName) {
        handleSetError(mask.id, "Mask name is required.");
        hasError = true;
      } else if (!contentName) {
        handleSetError(mask.id, "Content is required.");
        hasError = true;
      } else {
        handleSetError(mask.id, "");
      }
    });

    if (!hasError) {
      console.log("Form submitted successfully!");
    }
  };

  const addMask = () => {
    const id = uuidv4();
    setMasks([
      ...masks,
      {
        id: id,
        mask: { name: "name", defaultValue: "" },
        content: { name: "content", defaultValue: "" },
      },
    ]);
  };

  const removeMask = (id: string) => {
    setMasks((prev) => prev.filter((mask) => mask.id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center py-20 gap-y-6">
      <h1 className="text-4xl font-bold">Link preparer</h1>
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
          {masks.map((mask) => (
            <MaskCard
              key={mask.id}
              {...mask}
              onRemove={removeMask}
              setError={handleSetError}
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
    </div>
  );
};

export default DefaultPage;
