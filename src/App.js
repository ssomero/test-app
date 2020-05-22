import React from 'react';
import './App.css';

import LikeButton from './components/LikeButton';
import Autocomplete from './components/Autocomplete';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LikeButton />
        <Autocomplete />
      </header>
    </div>
  );
}

export default App;
