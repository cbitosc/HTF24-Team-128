import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [userName, setUserName] = useState(null); // State to hold user name

  return (
    <div>
      <BrowserRouter>
      <Navbar userName={userName} setUserName={setUserName} />
        <Routes>
          <Route path="/login" element={<Login setUserName={setUserName} />} /> {/* Pass setUserName to Login */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); // Render the App component

export default App;