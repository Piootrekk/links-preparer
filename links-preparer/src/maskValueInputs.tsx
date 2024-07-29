import { Input } from "@/components/ui/input";

type MaskValueInputsProps = {
  defaultValueMask?: string;
  defaultValueValue?: string;
};

const MaskValueInputs: React.FC<MaskValueInputsProps> = ({
  defaultValueMask,
  defaultValueValue,
}) => {
  return (
    <div className="flex flex-row flex-wrap">
      <Input
        name="mask"
        placeholder="Name"
        className="w-24 rounded-r-none"
        defaultValue={defaultValueMask}
        required
      />
      <Input
        name="value"
        placeholder="Value"
        className="w-24 rounded-l-none"
        defaultValue={defaultValueValue}
      />
    </div>
  );
};

export default MaskValueInputs;
