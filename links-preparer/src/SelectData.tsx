import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useLinksContext from "./context/LinksContext";

type SelectDataProps = {};

const SelecetData: React.FC<SelectDataProps> = () => {
  const { links } = useLinksContext();
  if (!links || !links.length) {
    return null;
  }
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a saved template" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="bg-bottom border-gray-200">
            Saved templates
          </SelectLabel>
          {links.map((link, index) => (
            <SelectItem value={link.id} key={index}>
              {link.link}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelecetData;
