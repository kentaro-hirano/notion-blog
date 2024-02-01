import { GetStaticPaths, GetStaticProps } from "next";
import SinglePost from "@/components/Post/SinglePost";
import { getPostsForTopPage, getPostsByPage, getNumberOfPages } from "@/lib/notionAPI";
import Pagination from "@/components/Pagination/Pagination";

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages();

  let params = [];
  for (let i = 1; i < numberOfPage; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const postsByPage = await getPostsByPage(parseInt(currentPage.toString(), 10));

  const numberOfPage = await getNumberOfPages();

  return {
    props: {
      postsByPage,
      numberOfPage,
    },
    revalidate: 60 * 60 * 6,
  };
};

const BlogPageList = ({ numberOfPage, postsByPage }) => {
  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {postsByPage.map((post) => (
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
        <Pagination numberOfPage={numberOfPage} />
      </main>
    </div>
  );
};

export default BlogPageList;
