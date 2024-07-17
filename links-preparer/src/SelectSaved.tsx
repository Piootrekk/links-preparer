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

type SelectSavedProps = {
  setMask: (mask: MaskType[]) => void;
  setLink: (link: string) => void;
};

const SelectSaved: React.FC<SelectSavedProps> = ({ setMask, setLink }) => {
  const { saveData } = useSaveItems();

  const handleSelect = (name: string) => {
    const selected = saveData.find((item) => item.name === name);
    console.log(selected);
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
  };

  return (
    <div className="flex flex-row justify-center items-center w-1/6 ">
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
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSaved;
