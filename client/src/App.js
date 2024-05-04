import { useState, useEffect } from 'react';
import './App.css';

function App() {

   useEffect(() => {
    fetch('/test')
    .then((response) =>
      response.json())
    .then((data) =>
      console.log(data));
   });

  return (
    <div className="App">
      <h2>Client</h2>
    </div>
  );
}

export default App;
