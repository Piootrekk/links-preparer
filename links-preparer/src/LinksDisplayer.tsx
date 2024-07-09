import { Button } from "./components/ui/button";
import useMaskItems from "./context/MaskItems";
import MainPageWrapper from "./wrappers/MainPageWrapper";

type LinksDipslayerProps = {};

const LinksDisplayer: React.FC<LinksDipslayerProps> = () => {
  const { maskData, setMaskData } = useMaskItems();

  const abortHandle = () => {
    setMaskData((prev) => ({ ...prev, isSet: false }));
  };

  return (
    <MainPageWrapper>
      <Button variant="outline" onClick={abortHandle}>
        Back
      </Button>
      <div className="flex flex-col gap-y-4">
        <h2 className="text-2xl font-bold">
          Base Link:
          {maskData.link}
        </h2>
        <div className="flex flex-col gap-y-2">
          {maskData.masks.map((mask, index) => (
            <div key={mask} className="flex flex-col gap-y-1">
              <span className="text-lg font-bold">Mask: {mask}</span>
              <span className="text-lg">
                Content: {maskData.contents[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MainPageWrapper>
  );
};

export default LinksDisplayer;
