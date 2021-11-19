import React from "react";

import ChapterLayout from "./ChapterLayout";
import ChapterAudio from "./ChapterAudio";
import ChapterBodyScroll from "./ChapterBodyScroll";

const ChapterDisplay = () => {
  return (
    <ChapterLayout>
      <ChapterBodyScroll />
      <ChapterAudio />
    </ChapterLayout>
  );
};

export default ChapterDisplay;
