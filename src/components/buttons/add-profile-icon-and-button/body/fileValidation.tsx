export const fileValidation = (file: string) => {
  //constants
  let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if (!allowedExtensions.exec(file)) {
    alert("Invalid file type");
    return false;
  }
  return true;
};
