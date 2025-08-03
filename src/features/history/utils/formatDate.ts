export const formatDate = (date: string) => {
  if (date.includes("-")) {
    return date.replace(/-/g, ".");
  }
  if (date.length === 8) {
    return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
  }
  return date;
};
