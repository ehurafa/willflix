import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Playground from './pages/Playground';

const App: React.FC = () => (
  <Router>
    <Header />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* videos/categoria/titulo/temporada/ep */}
        <Route path="/videos/:category/:title/:session/:id" element={<Playground />} />
      </Routes>
    </div>
  </Router>
);

export default App;
