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
    const formData = new FormData(e.currentTarget);

    const doubleInput = config.doubleInput.map((_, index) => ({
      mask: formData.get(`mask-${index}`) as string,
      content: formData.get(`content-${index}`) as string,
    }));

    const script = formData.get("script") as string;
    const newConfig: TConfig = {
      doubleInput,
      script,
    };
    setValue(newConfig);
  };

  const clearCache = () => {
    const data: TConfig = {
      doubleInput: [
        {
          mask: "",
          content: "",
        },
      ],
      script: "",
    };
    setValue(data);
  };

  return (
    <>
      <form
        className="flex flex-row justify-center gap-4 items-center min-w-24 py-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col flex-wrap justify-center items-center min-w-24 py-4 gap-y-2">
          {config &&
            config.doubleInput.map((input, index) => (
              <MaskValueInputs
                index={index}
                key={index}
                defaultValueMask={input.mask}
                defaultValueValue={input.content}
                requiredMask
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
          className="w-[400px] h-[400px] p-4 focus:outline-none border rounded-md text-sm resize"
          name="script"
          defaultValue={config.script}
          required
          spellCheck={false}
        ></textarea>
        <div className="flex flex-col flex-wrap gap-2 p-5 justify-center">
          <Button variant="outline" size="default" type="submit">
            Save setup
          </Button>
          <Button
            variant="outline"
            size="default"
            type="button"
            onClick={clearCache}
          >
            Clear cache
          </Button>
        </div>
      </form>
    </>
  );
};

export default ScriptSetup;

{
  /* <div className="flex flex-col gap-2 order-2 justify-stretch border rounded-md">
<div className="flex items-center space-x-2 justify-end pt-2 pr-4">
  <Label htmlFor="code-switch">
    {isSwitchOn ? "View" : "Editable"}
  </Label>
  <Switch
    id="code-switch"
    checked={isSwitchOn}
    onCheckedChange={handleSwitch}
  />
</div>
<textarea
  defaultValue={config.script}
  className="p-4 focus:outline-none w-[400px] h-[360px] text-sm resize overflow-auto"
  spellCheck={false}
/>
</div> */
}
