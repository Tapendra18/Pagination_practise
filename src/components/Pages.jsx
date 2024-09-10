import { useEffect, useState } from 'react';
import axios from 'axios';

function Pages() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://dummyjson.com/posts?limit=${postsPerPage}&skip=${
          (currentPage - 1) * postsPerPage
        }`
      )
      .then((res) => {
        setData(res?.data.posts);
        setTotalPosts(res?.data.total);
      })
      .catch((err) => console.log(err));
  }, [currentPage, postsPerPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="pagination-container">
      <ul className="post-list">
        {data?.map((post) => (
          <li key={post?.id} className="post-item">
            <div className="post-thumbnail">
              <img
                src={`https://dummyimage.com/100x100/000/fff&text=${post?.title?.charAt(
                  0
                )}`}
                alt={post?.title}
              />
            </div>
            <div className="post-content">
              <h3 className="post-title">{post?.title}</h3>
              <p className="post-body">{post?.body}</p>
             
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination-controls">
        <button
          className="pagination-button prev"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &#8678; Previous
        </button>

        <div className="pagination-info">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </div>

        <button
          className="pagination-button next"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next &#8680;
        </button>
      </div>
    </div>
  );
}

export default Pages;
