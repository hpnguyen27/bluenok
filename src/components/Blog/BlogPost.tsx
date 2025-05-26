import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import styles from './BlogPost.module.css';

const BlogPost: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/content/blog/${slug}.md`);
        
        if (!response.ok) {
          throw new Error('Failed to load blog post');
        }
        
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
        setContent('');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadBlogPost();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <article className={styles.blogPost}>
        <ReactMarkdown>{content || 'Under construction! 🚧'}</ReactMarkdown>
      </article>
    </div>
  );
};

export default BlogPost;