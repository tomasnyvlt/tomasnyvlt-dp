const composeRichTextError = (error: string): string => {
  return JSON.stringify({
    blocks: [
      {
        key: "bqubj",
        text: error,
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  });
};

export default composeRichTextError;
