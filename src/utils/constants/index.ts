export const fileValidation = (file: string) => {
  var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

  if (!allowedExtensions.exec(file)) {
    return false;
  }
  return true;
};

export const searchWord = (text: string, word: string) =>
  text
    ? text
        .trim()
        .toLowerCase()
        .search(
          word
            .replace(/[*+?^${}()|[\]\\]/g, "\\$&")
            .trim()
            .toLowerCase(),
        ) >= 0
    : false;
