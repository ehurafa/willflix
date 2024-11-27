import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Videos from './pages/Videos';
import VideoPlayer from './pages/VideoPlayer';

const App: React.FC = () => (
  <Router>
    <Header />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:id" element={<VideoPlayer />} />
      </Routes>
    </div>
  </Router>
);

export default App;
