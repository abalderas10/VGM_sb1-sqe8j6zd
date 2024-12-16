import { SERVER_CONFIG } from '../config';

export async function fetchPosts() {
  const response = await fetch(`${SERVER_CONFIG.BASE_URL}/api/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

export async function createPost(data: any) {
  const response = await fetch(`${SERVER_CONFIG.BASE_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
}

export async function deletePost(id: string) {
  const response = await fetch(`${SERVER_CONFIG.BASE_URL}/api/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete post');
  return response.json();
}