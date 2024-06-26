import React, { useState, useRef, createRef } from "react";
import { Input } from "@/components/ui/input";
import MaskCard from "./MaskCard";

type ContentRefs = {
  inputRef: React.RefObject<HTMLInputElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const App: React.FC = () => {
  const linkRef = useRef<HTMLInputElement>(null);

  const [contentRefs, setContentRefs] = useState<ContentRefs[]>([
    {
      inputRef: createRef<HTMLInputElement>(),
      textareaRef: createRef<HTMLTextAreaElement>(),
    },
  ]);

  const addContent = () => {
    setContentRefs((prevRefs) => [
      ...prevRefs,
      {
        inputRef: createRef<HTMLInputElement>(),
        textareaRef: createRef<HTMLTextAreaElement>(),
      },
    ]);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center py-20 gap-y-6">
        <h1 className="text-4xl font-bold">Link preparer</h1>
        <div className="flex flex-row justify-center items-center w-1/2">
          <p className="text-xl font-semibold whitespace-nowrap mr-4">
            Base URL:
          </p>
          <Input
            placeholder="Base URL"
            className="flex-grow"
            defaultValue={
              "https://steamcommunity.com/market/listings/730/{$NAME}"
            }
            ref={linkRef}
          />
        </div>
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-x-4 gap-y-4 w-3/4 pt-16">
          {contentRefs.map((refs, index) => (
            <MaskCard
              key={index}
              inputRef={refs.inputRef}
              textareaRef={refs.textareaRef}
            />
          ))}
        </div>
        <button onClick={addContent}>Add Content</button>
      </div>
    </>
  );
};

export default App;
