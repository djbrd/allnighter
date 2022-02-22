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

export const selectInitFailureMessage = (state) => {
  return state.content.errorMessage;
};

export const selectSentenceStartTimes = (state, chapterId) => {
  return state.content.chapters[chapterId].sentenceStartTimes ?? [];
};

export const selectReadingPartId = (state) => {
  const chapterId = state.reading.chapterId;
  console.log(chapterId);
  const book = selectAllnighter(state);
  const { parts } = state.content;
  if (!book) {
    return null;
  }
  if (chapterId === -1) {
    return book.parts[0];
  }

  for (let i = 0; i < book.parts.length; ++i) {
    let partId = book.parts[i];
    if (parts[partId].chapters.indexOf(chapterId) > -1) {
      return partId;
    }
  }
  return null;
};

export const selectReadingSentenceIdx = (state) => {
  return state.reading.sentenceIdx;
};

export const selectAllnighterId = (state) => {
  const { books } = state.content;
  if (!books) {
    return null;
  }

  for (const [bookId, book] of Object.entries(books)) {
    if (book.title === "all-nighter") {
      return bookId;
    }
  }
  return null;
};

export const selectAllnighter = (state) => {
  const bookId = selectAllnighterId(state);
  return bookId ? state.content.books[bookId] : null;
};

export const selectChapterId = (state, partIdx, chapterIdx) => {
  const { books } = state.content;
  if (!books) {
    return null;
  }

  const bookArr = Object.keys(books).map((key) => books[key]);
  const allNighter = bookArr[0];
  const partId = allNighter.parts[partIdx];
  const chapterId = state.content.parts[partId].chapters[chapterIdx];
  return chapterId;
};
