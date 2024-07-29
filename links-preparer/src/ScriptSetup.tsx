import add from "@/icons/add.svg";
import trashcan from "@/icons/trashcan.svg";
import { Button } from "./components/ui/button";

import MaskValueInputs from "./maskValueInputs";
import useLocalStorage from "./components/hooks/LocalStorage";
import useConfigScript, { TConfig } from "./components/hooks/ConfigScript";

type ScriptSetupProps = {};

const ScriptSetup: React.FC<ScriptSetupProps> = () => {
  const [_, setValue] = useLocalStorage<TConfig | {}>("config", {
    doubleInput: [
      {
        mask: "",
        content: "",
      },
    ],
    script: "",
  });
  const { config, incrementDoubleInput, removeLiastDoubleInput } =
    useConfigScript();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDatas = new FormData(e.currentTarget);
    const masks = formDatas.getAll("mask");
    const values = formDatas.getAll("value");
    const script = formDatas.get("script") as string;
    setValue({
      doubleInput: masks.map((mask, index) => ({
        mask: mask as string,
        content: values[index] as string,
      })),
      script,
    });
  };

  return (
    <>
      <form
        className="flex flex-row justify-center gap-4 items-center min-w-24 py-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col justify-center items-center min-w-24 py-4 gap-y-2">
          {config &&
            config.doubleInput.map((input, index) => (
              <MaskValueInputs
                key={index}
                defaultValueMask={input.mask}
                defaultValueValue={input.content}
              />
            ))}
          <div className="flex flex-row justify-center items-center min-w-24 pt-2">
            <button
              type="button"
              onClick={incrementDoubleInput}
              className="flex flex-col justify-center items-center cursor-pointer p-2"
            >
              <img src={add} alt="Add" className="size-8" />
              <p>Add</p>
            </button>
            <button
              type="button"
              className="flex flex-col justify-center items-center cursor-pointer p-2"
              onClick={removeLiastDoubleInput}
            >
              <img src={trashcan} alt="Remove" className="size-8" />
              <p>Remove</p>
            </button>
          </div>
        </div>
        <textarea
          className="w-[400px] h-[400px] p-4 focus:outline-none border rounded-md text-sm"
          name="script"
          defaultValue={config.script}
          required
        ></textarea>
        <div className="flex flex-row flex-wrap gap-2 p-5 justify-center">
          <Button variant="outline" size="default" type="submit">
            Save setup
          </Button>
        </div>
      </form>
    </>
  );
};

export default ScriptSetup;
