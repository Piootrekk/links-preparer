import { Card, CardContent } from "@/components/ui/card";

type ContentProps = {
  links: string[];
};

const Content: React.FC<ContentProps> = ({ links }) => {
  return (
    <>
      {links.length > 0 && (
        <Card>
          <CardContent>
            <div className="flex flex-col justify-center items-center gap-y-4">
              <h2 className="text-2xl font-bold">Generated links:</h2>
              <div className="flex flex-col justify-center items-center gap-y-2">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    className="underline"
                  >
                    {link}
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
