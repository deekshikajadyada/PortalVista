import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { articleUrl } = useParams();
  const decodedUrl = decodeURIComponent(articleUrl);

  // You can fetch the article detail from the API if needed, here we assume it was passed in the link
  return (
    <div className="container mx-auto px-4 mt-4">
      <h1 className="text-3xl font-bold">Article Detail</h1>
      <iframe
        src={decodedUrl}
        title="article"
        className="w-full h-screen"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default ArticleDetail;
