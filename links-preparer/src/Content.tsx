import { Card, CardContent } from "@/components/ui/card";

type ContentProps = {
  items?: string[];
  links: string[];
};

const Content: React.FC<ContentProps> = ({ links, items }) => {
  return (
    <>
      {links.length > 0 && (
        <Card className="flex justify-center items-center w-3/4">
          <CardContent>
            <div className="flex flex-col justify-center items-center gap-y-4">
              <h2 className="text-2xl font-bold">Generated links:</h2>
              <div className="flex flex-col justify-center items-center gap-y-4 w-full p-12">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    className="underline w-3/4 text-base break-all"
                  >
                    {items ? items[index] : link}
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Content;
