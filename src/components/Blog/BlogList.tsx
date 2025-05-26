import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogList.module.css';

const BlogList: React.FC = () => {
  const blogPosts = [
    { 
      slug: 'deepseek-ai', 
      title: "DeepSeek - The AI Revolution"
    }
  ];

  return (
    <div className={styles.container}>
      
      <div className={styles.blogList}>
        {blogPosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.blogLink}>
            <div className={styles.blogCard}>
              <h3 className={styles.blogTitle}>{post.title}</h3>
              <span className={styles.readMore}>Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;