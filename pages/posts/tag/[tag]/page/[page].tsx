import { GetStaticPaths, GetStaticProps } from "next";
import SinglePost from "@/components/Post/SinglePost";
import {
  getPostsForTopPage,
  getPostsByPage,
  getNumberOfPages,
  getPostsByTagAndPage,
  getNumberOfPagesByTag,
  getAllTags,
} from "@/lib/notionAPI";
import Pagination from "@/components/Pagination/Pagination";

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags();
  let params = [];

  await Promise.all(
    allTags.map((tag: string) => {
      return getNumberOfPagesByTag(tag).then((numberOfPagesByTag: number) => {
        for (let i = 1; i <= numberOfPagesByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } });
        }
      });
    })
  );

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage: string = context.params?.page.toString();
  const currentTag: string = context.params?.tag.toString();

  const upperCaseCurrentTag = currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

  const posts = await getPostsByTagAndPage(upperCaseCurrentTag, parseInt(currentPage, 10));

  const numberOfPagesByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);

  return {
    props: {
      posts,
      numberOfPagesByTag,
      currentTag,
    },
    revalidate: 60 * 60 * 6,
  };
};

const BlogTagPageList = ({ posts, numberOfPagesByTag, currentTag }) => {
  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {posts.map((post) => (
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
        <Pagination numberOfPage={numberOfPagesByTag} tag={currentTag} />
      </main>
    </div>
  );
};

export default BlogTagPageList;
