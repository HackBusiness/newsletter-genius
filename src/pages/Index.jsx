import React, { useState } from 'react';
import { PersonaForm } from '../components/PersonaForm';
import { ContentCuration } from '../components/ContentCuration';
import { RedditPostSelection } from '../components/RedditPostSelection';
import { FinalNewsletter } from '../components/FinalNewsletter';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [persona, setPersona] = useState(null);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [selectedRedditPosts, setSelectedRedditPosts] = useState([]);
  const [showFinalNewsletter, setShowFinalNewsletter] = useState(false);

  const handlePersonaSubmit = (personaData) => {
    setPersona(personaData);
  };

  const handleArticleSelection = (articles) => {
    setSelectedArticles(articles);
  };

  const handleRedditPostSelection = (posts) => {
    setSelectedRedditPosts(posts);
  };

  const handleCreateNewsletter = () => {
    setShowFinalNewsletter(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI-Powered Newsletter Creator</h1>
      {!persona ? (
        <PersonaForm onSubmit={handlePersonaSubmit} />
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/2">
              <ContentCuration persona={persona} onContentSelect={handleArticleSelection} />
            </div>
            <div className="md:w-1/2">
              <RedditPostSelection onPostSelect={handleRedditPostSelection} />
            </div>
          </div>
          {selectedArticles.length > 0 && selectedRedditPosts.length > 0 && (
            <Button onClick={handleCreateNewsletter} className="mt-4">
              Create Final Newsletter
            </Button>
          )}
          {showFinalNewsletter && (
            <FinalNewsletter articles={selectedArticles} redditPosts={selectedRedditPosts} />
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
