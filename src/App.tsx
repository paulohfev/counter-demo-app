import React from 'react';
import Counter from './components/Counter';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Counter initialCount={0} />
    </div>
  );
}

export default App;
