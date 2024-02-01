import { GetStaticProps } from "next";
import SinglePost from "@/components/Post/SinglePost";
import { getPostsForTopPage } from "@/lib/notionAPI";
import Link from "next/link";

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
          <div className="mx-4" key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={true}
            />
          </div>
        ))}
        <Link href="/posts/page/1" className="mb-6 lg:w-1/2 mx-auto px-5 block text-right">
          ...もっと見る
        </Link>
      </main>
    </div>
  );
}
