import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import HomeScreen from "~/components/screens/Home";

const HomePage: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>MSXII Sound Design</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeScreen />
    </>
  );
};

export default HomePage;
