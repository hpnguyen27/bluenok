import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const BlogPostContainer = styled.div`
  font-family: "Optima", Helvetica, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  text-align: left;

  /* Style headers */
  h1 {
    font-size: 2.0rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  /* Style paragraphs */
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  /* Style lists */
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  /* Style blockquotes */
  blockquote {
    border-left: 4px solid #ccc;
    margin: 1.5rem 0;
    padding-left: 1rem;
    font-style: italic;
  }

  /* Style code blocks */
  pre {
    background-color: #f6f8fa;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  code {
    background-color: #f6f8fa;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9rem;
  }

  /* Style links */
  a {
    color: #0066cc;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  /* Style images */
  img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
  }

  /* Style horizontal rules */
  hr {
    border: 0;
    border-top: 1px solid #eee;
    margin: 2rem 0;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-family: 'Courier New', monospace;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  padding: 20px;
  font-family: 'Courier New', monospace;
`;

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
    return <LoadingMessage>Loading post...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <BlogPostContainer>
      <ReactMarkdown>{content || 'Under construction! 🚧'}</ReactMarkdown>
    </BlogPostContainer>
  );
};

export default BlogPost;