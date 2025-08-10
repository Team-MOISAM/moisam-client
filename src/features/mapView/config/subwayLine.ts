export const subwayLine: Record<
  string,
  { bg: string; text: string; secondText?: string; textSize: string; fontWeight?: string }
> = {
  "수도권 공항철도": {
    bg: "bg-metro-KA",
    text: "공항",
    secondText: "철도",
    textSize: "text-xxxs",
    fontWeight: "font-bold",
  },
  "수도권 신분당선": { bg: "bg-metro-S", text: "신분당", textSize: "text-xxxs", fontWeight: "font-bold" },
  "수도권 우이신설경전철": {
    bg: "bg-metro-UI",
    text: "우이",
    secondText: "신설",
    textSize: "text-xxxs",
    fontWeight: "font-bold",
  },

  경의중앙선: {
    bg: "bg-metro-rail1",
    text: "경의",
    secondText: "중앙",
    textSize: "text-xxxs",
    fontWeight: "font-bold",
  },
  "수도권 수인.분당선": {
    bg: "bg-metro-rail2",
    text: "수인",
    secondText: "분당",
    textSize: "text-xxxs",
    fontWeight: "font-bold",
  },
  경춘선: { bg: "bg-metro-rail4", text: "경춘", textSize: "text-labelXxs", fontWeight: "font-bold" },

  "수도권 1호선": { bg: "bg-metro-line1", text: "1", textSize: "text-sm" },
  "수도권 2호선": { bg: "bg-metro-line2", text: "2", textSize: "text-sm" },
  "수도권 3호선": { bg: "bg-metro-line3", text: "3", textSize: "text-sm" },
  "수도권 4호선": { bg: "bg-metro-line4", text: "4", textSize: "text-sm" },
  "수도권 5호선": { bg: "bg-metro-line5", text: "5", textSize: "text-sm" },
  "수도권 6호선": { bg: "bg-metro-line6", text: "6", textSize: "text-sm" },
  "수도권 7호선": { bg: "bg-metro-line7", text: "7", textSize: "text-sm" },
  "수도권 8호선": { bg: "bg-metro-line8", text: "8", textSize: "text-sm" },
  "수도권 9호선": { bg: "bg-metro-line9", text: "9", textSize: "text-sm" },
};
