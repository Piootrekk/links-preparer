import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSaveItems from "./context/SaveItems";
import { MaskType } from "./MaskCard";
import { v4 as uuidv4 } from "uuid";
import trashcan from "@/icons/trashcan.svg";

type SelectSavedProps = {
  setMask: (mask: MaskType[]) => void;
  setLink: (link: string) => void;
  setErrors: (errors: string[]) => void;
};

const SelectSaved: React.FC<SelectSavedProps> = ({
  setMask,
  setLink,
  setErrors,
}) => {
  const { saveData } = useSaveItems();

  const handleSelect = (name: string) => {
    const selected = saveData.find((item) => item.name === name);
    if (selected) {
      setMask(
        selected.items.map((item) => ({
          id: uuidv4(),
          mask: { name: "name", defaultValue: item.mask },
          content: { name: "content", defaultValue: item.contents.join("\n") },
        }))
      );
    }
    setLink(selected?.link || "");
    setErrors(Array(selected!.items.length).fill(""));
  };

  const removeTemplate = (name: string) => {
    console.log(`Remove template: ${name}`);
    // Dodaj tutaj logikę usuwania template
  };

  return (
    <div className="flex flex-row justify-center items-center w-1/6">
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="flex-grow">
          <SelectValue placeholder="Select a saved template..." />
        </SelectTrigger>
        <SelectContent className="h-[200px]">
          <SelectGroup>
            <SelectLabel className="border-b text-center">
              Saved templates
            </SelectLabel>
            {saveData.length === 0 && (
              <p className="text-center text-sm pt-2">No saved templates</p>
            )}
            {saveData.map((item) => (
              <SelectItem key={item.name} value={item.name}>
                <div className="flex flex-row gap-4 items-center p-2">
                  <button
                    onClick={() => removeTemplate(item.name)}
                    className="cursor-pointer"
                  >
                    <img
                      src={trashcan}
                      alt="Remove"
                      className="size-4 text-red-700"
                    />
                  </button>
                  <p>{item.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSaved;
