import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Calender from './pages/Calender';
import Login from './pages/Login';
import SavedOutfits from './pages/SavedOutfits';
import SignUp from './pages/SignUp';
import UploadOutfit from './pages/UploadOutfit';
import Wardrobe from './pages/Wardrobe';


function App() {
  const [userName, setUserName] = useState(null); // State to hold user name

  return (
    <div>
      <BrowserRouter>
      <Navbar userName={userName} setUserName={setUserName} />
        <Routes>
          <Route path="/login" element={<Login setUserName={setUserName} />} /> {/* Pass setUserName to Login */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/saved-outfits" element={<SavedOutfits currentUserId={currentUserId} />} />
          <Route path="/upload-outfit" element={<UploadOutfit currentUserId={currentUserId} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); // Render the App component

export default App;