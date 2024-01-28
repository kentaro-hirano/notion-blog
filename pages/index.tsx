import { GetStaticProps } from "next";
import SinglePost from "@/components/Post/SinglePost";
import { getAllPosts, getPostsForTopPage } from "@/lib/notionAPI";

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);

  return {
    props: {
      fourPosts,
    },
    revalidate: 60 * 60 * 6,
  };
};

export default function Home({ fourPosts }) {
  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
        {fourPosts.map((post) => (
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
