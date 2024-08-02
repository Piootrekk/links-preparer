import { TFinalScripts } from "./ScriptPage";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

type SaveZipProps = {
  finalScripts: TFinalScripts[];
};

const SaveZip: React.FC<SaveZipProps> = ({ finalScripts }) => {
  const handleSave = () => {
    const zip = new JSZip();
    finalScripts.forEach((script) => {
      zip.file(`${script.name}.user.js`, script.script);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `tampermonkey_scripts-${Date.now()}.zip`);
    });
  };

  return (
    <div className="flex flex-row justify-center items-center min-w-24 py-4 order-3">
      <Button
        type="button"
        variant={"outline"}
        size={"lg"}
        onClick={handleSave}
      >
        Save scripts
      </Button>
    </div>
  );
};

export default SaveZip;
