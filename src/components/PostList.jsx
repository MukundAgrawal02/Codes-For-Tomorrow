import { useState, useEffect } from 'react';
import { useGetPostsQuery, useDeletePostMutation } from '../api/cardApi';
import Cards from './Cards';
import ReactPaginate from 'react-paginate';

const PostList = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery();
  const [currentPage, setCurrentPage] = useState(0);
  const [showLoading, setShowLoading] = useState(true); // State to control mandatory loading

  const postsPerPage = 6;
  const pagesVisited = currentPage * postsPerPage;

  const displayPosts = posts ? posts.slice(pagesVisited, pagesVisited + postsPerPage) : [];

  const pageCount = posts ? Math.ceil(posts.length / postsPerPage) : 0;

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [deletePostMutation] = useDeletePostMutation();

  const handleRemoveCard = async (postId) => {
    try {
      await deletePostMutation(postId);
      await refetch(); // Refetch posts after deletion
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  useEffect(() => {
    // Simulate a 5-second loading screen on initial render or reload
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  if (showLoading) return <div>Loading...</div>; // Mandatory loading screen

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error fetching posts</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <Cards key={post.id} title={post.title} body={post.body} onRemove={() => handleRemoveCard(post.id)} />
          ))}
        </div>
        <ReactPaginate
          previousLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          }
          nextLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          }
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={changePage}
          containerClassName="flex justify-center mt-4 space-x-2"
          previousLinkClassName="flex items-center px-3 py-1 rounded-full text-gray-700 hover:bg-gray-200"
          nextLinkClassName="flex items-center px-3 py-1 rounded-full text-gray-700 hover:bg-gray-200"
          disabledClassName="text-gray-300 cursor-not-allowed"
          activeClassName="bg-gray-100 text-gray-500"
          pageClassName="px-3 py-1 rounded-full border border-gray-300 bg-gray-500 text-white"
          pageLinkClassName="page-link"
        />
      </div>
    </div>
  );
};

export default PostList;
