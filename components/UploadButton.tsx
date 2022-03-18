import { Box, Button } from "@chakra-ui/react";
import React, { Dispatch, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import { PlusSquareIcon } from "@chakra-ui/icons";
import CropperModal from "./CropperModal";
import { detection, test } from "../src/api/result";
import S3UploadHandler from "../src/api/upload";
import axios from "axios";

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const UploadContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 60px 30px 60px 30px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #283144;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

type PROPS = {
  IsDetected: Boolean;
  setIsDetected: Dispatch<React.SetStateAction<Boolean>>;
};

const UploadButton: React.VFC<PROPS> = ({ IsDetected, setIsDetected }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [src, setSrc] = useState<string>("");
  const [result, setResult] = useState<string | undefined>();

  useEffect(() => {
    if (myFiles === null) {
      return;
    }
    handlePreview(myFiles);
  }, [myFiles]);

  // ドロップするファイルの形式を指定
  const accept = "image/*";

  // ファイルが選択された場合に実行するコールバック関数
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;
    try {
      setMyFiles([...acceptedFiles]);
      handlePreview(acceptedFiles);
      setOpen(!open);
    } catch (err: any) {
      alert(err);
    }
  }, []);

  const onDropRejected = () => {
    // ドロップでの処理が失敗した際に実行する処理を記述
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    onDrop,
    onDropRejected,
  });

  // トリミングされた画像を元に物体検出を行う
  const handleUpload = async (acceptedImg: string | undefined) => {
    if (!acceptedImg) {
      return;
    }

    //Base64Image を Blob に変換
    const base64Response = await fetch(acceptedImg);
    const blob = await base64Response.blob();

    // ファイルの拡張子(png/jpeg ...etc)
    const fileExtension = acceptedImg
      .toString()
      .slice(acceptedImg.indexOf("/") + 1, acceptedImg.indexOf(";"));

    const fd = new FormData();
    const file = new File([blob], `detection_image.${fileExtension}`);
    fd.append("image", file);

    console.log(fd.get("image"));

    setIsDetected(true);

    try {
      // const res = await detection(fd);
      // console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  // 選択した画像のプレビューを表示するコールバック関数
  const handlePreview = (files: File[]) => {
    if (files === null) {
      return;
    }
    const file = files[0];

    let reader = new FileReader();
    // File型のファイルを読込、Base64形式に変換する
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      setSrc(reader.result as string);
    };
  };

  return (
    <>
      <Box px={4} py={2} mx="auto" my={4} textAlign="center" rounded="md">
        <UploadContainer
          {...getRootProps({ isFocused, isDragAccept, isDragReject })}
        >
          {/* この中の要素で ドラック&ドロップおよびタップすると画像選択 */}
          <input {...getInputProps()} />
          {result === undefined ? (
            <>
              <PlusSquareIcon />
              <p>画像を選択またはドラッグ＆ドロップしてください</p>
            </>
          ) : (
            <>{result && !open && <img src={result} />}</>
          )}
        </UploadContainer>

        <CropperModal
          open={open}
          setOpen={setOpen}
          myFiles={myFiles}
          setMyFiles={setMyFiles}
          src={src}
          setResult={setResult}
        />

        <Button
          disabled={isDragActive}
          type="submit"
          onClick={() => handleUpload(result)}
          px={4}
          py={2}
          my={4}
          rounded="md"
        >
          Check Start
        </Button>
      </Box>
    </>
  );
};

export default UploadButton;
