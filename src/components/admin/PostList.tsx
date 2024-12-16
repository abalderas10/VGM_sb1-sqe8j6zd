import React from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Image } from 'lucide-react';
import { cn } from '../../utils/cn';
import { usePosts } from '../../hooks/usePosts';

export function PostList() {
  const { posts, loading, error, deletePost } = usePosts();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="animate-pulse text-caribbean-600">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-red-600 text-center">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 text-caribbean-500 hover:text-caribbean-600 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-caribbean-600">No posts found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-caribbean-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-caribbean-900">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-caribbean-900">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-caribbean-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-caribbean-900">Photos</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-caribbean-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-caribbean-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-caribbean-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-10 h-10 rounded object-cover mr-3"
                    />
                    <div className="text-sm text-caribbean-900">{post.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-caribbean-100 text-caribbean-800">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-caribbean-600">
                  {format(new Date(post.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Image className="w-4 h-4 text-caribbean-500" />
                    <span className="text-sm text-caribbean-600">
                      {post.photos?.length || 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className={cn(
                        "p-1 rounded-md",
                        "hover:bg-caribbean-100 text-caribbean-600",
                        "transition-colors"
                      )}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className={cn(
                        "p-1 rounded-md",
                        "hover:bg-red-100 text-red-600",
                        "transition-colors"
                      )}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}