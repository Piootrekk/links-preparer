import { cn } from "@/lib/utils";
import { useState } from "react";

type EditableDivProps = {
  className?: string;
};

const EditableDiv: React.FC<EditableDivProps> = ({ className }) => {
  const [text, setText] = useState(
    "This is some default text with {CENA} and {URL} that should be highlighted."
  );

  const highlightWords = (inputText: string) => {
    const wordsToHighlight = ["{CENA}", "{URL}"];
    let formattedText = inputText;

    wordsToHighlight.forEach((word) => {
      const regex = new RegExp(`(${word})`, "g");
      formattedText = formattedText.replace(
        regex,
        `<span class="bg-yellow-200 font-bold">$1</span>`
      );
    });

    return formattedText;
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const inputText = e.currentTarget.innerText;
    setText(inputText);
  };

  return (
    <div
      className={cn(
        className,
        "rounded-xl border bg-card text-card-foreground shadow h-[400px] w-[600px] text-gray-500 focus:outline-none"
      )}
      contentEditable
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: highlightWords(text) }}
    ></div>
  );
};

export default EditableDiv;
