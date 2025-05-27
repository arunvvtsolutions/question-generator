import React, { memo, useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import { MainModal } from "./MainModal";

function MarkdownForBot({ content }: { content: string }) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const preprocessLaTeX = useCallback((content: string) => {
    const lineBreakProcessed = content
      .replace(/\\n/g, "\n") // Convert escaped \n to actual newlines
      .replace(/\n\t+/g, "\n&nbsp;&nbsp;&nbsp;&nbsp;") // Replace tabs with spaces
      .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;") // Convert stray tabs
      .replace(/(\d)\s+(\d)/g, "$1\u200B$2"); // Prevent number splitting

    // Ensure "Question X" starts on a separate line
    const questionFormattedContent = lineBreakProcessed.replace(
      /(.*?)(\*\*Question\s*\d+:?\*\*)/gs,
      (_, beforeQuestion, questionHeading) => `${beforeQuestion.trim()}\n\n${questionHeading}\n`
    );

    // 1. Insert line breaks before "**Options:**" if needed.
    //    This replaces any spaces + "**Options:**" with "\n\n**Options:**"
    const optionsTitleFormatted = questionFormattedContent.replace(/\s*\*\*Options:?\*\*\s*/g, "\n\n**Options**\n\n");

    //  removed dynamically picking Ensure **any heading (bold/italic)** starts on a new line
    // const formattedHeadings = optionsTitleFormatted.replace(
    //   /(\n)?(\*{2,3}[\w\s]+:\*{2,3})/g, // Matches **Heading:** or ***Heading:***
    //   "\n\n$2\n\n"
    // );

    // 2. Put each option (A), B), C), D)) on its own line.
    const separatedOptions = optionsTitleFormatted.replace(
      /([ABCD]\))\s*(.*?)(?=\n?[ABCD]\)|$)/gs,
      (_, letter, text) => `\n${letter} ${text.trim()}\n`
    );

    // Process block equations ($$ ... $$)
    const blockProcessedContent = separatedOptions.replace(/\\\[(.*?)\\\]/gs, (_, equation) => `$$${equation}$$`);

    // Process inline equations ($ ... $)
    const inlineProcessedContent = blockProcessedContent.replace(/\\\((.*?)\\\)/gs, (_, equation) => `$${equation}$`);

    // Additional step: Remove extra escaping (double backslashes to single backslashes)
    const fullyProcessedContent = inlineProcessedContent.replace(/\\\\/g, "\\");

    return fullyProcessedContent;
  }, []);

  // sample image url data
  //   const samContent = `![Biology Image](https://img.freepik.com/premium-photo/close-up-macaw-bird_229933-80.jpg?w=1060)

  //   ![Biology Image](https://img.freepik.com/premium-photo/close-up-macaw-bird_229933-80.jpg?w=1060)

  // Sure, let's begin practicing Biology NEET PYQs.
  // To start, would you like to focus on a specific chapter, or would you prefer a mix of questions from different areas of Biology?`;

  const processedContent = preprocessLaTeX(`${content}`);

  return (
    <>
      <div>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkEmoji, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          className="mark_down_text"
          components={{
            img: ({ src, alt }) => (
              <img
                onClick={(e: any) => {
                  setIsImageModalOpen(true);
                  setImageUrl(e.target.src);
                }}
                src={src || ""}
                alt={alt || ""}
                className="w-[250px] h-[200px] rounded-2xl border contain-style p-2"
                width={1500}
                height={1500}
              />
            ),
          }}
          {...({ breaks: true } as any)}
        >
          {processedContent}
        </ReactMarkdown>
        
      </div>

      {/*  */}
      <MainModal
        className="w-[95%] md:max-w-[550px] rounded-xl"
        open={isImageModalOpen}
        onOpenChange={setIsImageModalOpen}
        title="Preview Image"
      >
        <img
          alt="preview"
          src={imageUrl}
          width={1500}
          height={1500}
          className=" h-[250px] w-full md:h-[450px]  rounded-2xl object-contain border"
        />
      </MainModal>
      {/*  */}
      
    </>
  );
}
export default memo(MarkdownForBot);
