import DefaultPage from "./DefaultPage";
import { PreparedLinks } from "./types/LinkTemplate";
import useLocalStorage from "./components/hooks/LocalStorage";
import { LinksContext } from "./context/LinksContext";
const App: React.FC = () => {
  const [links, setLinks] = useLocalStorage<PreparedLinks[]>("links", []);
  return (
    <LinksContext.Provider value={{ links, setLinks }}>
      <DefaultPage />
    </LinksContext.Provider>
  );
};

export default App;
