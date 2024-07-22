import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generatedLinks } from "./LinksDisplayer";

import { Separator } from "@/components/ui/separator";
import EditableDiv from "./components/ui/editable-div";
type ScriptPageProps = {
  links: generatedLinks[];
};

const ScriptPage: React.FC<ScriptPageProps> = ({ links }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-5 ">
      <ScrollArea className="h-[400px] rounded-md border px-2 py-6">
        <h3 className="text-center font-medium leading-none">
          Total: {links.length}
        </h3>
        <div className="p-6">
          {links.map((link, index) => (
            <>
              <button className="w-full text-left" key={index}>
                {link.name}
              </button>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-2 order-2">
        <Input placeholder="Script Name" />
        <Input placeholder="Script Description" />
        <Input placeholder="Script Version" />
      </div>
      <div className="flex flex-col gap-2 order-3">
        <EditableDiv className="p-4 border " />
      </div>
    </div>
  );
};

export default ScriptPage;
