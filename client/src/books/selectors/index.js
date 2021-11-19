export const selectBooks = (state) => {
  const { books } = state.content;
  return Object.keys(books).map((key) => books[key]);
};

export const selectPartsOfBook = (state, book) => {
  const { parts } = state.content;
  return book.parts.map((partId) => parts[partId]);
};

export const selectChaptersOfPart = (state, part) => {
  const { chapters } = state.content;
  return part.chapters.map((chapterId) => chapters[chapterId]);
};

export const selectChapter = (state, chapterId) => {
  return state.content.chapters[chapterId];
};

export const selectChapterTitle = (state, chapterId) => {
  return state.content.chapters[chapterId]
    ? state.content.chapters[chapterId].title
    : null;
};

export const selectChapterParagraphs = (state, chapterId) => {
  return state.content.chapters[chapterId]
    ? state.content.chapters[chapterId].paragraphs ?? null
    : null;
};

export const selectIsContentInitialised = (state) => {
  return state.content.initialised;
};

export const selectSentenceStartTimes = (state, chapterId) => {
  return state.content.chapters[chapterId].sentenceStartTimes ?? [];
};

export const selectReadingSentenceIdx = (state) => {
  return state.reading.sentenceIdx;
};
