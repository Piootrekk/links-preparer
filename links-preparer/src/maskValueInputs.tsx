import { Input } from "@/components/ui/input";

type MaskValueInputsProps = {
  index: number;
  defaultValueMask?: string;
  defaultValueValue?: string;
  requiredMask?: boolean;
  requiredValue?: boolean;
  readonlyMask?: boolean;
};

const MaskValueInputs: React.FC<MaskValueInputsProps> = ({
  index,
  defaultValueMask,
  defaultValueValue,
  requiredMask,
  requiredValue,
  readonlyMask,
}) => {
  return (
    <div className="flex flex-row">
      <Input
        name={`mask-${index}`}
        className="w-24 rounded-r-none"
        defaultValue={defaultValueMask}
        required={requiredMask}
        readOnly={readonlyMask}
      />
      <Input
        name={`content-${index}`}
        className="w-24 rounded-l-none"
        defaultValue={defaultValueValue}
        required={requiredValue}
      />
    </div>
  );
};

export default MaskValueInputs;
