import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const PersonaForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="audience" className="block text-sm font-medium text-gray-700">Target Audience</label>
        <Input id="audience" {...register('audience')} placeholder="e.g., Accountants" />
      </div>
      <div>
        <label htmlFor="interests" className="block text-sm font-medium text-gray-700">Interests</label>
        <Textarea id="interests" {...register('interests')} placeholder="Enter interests, separated by commas" />
      </div>
      <div>
        <label htmlFor="tone" className="block text-sm font-medium text-gray-700">Newsletter Tone</label>
        <Select onValueChange={(value) => register('tone').onChange({ target: { value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="humorous">Humorous</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="sources" className="block text-sm font-medium text-gray-700">News Sources</label>
        <Textarea id="sources" {...register('sources')} placeholder="Enter news sources, separated by commas" />
      </div>
      <Button type="submit">Generate Content</Button>
    </form>
  );
};