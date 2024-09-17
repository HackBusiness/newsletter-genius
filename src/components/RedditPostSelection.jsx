import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const fetchRedditPosts = async (subreddit) => {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=10`);
  if (!response.ok) {
    throw new Error('Failed to fetch Reddit posts');
  }
  const data = await response.json();
  return data.data.children.map(post => post.data);
};

export const RedditPostSelection = ({ onPostSelect }) => {
  const [subreddit, setSubreddit] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);

  const { data: posts, isLoading, isError, refetch } = useQuery({
    queryKey: ['redditPosts', subreddit],
    queryFn: () => fetchRedditPosts(subreddit),
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleCheckboxChange = (post) => {
    setSelectedPosts(prev =>
      prev.find(p => p.id === post.id)
        ? prev.filter(p => p.id !== post.id)
        : [...prev, post]
    );
    onPostSelect(selectedPosts);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Select Reddit Posts</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            placeholder="Enter subreddit name"
            className="flex-grow"
          />
          <Button type="submit">Fetch Posts</Button>
        </div>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching posts. Please try again.</p>}

      {posts && (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Checkbox
                    id={`post-${post.id}`}
                    checked={selectedPosts.some(p => p.id === post.id)}
                    onCheckedChange={() => handleCheckboxChange(post)}
                  />
                  <label htmlFor={`post-${post.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {post.title}
                  </label>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Author: {post.author}</p>
                <p className="text-sm text-gray-500">Score: {post.score}</p>
                <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mt-2 block">
                  View on Reddit
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};