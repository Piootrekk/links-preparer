import { useState } from "react";
import { Button } from "./components/ui/button";
import useMaskItems from "./context/MaskItems";
import MainPageWrapper from "./wrappers/MainPageWrapper";
import tampermonkey from "@/icons/tampermonkey.svg";
import { v4 as uuidv4 } from "uuid";
import ScriptPage from "./ScriptPage";

type LinksDipslayerProps = {};
export type generatedLinks = {
  name: string;
  link: string;
};

const LinksDisplayer: React.FC<LinksDipslayerProps> = () => {
  const { maskData, setMaskData } = useMaskItems();
  const [withScript, setWithScript] = useState(false);

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

    if (maskData.items.length === 1) return firstInitLinks;
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

  const links = generatedLinks();

  const prepareScripts = () => {
    setWithScript(!withScript);
  };

  return (
    <>
      <MainPageWrapper>
        <div className="flex flex-row gap-5 justify-between items-center flex-wrap">
          <Button
            variant="outline"
            onClick={abortHandle}
            size="lg"
            className="p-4 py-6 "
          >
            {"< Back"}
          </Button>
          <Button
            variant="outline"
            onClick={prepareScripts}
            className="flex flex-row gap-2 justify-center items-center cursor-pointer p-4 py-6 "
            size="lg"
          >
            <img src={tampermonkey} alt="script" />
            <p>
              scripts <br /> generate
            </p>
          </Button>
        </div>
        {!withScript && (
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              {links.map((link) => (
                <a
                  key={uuidv4()}
                  href={link.link}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </MainPageWrapper>
      {withScript && <ScriptPage links={links} />}
    </>
  );
};

export default LinksDisplayer;
