import { NextApiRequest, NextApiResponse } from "next";

import { S3, config } from "aws-sdk";

// S3にアップロードされた画像をファイル名のuuidを元に取得する
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

  const params: S3.GetObjectRequest = {
    Bucket: process.env.S3_UPLOAD_BUCKET_NAME as string,
    Key: [req.body.params, "png"].join("."),
  };

  const s3 = new S3();

  await s3
    .getObject(params)
    .promise()
    .then((data) => {
      res.status(200).json(data.Body);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
}
