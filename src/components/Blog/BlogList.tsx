import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogListContainer = styled.div`
  padding: 20px;
  display: flex; // Correct display property to flex
  flex-direction: column; // Stack children vertically
  justify-content: center; // Center children vertically
  align-items: center; // Center children horizontally
  min-height: 20vh;
`;

const BlogLink = styled(Link)`
  display: block;
  margin-bottom: 10px;
  color: #333;
  text-decoration: none;
  font-family: "Optima", Helvetica, sans-serif;
  font-size: 1.1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const BlogList: React.FC = () => {
  const blogPosts = [
    { 
      slug: 'deepseek-ai', 
      title: "DeepSeek - The AI Revolution"
    },
  ];

  return (
    <BlogListContainer>
      {blogPosts.map((post) => (
        <BlogLink key={post.slug} to={`/blog/${post.slug}`}>
          {post.title}
        </BlogLink>
      ))}
    </BlogListContainer>
  );
};

export default BlogList;