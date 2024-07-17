import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generatedLinks } from "./LinksDisplayer";
import { temperMonkeyScript } from "./other/tmpScript";
type ScriptPageProps = {
  links: generatedLinks[];
};

const ScriptPage: React.FC<ScriptPageProps> = ({ links }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-5">
      <div className="flex flex-col gap-2 order-1 justify-start">
        {links.map((link, index) => (
          <button key={index}>{link.name}</button>
        ))}
      </div>
      <div className="flex flex-col gap-2 order-2">
        <Input placeholder="Script Name" />
        <Input placeholder="Script Description" />
        <Input placeholder="Script Version" />
      </div>
      <div className="flex flex-col gap-2 order-3   ">
        <Textarea
          placeholder="Script Content"
          defaultValue={temperMonkeyScript}
          className="h-[400px] w-[600px] text-gray-500"
        />
      </div>
    </div>
  );
};

export default ScriptPage;
