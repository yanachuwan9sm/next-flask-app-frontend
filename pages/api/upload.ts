import { NextApiRequest, NextApiResponse } from "next";

import { S3, config } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

//
// Twitterシェアを行う場合のみ OGP画像生成に伴い
// アップロードされた画像をS3に保存する
//

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_UPLOAD_REGION,
    signatureVersion: "v4",
  });

  const encodeData = req.body.params;

  // Base64Image をデコードする
  const fileData = encodeData.replace(/^data:\w+\/\w+;base64,/, "");
  const decodedFile = Buffer.from(fileData, "base64");

  //ファイル名を uuid で生成
  const fileName = uuidv4();

  // ファイルの拡張子(png/jpeg ...etc)
  const fileExtension = encodeData
    .toString()
    .slice(encodeData.indexOf("/") + 1, encodeData.indexOf(";"));

  // ContentType(image/{png/jpeg ...etc})
  const contentType = encodeData
    .toString()
    .slice(encodeData.indexOf(":") + 1, encodeData.indexOf(";"));

  const params: S3.PutObjectRequest = {
    Body: decodedFile,
    Bucket: process.env.S3_UPLOAD_BUCKET_NAME as string,
    Key: [fileName, fileExtension].join("."),
    ContentType: contentType,
  };

  const s3 = new S3();

  await s3
    .putObject(params)
    .promise()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
}
