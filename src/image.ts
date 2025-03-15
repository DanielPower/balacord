import sharp from "sharp";

export const getCard = async (
  file: string,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const atlas = sharp(file);
  return await atlas
    .extract({ left: x * width, top: y * height, width, height })
    .toBuffer();
};
