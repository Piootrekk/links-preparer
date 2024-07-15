import { createContext, useContext } from "react";

export type SaveTemplateType = {
  name: string;
  items: {
    mask: string;
    contents: string[];
  }[];
  link: string;
};

export const nameKey = "templates";

export const SaveTemplate = createContext<
  | {
      saveData: SaveTemplateType[];
      setSaveData: React.Dispatch<React.SetStateAction<SaveTemplateType[]>>;
    }
  | undefined
>(undefined);

const useSaveItems = () => {
  const context = useContext(SaveTemplate);
  if (!context) {
    throw new Error("useSaveItems must be used within a SaveTemplateProvider");
  }
  return context;
};

export default useSaveItems;
