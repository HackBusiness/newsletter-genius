import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import NewsletterDisplay from '../components/NewsletterDisplay';

const fetchRedditPosts = async (subreddit) => {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=10`);
  if (!response.ok) {
    throw new Error('Failed to fetch Reddit posts');
  }
  const data = await response.json();
  return data.data.children.map(post => post.data);
};

const RedditPosts = () => {
  const [subreddit, setSubreddit] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [newsletter, setNewsletter] = useState(null);

  const { data: posts, isLoading, isError, refetch } = useQuery({
    queryKey: ['redditPosts', subreddit],
    queryFn: () => fetchRedditPosts(subreddit),
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleCheckboxChange = (postId) => {
    setSelectedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleCreateNewsletter = () => {
    const selectedPostsData = posts.filter(post => selectedPosts.includes(post.id));
    setNewsletter(selectedPostsData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Reddit Posts</h1>
      <form onSubmit={handleSubmit} className="mb-8">
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
                    checked={selectedPosts.includes(post.id)}
                    onCheckedChange={() => handleCheckboxChange(post.id)}
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

      {posts && posts.length > 0 && (
        <Button onClick={handleCreateNewsletter} className="mt-4">
          Create Newsletter from Selected Posts
        </Button>
      )}

      {newsletter && <NewsletterDisplay posts={newsletter} />}
    </div>
  );
};

export default RedditPosts;
