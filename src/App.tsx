import React, { useState } from 'react';

import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [searchKey, setSearchKey] = useState('');

  const handleCardSearch = (searchKey: string) => {
    setSearchKey(searchKey);
  };

  return (
    <div className="flex flex-col h-screen bg-blue-900 text-white">
      <Header onCardSearch={handleCardSearch} />
      <Main searchKey={searchKey} />
    </div>
  );
}

export default App;
