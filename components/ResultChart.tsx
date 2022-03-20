import React, { useRef, useState } from "react";

import axios from "axios";
import styled from "@emotion/styled";
import { Box, Button, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";

import { Radardata, Radaroptions } from "../components/CreateChart";
import Router from "next/router";

const ResultContainer = styled.div`
  padding: 60px 30px 60px 30px;
  border-width: 2px;
  border-radius: 2px;
  background-color: #283144;
  outline: none;
`;

const ResultChart: React.VFC = () => {
  const imgRef = useRef(null);
  const [uploadImg, setUploadImg] = useState<string>();

  const handleResultImage = async () => {
    const element = imgRef?.current;
    if (element === null) {
      return;
    }
    const canvas = await html2canvas(element);
    // Base64形式の画像データを取得
    const data = canvas.toDataURL("image/jpg");

    // S3にアップロード
    // 検証結果を全て画像として保存することで
    // 画像に付随する数値を保持するデータベースを使う手間を省く

    //ファイル名を uuid で生成
    const fileName = uuidv4();

    const res = await axios.post("/api/upload/", {
      params: data,
      uuid: fileName,
    });

    if (res.status === 200) {
      Router.push("/result/[id]", `/result/${fileName}`);

      // const res = await axios.post(
      //   "/api/download/",
      //   {
      //     params: fileName,
      //   },
      //   { responseType: "blob" }
      // );

      // let reader = new FileReader();
      // // blob を base64 に変換
      // reader.readAsDataURL(res.data);
      // reader.onload = () => {
      //   setUploadImg(reader.result as string);
      // };
    }
  };

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip
  );

  return (
    <>
      <Box
        ref={imgRef}
        px={3}
        py={3}
        my={3}
        mx="auto"
        display="flex"
        flex={1}
        flexDirection="column"
        borderWidth={2}
        borderRadius={5}
        bgColor="#283144"
      >
        <Text fontSize="md" pt={3} pb={0}>
          あなたは、
        </Text>
        <Text fontSize="3xl" pt={3} pb={5}>
          普通のリモードワーカー
        </Text>

        <Box px={4} py={2} mx="auto" my={4} textAlign="center" rounded="md">
          <Radar data={Radardata} options={Radaroptions} />
        </Box>

        <Button onClick={handleResultImage}>Twitterで結果をシェア</Button>

        <img src={uploadImg} />
      </Box>
    </>
  );
};

export default ResultChart;
