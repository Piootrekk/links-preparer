import { Input } from "@/components/ui/input";

type MaskValueInputsProps = {
  defaultValueMask?: string;
};

const MaskValueInputs: React.FC<MaskValueInputsProps> = ({
  defaultValueMask,
}) => {
  return (
    <div className="flex flex-row flex-wrap">
      <Input
        name="mask"
        placeholder="Name"
        className="w-24 rounded-r-none"
        defaultValue={defaultValueMask}
      />
      <Input name="value" placeholder="Value" className="w-24 rounded-l-none" />
    </div>
  );
};

export default MaskValueInputs;
