import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const BlogPostContainer = styled.div`
  font-family: 'Courier New', monospace;
`;

const BlogPost: React.FC = () => {

  // Fetch the blog post content based on the slug
  const blogPostContent = `
Under construction! 🚧
  `;

  return (
    <BlogPostContainer>
      <ReactMarkdown>{blogPostContent}</ReactMarkdown>
    </BlogPostContainer>
  );
};

export default BlogPost;