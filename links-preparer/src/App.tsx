// App.tsx
import React, { useState, useRef, createRef } from "react";
import { Input } from "@/components/ui/input";
import add from "@/icons/add.svg";
import MaskCard, { MaskCardHandle } from "./MaskCard";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./components/ui/button";

type ContentRef = {
  ref: React.RefObject<MaskCardHandle>;
  id: string;
};

const App: React.FC = () => {
  const linkRef = useRef<HTMLInputElement>(null);
  const [contentRefs, setContentRefs] = useState<ContentRef[]>([
    {
      ref: createRef<MaskCardHandle>(),
      id: uuidv4(),
    },
  ]);

  const addContent = () => {
    setContentRefs((prevRefs) => [
      ...prevRefs,
      {
        ref: createRef<MaskCardHandle>(),
        id: uuidv4(),
      },
    ]);
  };

  const removeContent = (id: string) => {
    setContentRefs((prevRefs) => prevRefs.filter((ref) => ref.id !== id));
  };

  const handleGenerate = () => {
    let isValid = true;
    contentRefs.forEach((contentRef) => {
      if (contentRef.ref.current) {
        const isCardValid = contentRef.ref.current.validate();
        if (!isCardValid) {
          isValid = false;
        }
      }
    });

    if (isValid) {
      console.log("Generating link...");
    }
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
          {contentRefs.map((contentRef) => (
            <MaskCard
              key={contentRef.id}
              ref={contentRef.ref}
              onRemove={removeContent}
              id={contentRef.id}
            />
          ))}
          <div
            className="flex flex-col justify-center items-center min-w-52 cursor-pointer"
            onClick={addContent}
          >
            <img src={add} alt="Add" className=" size-12 text-green-700" />
            <p>Add mask</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleGenerate}>
          Generate
        </Button>
      </div>
    </>
  );
};

export default App;
