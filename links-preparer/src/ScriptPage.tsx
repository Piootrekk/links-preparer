import { ScrollArea } from "@/components/ui/scroll-area";
import { generatedLinks } from "./LinksDisplayer";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ScriptSetup from "./ScriptSetup";
import useConfigScript from "./components/hooks/ConfigScript";
import MaskValueInputs from "./maskValueInputs";
import SaveZip from "./SaveZip";

type ScriptPageProps = {
  links: generatedLinks[];
};

export type TFinalScripts = {
  script: string;
  name: string;
};

const ScriptPage: React.FC<ScriptPageProps> = ({ links }) => {
  const [setupConfig, setSetupConfig] = useState<boolean>(true);

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
  const scripts = Array.from({ length: links.length }).fill(
    config.script
  ) as string[];

  const [finalScripts, setFinalScripts] = useState<TFinalScripts[]>([]);

  const baseReplaceInScipt = (script: string, name: string, url: string) => {
    return script.replace("{NAME}", name).replace("{LINK}", url);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    scripts.forEach((script, index) => {
      let newScript = script;
      newScript = baseReplaceInScipt(
        newScript,
        links[index].name,
        links[index].link
      );

      config.doubleInput.forEach((_, index) => {
        const mask = formData.get(`mask-${index}`) as string;
        const content = formData.get(`content-${index}`) as string;
        newScript = newScript.replace(mask, content);
      });
      scripts[index] = newScript;
    });
    console.log(scripts);
    setFinalScripts(
      scripts.map((script, index) => ({
        script,
        name: links[index].name,
      }))
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-2/3"
    >
      <ScrollArea className="h-[400px] w-full rounded-md border px-2 py-6 order-1 ">
        <h3 className="text-center font-medium leading-none">
          Total: {links.length}
        </h3>
        <div className="p-2">
          {links.map((link, index) => (
            <div key={index} className="flex flex-col">
              <div
                key={index}
                className="flex flex-row justify-center items-center gap-x-4"
              >
                <a
                  href={link.link}
                  target="_blank"
                  className="w-1/3 text-left  leading-normal hover:text-blue-500 hover:underline"
                >
                  {link.name}
                </a>
                <div className="flex flex-row flex-wrap w-full  justify-end items-center gap-2">
                  {config &&
                    config.doubleInput.map((input, index) => (
                      <MaskValueInputs
                        index={index}
                        key={index}
                        defaultValueMask={input.mask}
                        defaultValueValue={input.content}
                        requiredMask
                        readonlyMask
                        requiredValue
                      />
                    ))}
                </div>
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button
        variant="outline"
        size="lg"
        type="submit"
        className="flex p-4 py-6 my-4 order-2 w-1/3"
      >
        Generate
      </Button>
      {finalScripts.length > 0 && <SaveZip finalScripts={finalScripts} />}
    </form>
  );
};

export default ScriptPage;
