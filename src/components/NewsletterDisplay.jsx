import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NewsletterDisplay = ({ posts }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Reddit Newsletter</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold">Reddit Digest</h1>
          <p className="text-sm">Top posts from your selected subreddit</p>
        </div>
        {posts.map((post, index) => (
          <Card key={post.id} className="mb-6 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{index + 1}. {post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">Posted by u/{post.author}</p>
              <p className="text-sm mb-2">Score: {post.score}</p>
              {post.selftext && (
                <div className="bg-gray-50 p-3 rounded mb-2">
                  <p className="text-sm">{post.selftext.substring(0, 200)}...</p>
                </div>
              )}
              <a 
                href={`https://reddit.com${post.permalink}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline text-sm"
              >
                Read more on Reddit
              </a>
            </CardContent>
          </Card>
        ))}
        <div className="text-center mt-6">
          <p className="text-sm">Generated with ❤️ by AI-Powered Newsletter Creator</p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterDisplay;