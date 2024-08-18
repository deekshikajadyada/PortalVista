import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '724b2d0ed735403caca2a1fd6093c544';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const ArticlesComponent = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setStatus('loading');
      try {
        const response = await axios.get(`${API_URL}&category=${category}`);
        setArticles(response.data.articles);
        setStatus('succeeded');
      } catch (error) {
        console.error(error);
        setError(error.message);
        setStatus('failed');
      }
    };

    fetchArticles();
  }, [category]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <div key={article.title}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesComponent;
