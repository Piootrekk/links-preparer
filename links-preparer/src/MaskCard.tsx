import { forwardRef, Ref } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "./components/ui/textarea";

type ContentProps = {
  inputRef: Ref<HTMLInputElement>;
  textareaRef: Ref<HTMLTextAreaElement>;
};

const MaskCard = forwardRef<HTMLDivElement, ContentProps>(
  ({ inputRef, textareaRef }, ref) => {
    return (
      <Card ref={ref}>
        <CardHeader>
          <CardTitle className="text-center">MASK</CardTitle>
        </CardHeader>
        <CardContent className="">
          <p className="px-2">Add mask name:</p>
          <Input ref={inputRef} placeholder="Mask name" />
          <p className="px-2 mt-2">Content:</p>
          <Textarea ref={textareaRef} placeholder="Content" />
        </CardContent>
      </Card>
    );
  }
);

export default MaskCard;
