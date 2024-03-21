import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const BlogPostContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Fetch the blog post content based on the slug
  const blogPostContent = `
# Blog Post ${slug}

This is the content of the blog post with slug \`${slug}\`.
  `;

  return (
    <BlogPostContainer>
      <ReactMarkdown>{blogPostContent}</ReactMarkdown>
    </BlogPostContainer>
  );
};

export default BlogPost;