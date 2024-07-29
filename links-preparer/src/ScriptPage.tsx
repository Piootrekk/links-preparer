import { ScrollArea } from "@/components/ui/scroll-area";
import { generatedLinks } from "./LinksDisplayer";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import ScriptSetup from "./ScriptSetup";
import useConfigScript from "./components/hooks/ConfigScript";
import MaskValueInputs from "./maskValueInputs";

type ScriptPageProps = {
  links: generatedLinks[];
};

const ScriptPage: React.FC<ScriptPageProps> = ({ links }) => {
  const [setupConfig, setSetupConfig] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row justify-center items-center min-w-24 py-4">
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={() => setSetupConfig(!setupConfig)}
        >
          {setupConfig ? "Adjustment scripts" : "Setup config"}
        </Button>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-5 ">
        {!setupConfig && <ScriptAdjustment links={links} />}
      </div>
      {setupConfig && <ScriptSetup />}
    </>
  );
};

type ScriptAdjustmentProps = {
  links: generatedLinks[];
};

const ScriptAdjustment: React.FC<ScriptAdjustmentProps> = ({ links }) => {
  const { config } = useConfigScript();

  useEffect(() => {
    console.log(config);
  }, []);

  return (
    <>
      <ScrollArea className="h-[400px] rounded-md border px-2 py-6 order-1">
        <h3 className="text-center font-medium leading-none">
          Total: {links.length}
        </h3>
        <div className="p-6">
          {links.map((link, index) => (
            <div key={index}>
              <button className="w-full text-left  leading-normal hover:text-blue-500 hover:underline ">
                {link.name}
              </button>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-4 order-3">
        {config &&
          config.doubleInput.map((input, index) => (
            <MaskValueInputs
              key={index}
              defaultValueMask={input.mask}
              defaultValueValue={input.content}
            />
          ))}
      </div>
      <div className="flex flex-col gap-2 order-2 justify-stretch">
        <textarea
          defaultValue={config.script}
          className="w-[400px] h-[400px] p-4 focus:outline-none border rounded-md text-sm"
        ></textarea>
      </div>
    </>
  );
};

export default ScriptPage;
