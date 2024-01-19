import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AIDev from './sections/AIDev';
import Music from './sections/Music';
import GameDev from './sections/GameDev';
import Art from './sections/Art';
import PythonTutorial from './sections/PythonTutorial';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/ai-dev">App Development</Link></li>
            <li><Link to="/music">Music</Link></li>
            <li><Link to="/game-dev">Game Development</Link></li>
            <li><Link to="/art">Art</Link></li>
            <li><Link to="/python-tutorial">Python Curriculum</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/ai-dev" element={<AIDev />} />
          <Route path="/music" element={<Music />} />
          <Route path="/game-dev" element={<GameDev />} />
          <Route path="/art" element={<Art />} />
          <Route path="/python-tutorial" element={<PythonTutorial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;