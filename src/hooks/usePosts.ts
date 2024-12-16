import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types/post';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For demo purposes, using static data
  const DEMO_POSTS: Post[] = [
    {
      id: '1',
      title: 'Sunset Sailing Experience',
      slug: 'sunset-sailing-experience',
      description: 'Experience the magic of Caribbean sunsets',
      content: 'Full content here...',
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1514649923863-ceaf75b7ec40?auto=format&fit=crop&w=800&q=80',
      author: 'Marina Cruz',
      authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      date: new Date().toISOString(),
      photos: []
    },
    // Add more demo posts as needed
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPosts(DEMO_POSTS);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const deletePost = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      // In a real app, make API call here
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  }, []);

  return {
    posts,
    loading,
    error,
    deletePost
  };
}