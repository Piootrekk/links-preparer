import { PreparedLinks } from "@/types/LinkTemplate";
import { createContext, useContext } from "react";

export const LinksContext = createContext<
  | {
      links: PreparedLinks[];
      setLinks: React.Dispatch<React.SetStateAction<PreparedLinks[]>>;
    }
  | undefined
>(undefined);

const useLinksContext = () => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinksContext must be used within a LinksProvider");
  }
  return context;
};

export default useLinksContext;
