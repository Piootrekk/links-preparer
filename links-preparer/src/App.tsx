import { useState } from "react";
import { MaskData, MaskItems } from "./context/MaskItems";
import DefaultPage from "./DefaultPage";
import LinksDisplayer from "./LinksDisplayer";

const App: React.FC = () => {
  const [maskData, setMaskData] = useState<MaskData>({
    link: "",
    items: [],
    isSet: false,
  });

  return (
    <MaskItems.Provider value={{ maskData, setMaskData }}>
      {maskData.isSet ? <LinksDisplayer /> : <DefaultPage />}
    </MaskItems.Provider>
  );
};

export default App;
