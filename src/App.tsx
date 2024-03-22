import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BlogList from './components/Blog/BlogList';
import BlogPost from './components/Blog/BlogPost';
import About from './components/About/About';
import NavigationBar from './components/Navigation/Navigation';
import Home from './components/HomePage/Home';
import { Analytics } from "@vercel/analytics/react"
import Contact from './components/Contact/Contact';
const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
          {/* Define other Routes here as needed */}
        </Routes>
      </Router>
      <Analytics />
    </div>
  );
};

export default App;
