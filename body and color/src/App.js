// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Update imports
import BodyColorAnalysis from './BodyColorAnalysis';
import UploadAnalysis from './UploadAnalysis'; // Import the new component

function App() {
    return (
        <Router>
            <div className="App">
                <Routes> {/* Use Routes instead of Switch */}
                    <Route path="/" element={<BodyColorAnalysis />} /> {/* Update Route syntax */}
                    <Route path="/upload-analysis" element={<UploadAnalysis />} /> {/* Update Route syntax */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
