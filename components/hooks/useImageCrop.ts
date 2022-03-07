import { Dispatch, SetStateAction, useEffect, useState } from "react";

//
// 切り抜きが変更されるたびに実行するカスタムフック ( 現在の切り抜き状態オブジェクトを返す )
//
export const useImageCrop = (
  imageInput: any,
  setImageInput: Dispatch<SetStateAction<any>>,
  setResult: Dispatch<SetStateAction<any>>
) => {
  // クリッピングする写真のアスペクト比aspect、幅初期値width、高さ初期値heightを設定
  const [crop, setCrop] = useState<any>({
    unit: "%",
    x: 0,
    y: 0,
    width: 400,
    height: 250,
  });

  const [image, setImage] = useState<any>(null);

  // クリッピングサイズや場所が変更される度に、resultとimageInputの値を更新
  useEffect(() => {
    if (image) {
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      if (!ctx) {
        throw new Error("No 2d context!!");
      }

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

      console.log(base64Image);

      setResult(base64Image);
      setImageInput({ ...imageInput, base64 });
    }
  }, [crop]);

  return [crop, setCrop, setImage];
};
