import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRef, useState } from "react";
import useSaveItems from "./context/SaveItems";

type PopupSaveProps = {
  items: {
    mask: string;
    contents: string[];
  }[];
  link: string;
};

const PopupSave: React.FC<PopupSaveProps> = ({ items, link }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const { saveData, setSaveData } = useSaveItems();

  const handleClick = () => {
    if (inputRef.current?.value === "") {
      setError("Please enter a name");
      return;
    }
    setError("");
    setIsPopoverOpen(false);
    const newName = inputRef.current!.value;
    const newItem = { name: newName, items, link };
    const existingIndex = saveData.findIndex((item) => item.name === newName);
    
    let newSaveData;
    if (existingIndex !== -1) {
      newSaveData = saveData.map((item, index) =>
        index === existingIndex ? newItem : item
      );
    } else {
      newSaveData = [...saveData, newItem];
    }
    setSaveData(newSaveData);
  };

  const handleChange = () => {
    setIsPopoverOpen(!isPopoverOpen);
    setError("");
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" type="button" size="lg">
          Save
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-40 max-w-80">
        <div className="flex flex-col gap-y-4 p-4">
          <Label>Save as:</Label>
          <Input placeholder="Save as" ref={inputRef} />
          <Button variant="outline" size="sm" onClick={handleClick}>
            Save
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopupSave;
