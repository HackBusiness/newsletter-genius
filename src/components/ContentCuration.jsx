import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export const ContentCuration = ({ persona, onContentSelect }) => {
  const [curatedContent, setCuratedContent] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);

  React.useEffect(() => {
    // TODO: Implement API call to fetch curated content based on persona
    // For now, we'll use dummy data
    setCuratedContent([
      { id: 1, title: 'Top 10 Accounting Trends for 2024', source: 'AccountingToday' },
      { id: 2, title: 'New Tax Laws Affecting Small Businesses', source: 'Forbes' },
      { id: 3, title: 'How AI is Transforming the Accounting Industry', source: 'TechCrunch' },
    ]);
  }, [persona]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const selectedContent = curatedContent.filter((item) => selectedItems.includes(item.id));
    onContentSelect(selectedContent);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Curated Content</h2>
      {curatedContent.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Checkbox
                id={`item-${item.id}`}
                checked={selectedItems.includes(item.id)}
                onCheckedChange={() => handleCheckboxChange(item.id)}
              />
              <label htmlFor={`item-${item.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {item.title}
              </label>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Source: {item.source}</p>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit}>Create Newsletter</Button>
    </div>
  );
};