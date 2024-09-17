import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const NewsletterPreview = ({ selectedContent }) => {
  const handleGenerateNewsletter = () => {
    // TODO: Implement newsletter generation logic
    console.log('Generating newsletter with selected content:', selectedContent);
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
            {/* TODO: Add summarized content here */}
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleGenerateNewsletter}>Generate Newsletter</Button>
    </div>
  );
};