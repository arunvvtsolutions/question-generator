import React, { memo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';

function MarkdownWithLatex({ content }: { content: string }) {
  const preprocessLaTeX = useCallback((content: string): string => {
    // Handle common formatting cases (line breaks, tabs)
    const formattedContent = content
    .replaceAll('  **', '**')
      .replace(/\\n/g, '\n')  // Replace literal `\n` with an actual newline
      .replace(/\n\t\t/g, '\n&nbsp;&nbsp;&nbsp;&nbsp;') // Handle newlines followed by two tabs
      .replace(/\n\t/g, '\n&nbsp;')  // Handle newlines followed by one tab
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') // Replace tabs with four non-breaking spaces
      .replace(/\n/g, '\n\n')// Add extra spacing for all newlines

    // Process inline and block LaTeX equations
    const blockProcessedContent = formattedContent.replace(/\\\[(.*?)\\\]/gs, (_, equation) => `$$${equation}$$`);
    return blockProcessedContent.replace(/\\\((.*?)\\\)/gs, (_, equation) => `$${equation}$`);
  }, []);

  const processedContent = preprocessLaTeX(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkEmoji]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
    >
      {processedContent}
    </ReactMarkdown>
  );
}

export default memo(MarkdownWithLatex);
