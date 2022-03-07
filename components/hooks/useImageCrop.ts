import { Dispatch, SetStateAction, useEffect, useState } from "react";

//
// 切り抜きが変更されるたびに実行するカスタムフック ( 現在の切り抜き状態オブジェクトを返す )
//
export const useImageCrop = (
  imgRef: React.MutableRefObject<HTMLImageElement | null>,
  setImageInput: Dispatch<SetStateAction<any>>,
  setResult: Dispatch<SetStateAction<any>>,
  scale = 1,
  rotate = 0
) => {
  // クリッピングする写真のアスペクト比aspect、幅初期値width、高さ初期値heightを設定
  const [crop, setCrop] = useState<any>({
    unit: "%",
    x: 0,
    y: 0,
    width: 400,
    height: 250,
  });

  const [previewImg, setPreviewImg] = useState<any>();

  // クリッピングサイズや場所が変更される度に、resultとimageInputの値を更新
  useEffect(() => {
    if (!imgRef.current) {
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

    const pixelRatio = 1;

    // canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    // canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    canvas.width = crop.width;
    canvas.height = crop.height;

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

    // const blob = canvas.toBlob(canvas);
    // if (previewImg) {
    //   URL.revokeObjectURL(previewImg);
    // }

    // const previewUrl = URL.createObjectURL(blob);
    // setPreviewImg(previewUrl);
  }, [crop]);

  return [crop, setCrop, previewImg];
};
