import SinglePost from "@/components/Post/SinglePost";
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

export default function Home({ allPosts }) {
  console.log(allPosts);

  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
        {allPosts.map((post) => (
          <SinglePost
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}
