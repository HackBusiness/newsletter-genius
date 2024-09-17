import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableComment } from './EditableComment';

const generateComment = (content) => {
  // This is a placeholder for GPT-generated comments
  // In a real application, you would call an API to get GPT-generated content
  return `This section contains ${content.length} items. Here's a quick summary...`;
};

export const FinalNewsletter = ({ articles, redditPosts }) => {
  const [articleComments, setArticleComments] = useState({});
  const [redditComments, setRedditComments] = useState({});

  useEffect(() => {
    const initialArticleComments = articles.reduce((acc, article) => {
      acc[article.id] = generateComment([article]);
      return acc;
    }, {});
    setArticleComments(initialArticleComments);

    const initialRedditComments = redditPosts.reduce((acc, post) => {
      acc[post.id] = generateComment([post]);
      return acc;
    }, {});
    setRedditComments(initialRedditComments);
  }, [articles, redditPosts]);

  const handleArticleCommentChange = (id, newComment) => {
    setArticleComments(prev => ({ ...prev, [id]: newComment }));
  };

  const handleRedditCommentChange = (id, newComment) => {
    setRedditComments(prev => ({ ...prev, [id]: newComment }));
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4">Your Custom Newsletter</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner retro-newsletter">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold retro-title">Custom Digest</h1>
          <p className="text-sm">Curated articles and top Reddit posts</p>
        </div>

        <h3 className="text-2xl font-bold mb-4 retro-heading">Featured Articles</h3>
        {articles.map((article) => (
          <div key={article.id} className="mb-6">
            <EditableComment
              initialComment={articleComments[article.id]}
              onCommentChange={(newComment) => handleArticleCommentChange(article.id, newComment)}
            />
            <Card className="bg-white shadow-md retro-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Source: {article.source}</p>
                <p className="mt-2 text-sm">{article.blurb}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mt-2 block retro-link">
                  Read full article
                </a>
              </CardContent>
            </Card>
          </div>
        ))}

        <h3 className="text-2xl font-bold mb-4 mt-8 retro-heading">Top Reddit Posts</h3>
        {redditPosts.map((post) => (
          <div key={post.id} className="mb-6">
            <EditableComment
              initialComment={redditComments[post.id]}
              onCommentChange={(newComment) => handleRedditCommentChange(post.id, newComment)}
            />
            <Card className="bg-white shadow-md retro-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">Posted by u/{post.author}</p>
                <p className="text-sm mb-2">Score: {post.score}</p>
                {post.selftext && (
                  <div className="bg-gray-50 p-3 rounded mb-2 retro-text-box">
                    <p className="text-sm">{post.selftext.substring(0, 200)}...</p>
                  </div>
                )}
                <a 
                  href={`https://reddit.com${post.permalink}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline text-sm retro-link"
                >
                  Read more on Reddit
                </a>
              </CardContent>
            </Card>
          </div>
        ))}

        <div className="text-center mt-8">
          <p className="text-sm retro-footer">Generated with ❤️ by AI-Powered Newsletter Creator</p>
        </div>
      </div>
    </div>
  );
};
