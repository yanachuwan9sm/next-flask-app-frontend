import { Box, Button, Input } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadButton = () => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (myFiles === null) {
      return;
    }
    handlePreview(myFiles);
  }, [myFiles]);

  // ドロップするファイルの形式を指定
  const accept = "image/*"; //"image/jpeg, image/png";

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;
    try {
      setMyFiles([...acceptedFiles]);
      handlePreview(acceptedFiles);
    } catch (err: any) {
      alert(err);
    }
  }, []);

  const onDropRejected = () => {
    // ドロップでの処理が失敗した際に実行する処理を記述
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
    onDropRejected,
  });

  //
  // ファイルをアップロードするコールバック関数
  //
  const handleUpload = (acceptedImg: any) => {
    try {
      //アップロード時の処理を行う
    } catch (err: any) {}
  };

  //
  // 選択した画像のプレビューを表示するコールバック関数
  //
  const handlePreview = (files: File[]) => {
    if (files === null) {
      return;
    }
    const file = files[0];
    if (file === null) {
      return;
    }
    let reader = new FileReader();
    // File型のファイルを読込、Base64形式に変換する
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImg(reader.result as string);
    };
  };

  return (
    <>
      <div>
        <Box
          w={4 / 5}
          px={4}
          py={2}
          mx="auto"
          my={4}
          textAlign="center"
          rounded="md"
        >
          <Box
            bgColor="gray.400"
            border={2}
            borderColor="gray.500"
            rounded="md"
            {...getRootProps()}
          >
            {/* この中の要素をタップすると画像を選択する */}
            <input {...getInputProps()} />
            {myFiles.length === 0 ? (
              <>
                <p>画像を選択またはドラッグ＆ドロップできます</p>
              </>
            ) : (
              <>
                <div>
                  {myFiles.map((file: File) => (
                    <React.Fragment key={file.name}>
                      {previewImg && <img src={previewImg} />}
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </Box>
          <Button
            disabled={!isDragActive}
            type="submit"
            onClick={() => handleUpload(myFiles)}
            px={4}
            py={2}
            my={4}
            bgColor="gray.200"
            rounded="md"
          >
            UPLOAD
          </Button>
        </Box>
      </div>
    </>
  );
};

export default UploadButton;
