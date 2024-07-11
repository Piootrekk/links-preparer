import { useMemo } from "react";
import { Button } from "./components/ui/button";
import useMaskItems from "./context/MaskItems";
import MainPageWrapper from "./wrappers/MainPageWrapper";

type LinksDipslayerProps = {};
type generatedLinks = {
  name: string;
  link: string;
};

const LinksDisplayer: React.FC<LinksDipslayerProps> = () => {
  const { maskData, setMaskData } = useMaskItems();

  const abortHandle = () => {
    setMaskData((prev) => ({ ...prev, isSet: false }));
  };

  const generatedLinks = () => {
    const generatedLinks: generatedLinks[] = [];

    // First loop for initialize
    const firstInitLinks: generatedLinks[] = [];
    maskData.items[0].contents.forEach((content) => {
      const link = maskData.link.replace(
        maskData.items[0].mask,
        content.trim()
      );
      firstInitLinks.push({ name: content, link });
    });
    for (let i = 1; i < maskData.items.length; i++) {
      const newLinks: generatedLinks[] = [];
      firstInitLinks.forEach((link) => {
        maskData.items[i].contents.forEach((content) => {
          const newLink = link.link.replace(
            maskData.items[i].mask,
            content.trim()
          );
          newLinks.push({ name: link.name + " " + content, link: newLink });
        });
      });
      generatedLinks.push(...newLinks);
    }

    return generatedLinks;
  };

  const links = useMemo(() => generatedLinks(), [maskData]);

  return (
    <MainPageWrapper>
      <Button variant="outline" onClick={abortHandle}>
        {"< Back"}
      </Button>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.link}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </MainPageWrapper>
  );
};

export default LinksDisplayer;
