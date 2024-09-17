import React from 'react';
import { PersonaForm } from '../components/PersonaForm';
import { ContentCuration } from '../components/ContentCuration';
import { NewsletterPreview } from '../components/NewsletterPreview';

const Index = () => {
  const [persona, setPersona] = React.useState(null);
  const [selectedContent, setSelectedContent] = React.useState([]);

  const handlePersonaSubmit = (personaData) => {
    setPersona(personaData);
    // TODO: Implement API call to fetch curated content based on persona
  };

  const handleContentSelection = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI-Powered Newsletter Creator</h1>
      {!persona ? (
        <PersonaForm onSubmit={handlePersonaSubmit} />
      ) : (
        <>
          <ContentCuration persona={persona} onContentSelect={handleContentSelection} />
          <NewsletterPreview selectedContent={selectedContent} />
        </>
      )}
    </div>
  );
};

export default Index;
