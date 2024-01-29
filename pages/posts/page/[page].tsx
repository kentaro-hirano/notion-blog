import { GetStaticPaths, GetStaticProps } from "next";
import SinglePost from "@/components/Post/SinglePost";
import { getPostsForTopPage } from "@/lib/notionAPI";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { page: "1" } }, { params: { page: "2" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);

  return {
    props: {
      fourPosts,
    },
    revalidate: 60 * 60 * 6,
  };
};

const BlogPageList = ({ fourPosts }) => {
  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {fourPosts.map((post) => (
            <div>
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
        </section>
      </main>
    </div>
  );
};

export default BlogPageList;
