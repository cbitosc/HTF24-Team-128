import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import Navbar from './components/Navbar';
import Calender from './pages/Calender';
import Contest from './pages/Contest';
import JoinContest from './pages/JoinContest';
import Login from './pages/Login'; // Assuming you have a login page component
import SavedOutfits from './pages/SavedOutfits';
import Signup from './pages/SignUp';
import UploadOutfit from './pages/UploadOutfit';
import Wardrobe from './pages/Wardrobe';


const App = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userName, setUserName] = useState('');
  console.log("Current User ID:", currentUserId); // Debugging log

  return (
    <Router>
      <Navbar userName={userName} setUserName={setUserName} /> {/* Pass props here */}
      <Routes>
        <Route path="/" element={<Feed currentUserId={currentUserId} />} />
        <Route path="/login" element={<Login setUserName={setUserName} setCurrentUserId={setCurrentUserId} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/saved-outfits" element={<SavedOutfits currentUserId={currentUserId} />} />
        <Route path="/upload-outfit" element={<UploadOutfit currentUserId={currentUserId} />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/joincontest" element={<JoinContest />} />



      </Routes>
    </Router>
  );
}

export default App;
