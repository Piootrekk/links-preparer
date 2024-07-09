import { createContext, useContext } from "react";

export type MaskData = {
  link: string;
  masks: string[];
  contents: string[];
  isSet: boolean;
};

export const MaskItems = createContext<
  | {
      maskData: MaskData;
      setMaskData: React.Dispatch<React.SetStateAction<MaskData>>;
    }
  | undefined
>(undefined);

const useMaskItems = () => {
  const context = useContext(MaskItems);
  if (!context) {
    throw new Error("useLinksContext must be used within a LinksProvider");
  }
  return context;
};

export default useMaskItems;
