export const encode = (image: HTMLImageElement): string | void => {
  const canvas = document.createElement("canvas");
  const { naturalWidth, naturalHeight } = image;

  canvas.width = naturalWidth;
  canvas.height = naturalHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    console.error("context is null... 😩");
  }

  context?.drawImage(image, 0, 0);

  return canvas.toDataURL();
}