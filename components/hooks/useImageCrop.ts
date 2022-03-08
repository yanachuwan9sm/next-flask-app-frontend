import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Crop } from "react-image-crop";

//
// 切り抜きが変更されるたびに実行するカスタムフック ( 現在の切り抜き状態オブジェクトを返す )
//
export const useImageCrop = (
  imgRef: React.MutableRefObject<HTMLImageElement | null>,
  setResult: Dispatch<SetStateAction<any>>
) => {
  const [crop, setCrop] = useState<any>();
  const [completedCrop, setCompletedCrop] = useState<any | null>(null);

  // クリッピングサイズや場所が変更される度に、resultとimageInputの値を更新
  useEffect(() => {
    if (!imgRef.current || !crop) {
      return;
    }

    const image = imgRef.current;

    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context!!");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    // ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    const base64 = base64Image.split(",")[1];
    setResult(base64Image);
  }, [crop]);

  return [crop, setCrop, setCompletedCrop];
};
