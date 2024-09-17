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
      { 
        id: 1, 
        title: 'Top 10 Accounting Trends for 2024', 
        source: 'AccountingToday',
        blurb: 'Discover the latest trends shaping the accounting industry, from AI-driven automation to blockchain integration.',
        link: 'https://www.accountingtoday.com/list/top-10-accounting-trends-for-2024'
      },
      { 
        id: 2, 
        title: 'New Tax Laws Affecting Small Businesses', 
        source: 'Forbes',
        blurb: 'Learn about recent changes in tax legislation and how they impact small business owners and entrepreneurs.',
        link: 'https://www.forbes.com/sites/forbesfinancecouncil/2023/12/15/new-tax-laws-affecting-small-businesses/'
      },
      { 
        id: 3, 
        title: 'How AI is Transforming the Accounting Industry', 
        source: 'TechCrunch',
        blurb: 'Explore the ways artificial intelligence is revolutionizing accounting practices, improving efficiency and accuracy.',
        link: 'https://techcrunch.com/2023/11/30/how-ai-is-transforming-the-accounting-industry/'
      },
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
            <p className="mt-2 text-sm">{item.blurb}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mt-2 block">
              Read full article
            </a>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit}>Create Newsletter</Button>
    </div>
  );
};
