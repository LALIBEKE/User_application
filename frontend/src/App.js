
import React from 'react';
import './App.css'; 
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserActions from './components/UserActions';

function App() {
  return (
    <div className="background">
      <div className="header">
        <UserActions />
      </div>
      <div className="main-content">
        <SignIn />
        <SignUp />

      </div>
    </div>
  );
}

export default App;
