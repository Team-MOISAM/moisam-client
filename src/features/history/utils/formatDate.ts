export const formatDate = (date: string) => {
  // yyyy-mm-dd → yyyy.mm.dd
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date.replace(/-/g, ".");
  }

  // yyyymmdd → yyyy.mm.dd
  if (/^\d{8}$/.test(date)) {
    return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
  }

  return date;
};
