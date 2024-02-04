import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllTags, getPostsForTopPage } from "@/lib/notionAPI";
import Tag from "@/components/Tag/Tag";
import SinglePost from "@/components/Post/SinglePost";

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);
  const allTags = await getAllTags();

  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 60 * 60 * 6,
  };
};

export default function Home({ fourPosts, allTags }) {
  return (
    <div className="container h-full w-full lg:w-1/2 mx-auto">
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
        <Link href="/posts/page/1" className="mb-6 mx-auto px-5 block text-right">
          ...もっと見る
        </Link>
        <Tag tags={allTags} />
      </main>
    </div>
  );
}
