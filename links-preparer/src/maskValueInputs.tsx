import { Input } from "@/components/ui/input";

type MaskValueInputsProps = {
  defaultValueMask?: string;
  defaultValueValue?: string;
  requiredMask?: boolean;
  requiredValue?: boolean;
};

const MaskValueInputs: React.FC<MaskValueInputsProps> = ({
  defaultValueMask,
  defaultValueValue,
  requiredMask,
  requiredValue,
}) => {
  return (
    <div className="flex flex-row">
      <Input
        name="mask"
        className="w-24 rounded-r-none"
        defaultValue={defaultValueMask}
        required={requiredMask}
      />
      <Input
        name="value"
        className="w-24 rounded-l-none"
        defaultValue={defaultValueValue}
        required={requiredValue}
      />
    </div>
  );
};

export default MaskValueInputs;
