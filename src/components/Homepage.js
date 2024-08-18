import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../features/articles/articlesSlice';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const Homepage = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles) || [];
  const articleStatus = useSelector((state) => state.articles.status);
  const [category, setCategory] = useState('general');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchArticles(category));
  }, [category, dispatch]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let content;
  if (articleStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (articleStatus === 'succeeded' && articles.length > 0) {
    content = currentArticles.map((article) => (
      <div key={article.url} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4">
        <Link to={`/article/${encodeURIComponent(article.url)}`}>
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:h-full md:w-48" src={article.urlToImage} alt={article.title} />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{article.source.name}</div>
              <h3 className="block mt-1 text-lg leading-tight font-medium text-black">{article.title}</h3>
              <p className="mt-2 text-gray-500">{article.description}</p>
            </div>
          </div>
        </Link>
      </div>
    ));
  } else if (articleStatus === 'failed') {
    content = <p>Error fetching articles.</p>;
  } else {
    content = <p>No articles found.</p>;
  }

  return (
    <div>
      <div className="flex justify-center my-4">
        <select value={category} onChange={handleCategoryChange} className="form-select block w-full mt-1">
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>
      <div className="container mx-auto px-4">
        {content}
      </div>
      {articles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(articles.length / articlesPerPage)}
          onPageChange={paginate}
        />
      )}
    </div>
  );
};

export default Homepage;