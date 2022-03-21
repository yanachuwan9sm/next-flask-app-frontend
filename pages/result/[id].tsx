import axios from "axios";
import useSWR from "swr";

import Head from "next/head";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { useState } from "react";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

export const fetcher = (url: string) => axios(url).then((res) => res.data);

export const getServerSideProps = async (ctx: any) => {
  const uuid = ctx.params?.id as string;
  // サーバーがドメインを認識しないため、完全修飾URLを入力する
  const res = await axios.post(
    `http://localhost:3000/api/download/`,
    {
      params: uuid,
    },
    { responseType: "blob" }
  );

  const blob = res.data;

  return { props: { blob } };
};
export default function Photo(props: any) {
  const [loadingImg, setLoadingImg] = useState<string>();

  let reader = new FileReader();
  // blob を base64 に変換
  reader.readAsDataURL(props);
  reader.onload = () => {
    setUploadImg(reader.result as string);
  };

  console.log(props);

  return (
    <div>
      <Head>
        <title>【SSR】Photo_id: {props.query}</title>
        <meta property="og:title" content={`【SSR】photo_id: ${props.query}`} />
        {/* <meta property="og:description" content={`${data.title}`} />
        <meta property="og:image" content={data.thumbnailUrl} /> */}
        <meta name="twitter:card" content="summary" />
      </Head>

      <h1>Photos - SSR</h1>
      <h2>Photo_Id: {props.query}</h2>
      {/* <img src={data.url} alt={data.title} /> */}
    </div>
  );
}
