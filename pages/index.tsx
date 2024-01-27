import { getAllPosts } from "@/lib/notionAPI";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts,
    },
    revalidate: 60,
  };
};

export default function Home(allPosts) {
  console.log(allPosts);

  return <main></main>;
}
