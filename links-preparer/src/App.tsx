import { useState } from "react";
import { MaskData, MaskItems } from "./context/MaskItems";
import DefaultPage from "./DefaultPage";
import LinksDisplayer from "./LinksDisplayer";
import useLocalStorage from "./components/hooks/LocalStorage";
import { nameKey, SaveTemplateType, SaveTemplate } from "./context/SaveItems";

const App: React.FC = () => {
  const [maskData, setMaskData] = useState<MaskData>({
    link: "",
    items: [],
    isSet: false,
  });

  const [saveData, setSaveData] = useLocalStorage<SaveTemplateType[]>(
    nameKey,
    []
  );

  return (
    <MaskItems.Provider value={{ maskData, setMaskData }}>
      <SaveTemplate.Provider value={{ saveData, setSaveData }}>
        {maskData.isSet ? <LinksDisplayer /> : <DefaultPage />}
      </SaveTemplate.Provider>
    </MaskItems.Provider>
  );
};

export default App;
