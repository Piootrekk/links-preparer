//  Do naprawy kiedyśtam

import React, { useState, useRef, useEffect } from "react";

interface TextareaWithHighlightProps {
  highlightWords: string[];
}

const TextareaWithHighlight: React.FC<TextareaWithHighlightProps> = ({
  highlightWords,
}) => {
  const [text, setText] = useState("");
  const highlightRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, [text]);

  const handleScroll = () => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const getHighlightedText = () => {
    let html = text;
    highlightWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      html = html.replace(
        regex,
        "<span class='font-bold text-blue-600'>$1</span>"
      );
    });
    return { __html: html };
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        className="absolute border rounded-md inset-0 w-[400px] h-[400px]  opacity-0 z-10 resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onScroll={handleScroll}
      />
      <div
        ref={highlightRef}
        className="absolute  rounded-md inset-0 w-[400px] border  h-[400px]  whitespace-pre-wrap break-words overflow-hidden pointer-events-none bg-transparent"
        dangerouslySetInnerHTML={getHighlightedText()}
      />
    </div>
  );
};

export default TextareaWithHighlight;
