import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

export const EditableComment = ({ initialComment, onCommentChange }) => {
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setComment(initialComment);
  }, [initialComment]);

  const handleChange = (e) => {
    setComment(e.target.value);
    onCommentChange(e.target.value);
  };

  return (
    <Textarea
      value={comment}
      onChange={handleChange}
      className="w-full mb-2 font-mono text-sm bg-yellow-50 border-yellow-200"
      rows={3}
    />
  );
};