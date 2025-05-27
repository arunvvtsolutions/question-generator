export const cleanMarkdownForDocx = (content: string): string => {
  return content
    .replaceAll('  **', '**')
    .replace(/\\n/g, '\n')
    .replace(/\n\t\t/g, '\n    ')
    .replace(/\n\t/g, '\n  ')
    .replace(/\t/g, '    ')
    .replace(/\n/g, '\n\n')
    // Remove LaTeX delimiters and leave math as text
    .replace(/\\\[(.*?)\\\]/gs, (_, eq) => eq)
    .replace(/\\\((.*?)\\\)/gs, (_, eq) => eq)
    .replace(/\$\$(.*?)\$\$/gs, (_, eq) => eq)
    .replace(/\$(.*?)\$/gs, (_, eq) => eq)
    // Strip markdown symbols
    .replace(/\*\*/g, '')
    .replace(/[_*`~]/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
};