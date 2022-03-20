import axios from "axios";
import useSWR from "swr";

import Head from "next/head";
import { useRouter } from "next/router";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

export const fetcher = (url: string) => axios(url).then((res) => res.data);

export const getServerSideProps = async (query: string) => {
  const res = await axios.post(
    "/api/download/",
    {
      params: query,
    },
    { responseType: "blob" }
  );
  return { props: { res } };
};

export default function Photo(props: any) {
  const initialData = props.data;

  // const { data } = useSWR(`${API_URL}/todos`, fetcher, {
  //   initialData,
  // });

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
