import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import trashcan from "@/icons/trashcan.svg";

export type MaskCardHandle = {
  validate: () => boolean;
  value: { maskName: string; content: string };
};

type ContentProps = {
  onRemove: (id: string) => void;
  id: string;
  defaultValue?: {
    maskName?: string;
    content?: string;
  };
};

const MaskCard = forwardRef<MaskCardHandle, ContentProps>(
  ({ onRemove, id, defaultValue }, ref) => {
    const [error, setError] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      validate: () => {
        const inputValue = inputRef.current?.value || "";
        const textareaValue = textareaRef.current?.value || "";
        const regex = /\{[A-Za-z]+\}/;

        if (!inputValue || inputValue.trim() === "") {
          setError("Mask name cannot be empty");
          return false;
        }
        if (!regex.test(inputValue)) {
          setError("Mask must be in format {MASK}");
          return false;
        }
        if (!textareaValue || textareaValue.trim() === "") {
          setError("Content cannot be empty");
          return false;
        }
        setError("");
        return true;
      },
      get value() {
        return {
          maskName: inputRef.current!.value,
          content: textareaRef.current!.value,
        };
      },
      set value({ maskName, content }) {
        inputRef.current!.value = maskName;
        textareaRef.current!.value = content;
      },
    }));

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
          onClick={() => onRemove(id)}
        />
        <CardHeader>
          <CardTitle className="text-center">LINK MASK</CardTitle>
        </CardHeader>
        <CardContent className="">
          <p className="px-2">Add mask name:</p>
          <Input
            ref={inputRef}
            placeholder="Mask name"
            defaultValue={defaultValue?.maskName || ""}
          />
          <p className="px-2 mt-2">Content:</p>
          <Textarea
            ref={textareaRef}
            placeholder="Content"
            defaultValue={defaultValue?.content || ""}
          />
          {error && (
            <p className="text-red-500 text-sm text-center text-wrap px-2">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }
);

export default MaskCard;
