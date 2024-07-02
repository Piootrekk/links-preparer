import { useRef, useState, createRef } from "react";
import Content from "./Content";
import MaskCard, { MaskCardHandle } from "./MaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import add from "@/icons/add.svg";
import { v4 as uuidv4 } from "uuid";

type ContentRef = {
  ref: React.RefObject<MaskCardHandle>;
  id: string;
};

const isMaskInBaseLink = (baseLink: string, mask: string) => {
  return baseLink.includes(mask);
};

const DefaultPage: React.FC = () => {
  const linkRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [links, setLinks] = useState<string[]>([]);
  const [contentRefs, setContentRefs] = useState<ContentRef[]>([
    {
      ref: createRef<MaskCardHandle>(),
      id: uuidv4(),
    },
  ]);

  const addContent = () => {
    setContentRefs((prevRefs) => [
      ...prevRefs,
      {
        ref: createRef<MaskCardHandle>(),
        id: uuidv4(),
      },
    ]);
  };

  const removeContent = (id: string) => {
    setContentRefs((prevRefs) => prevRefs.filter((ref) => ref.id !== id));
  };

  const handleGenerate = () => {
    if (links.length > 0) setLinks([]);
    let isValid = true;
    contentRefs.forEach((contentRef) => {
      if (contentRef.ref.current) {
        const isCardValid = contentRef.ref.current.validate();
        if (!isCardValid) {
          isValid = false;
          return;
        }
        if (
          !isMaskInBaseLink(
            linkRef.current!.value,
            contentRef.ref.current.value.maskName
          )
        ) {
          isValid = false;
          setError("Mask is not in base URL");
          return;
        }
      }
    });

    if (isValid) {
      setLinks([]);
      const dataItems = contentRefs.map((contentRef) => {
        return {
          maskName: contentRef.ref.current!.value.maskName,
          contentValues: contentRef.ref.current!.value.content.split("\n"),
        };
      });
      const links: string[] = [];
      dataItems[0].contentValues.forEach((contentValue) => {
        links.push(
          linkRef.current!.value.replace(
            dataItems[0].maskName,
            contentValue.trim()
          )
        );
      });

      for (let i = 1; i < dataItems.length; i++) {
        const newLinks: string[] = [];
        links.forEach((link) => {
          dataItems[i].contentValues.forEach((contentValue) => {
            newLinks.push(
              link.replace(dataItems[i].maskName, contentValue.trim())
            );
          });
        });
        links.splice(0, links.length, ...newLinks);
      }

      setLinks(links);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center py-20 gap-y-6">
        <h1 className="text-4xl font-bold">Link preparer</h1>
        <div className="flex flex-row justify-center items-center w-1/2">
          <p className="text-xl font-semibold whitespace-nowrap mr-4">
            Base URL:
          </p>
          <Input
            placeholder="Base URL"
            className="flex-grow"
            defaultValue={
              "https://steamcommunity.com/market/listings/730/{NAME}"
            }
            ref={linkRef}
          />
        </div>
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-x-4 gap-y-4 w-3/4 pt-16">
          {contentRefs.map((contentRef) => (
            <MaskCard
              key={contentRef.id}
              ref={contentRef.ref}
              onRemove={removeContent}
              id={contentRef.id}
            />
          ))}
          <div className="flex flex-col justify-center items-center min-w-52 ">
            <button
              className="flex flex-col justify-center items-center cursor-pointer p-2"
              onClick={addContent}
            >
              <img src={add} alt="Add" className=" size-12" />
              <p>Add mask</p>
            </button>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center text-wrap px-2">
            {error}
          </p>
        )}
        <Button variant="outline" onClick={handleGenerate} size="lg">
          Generate
        </Button>
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-x-4 gap-y-4 w-3/4 pt-6">
          {links.length > 0 && <Content links={links} />}
        </div>
      </div>
    </>
  );
};

export default DefaultPage;
