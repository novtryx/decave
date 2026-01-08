export const formatTextWithBreaks = (
  text: string,
  wordThreshold = 15
): string => {
  if (!text?.trim()) return '';

  // Preserve paragraphs exactly (double line breaks)
  const paragraphs = text.split(/\n{2,}/);

  return paragraphs
    .map(paragraph => {
      // Normalize spaces inside paragraph
      const cleanParagraph = paragraph.replace(/\s+/g, ' ').trim();

      // Robust sentence split (keeps last sentence)
      const sentences =
        cleanParagraph.match(/[^.!?]+(?:[.!?]+|$)/g) || [];

      return sentences
        .map((sentence, index) => {
          const trimmed = sentence.trim();
          const wordCount = trimmed.split(' ').length;
          const isLast = index === sentences.length - 1;

          // Long sentence → new paragraph (except last)
          if (wordCount > wordThreshold && !isLast) {
            return trimmed + '\n\n';
          }

          // Normal sentence spacing
          return isLast ? trimmed : trimmed + ' ';
        })
        .join('')
        .trim();
    })
    .join('\n\n'); // Preserve original paragraph breaks
};
