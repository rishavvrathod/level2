// src/App.js
import React from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Registration Form</h1>
      </header>
      <main>
        <RegistrationForm />
      </main>
    </div>
  );
}

export default App;
