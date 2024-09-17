import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const NewsletterPreview = ({ selectedContent }) => {
  const [generatedNewsletter, setGeneratedNewsletter] = React.useState(null);

  const handleGenerateNewsletter = () => {
    // TODO: Implement actual newsletter generation logic with GPT
    const dummyNewsletter = selectedContent.map(item => ({
      ...item,
      summary: `This is a generated summary for "${item.title}". It would typically be created by GPT based on the full article content.`
    }));
    setGeneratedNewsletter(dummyNewsletter);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Newsletter Preview</h2>
      {selectedContent.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Source: {item.source}</p>
            <p className="mt-2 text-sm">{item.blurb}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mt-2 block">
              Read full article
            </a>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleGenerateNewsletter}>Generate Newsletter</Button>
      
      {generatedNewsletter && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Generated Newsletter</h3>
          {generatedNewsletter.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Source: {item.source}</p>
                <p className="mt-2 text-sm font-semibold">Summary:</p>
                <p className="mt-1 text-sm">{item.summary}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mt-2 block">
                  Read full article
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
