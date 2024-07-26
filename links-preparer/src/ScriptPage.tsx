import { ScrollArea } from "@/components/ui/scroll-area";
import { generatedLinks } from "./LinksDisplayer";
import { Separator } from "@/components/ui/separator";
import { temperMonkeyScript } from "./other/tmpScript";

import MaskValueInputs from "./maskValueInputs";
import { useState } from "react";
import { Button } from "./components/ui/button";
import ScriptSetup from "./ScriptSetup";

type ScriptPageProps = {
  links: generatedLinks[];
};

type TMaskValue = {
  defalutValue: string;
};

const ScriptPage: React.FC<ScriptPageProps> = ({ links }) => {
  const [setupConfig, setSetupConfig] = useState<boolean>(false);
  const [maskValues, setMaskValues] = useState<TMaskValue[]>([
    { defalutValue: "" },
  ]);

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
        {!setupConfig && (
          <ScriptAdjustment links={links} maskValues={maskValues} />
        )}
      </div>
        {setupConfig && <ScriptSetup />}
    </>
  );
};

type ScriptAdjustmentProps = {
  links: generatedLinks[];
  maskValues: TMaskValue[];
};

const ScriptAdjustment: React.FC<ScriptAdjustmentProps> = ({
  links,
  maskValues,
}) => {
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
      <div className="flex flex-col gap-4 order-2">
        {maskValues.map((mask, index) => (
          <MaskValueInputs key={index} defaultValueMask={mask.defalutValue} />
        ))}
      </div>

      <div className="flex flex-col gap-2 order-3">
        <textarea
          defaultValue={temperMonkeyScript}
          className="w-[400px] h-[400px] p-4 focus:outline-none border rounded-md text-sm"
        ></textarea>
      </div>
    </>
  );
};

export default ScriptPage;
