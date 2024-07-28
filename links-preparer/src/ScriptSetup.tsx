import add from "@/icons/add.svg";
import trashcan from "@/icons/trashcan.svg";
import { Button } from "./components/ui/button";

import MaskValueInputs from "./maskValueInputs";
import { useState } from "react";
import { temperMonkeyScript } from "./other/tmpScript";

type ScriptSetupProps = {};

const ScriptSetup: React.FC<ScriptSetupProps> = () => {
  const [config, setConfig] = useState<string[]>([""]);

  const addInputs = () => {
    setConfig([...config, ""]);
  };

  const removeLastInput = () => {
    if (config.length > 1) {
      setConfig(config.slice(0, -1));
    }
  };

  return (
    <>
      <form className="flex flex-row justify-center gap-4 items-center min-w-24 py-4">
        <div className="flex flex-col justify-center items-center min-w-24 py-4 gap-y-2">
          {config.map((_, index) => (
            <MaskValueInputs key={index} />
          ))}
          <div className="flex flex-row justify-center items-center min-w-24 pt-2">
            <button
              type="button"
              onClick={addInputs}
              className="flex flex-col justify-center items-center cursor-pointer p-2"
            >
              <img src={add} alt="Add" className="size-8" />
              <p>Add</p>
            </button>
            <button
              type="button"
              className="flex flex-col justify-center items-center cursor-pointer p-2"
              onClick={removeLastInput}
            >
              <img src={trashcan} alt="Remove" className="size-8" />
              <p>Remove</p>
            </button>
          </div>
        </div>
        <textarea
          className="w-[400px] h-[400px] p-4 focus:outline-none border rounded-md text-sm"
          defaultValue={temperMonkeyScript}
          required
        ></textarea>
        <div className="flex flex-row flex-wrap gap-2 p-5 justify-center">
          <Button variant="outline" size="default" type="button">
            Save setup
          </Button>
        </div>
      </form>
    </>
  );
};

export default ScriptSetup;
