import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import trashcan from "@/icons/trashcan.svg";

export type MaskType = {
  id: string;
  mask?: {
    name?: string;
    defaultValue?: string;
  };
  content?: {
    name?: string;
    defaultValue?: string;
  };
};

type MaskCardProps = MaskType & {
  onRemove?: (id: string) => void;
  error?: string;
};

const MaskCard: React.FC<MaskCardProps> = ({
  id,
  mask,
  content,
  onRemove,
  error,
}) => {
  return (
    <Card
      className={`relative max-w-52 border-2 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <img
        src={trashcan}
        alt="Remove"
        className="absolute top-2 right-2 cursor-pointer size-4 text-red-700"
        onClick={() => onRemove && onRemove(id)}
      />
      <CardHeader>
        <CardTitle className="text-center">LINK MASK</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="px-2">Add mask name:</p>
        <Input
          placeholder="Mask name"
          defaultValue={mask?.defaultValue}
          name={mask?.name}
        />
        <p className="px-2 mt-2">Content:</p>
        <Textarea
          placeholder="Content"
          defaultValue={content?.defaultValue}
          name={content?.name}
        />
        {error && (
          <p className="text-red-500 text-sm text-center text-wrap px-2">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MaskCard;
