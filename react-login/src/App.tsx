import React, { useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { AuthContext } from './context/Auth/AuthContext';
import { RequireAuth } from './context/Auth/RequireAuth';
import { Home } from './pages/Home';
import { Private } from './pages/Private';

function App() {

  const auth = useContext(AuthContext);

  return (
    <div className="App">
      <header>
        <h1>Header do site</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/private">Private Page</Link>
          {auth.user && <a href="javasccript:;">Exit</a>}
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<RequireAuth><Private /></RequireAuth>} />
        
      </Routes>

    </div>
  );
}

export default App;
