export const formatDateWithDash = (date: Date) => {
  return date.toISOString().split("T")[0];
};
