import React, { useEffect, useState } from 'react';
import '../assets/css/Calender.css';

const Calendar = () => {
    const [inventory] = useState([
        { id: 1, type: "T-shirt", color: "Blue", mood: "Motivated", image: "/images/tshirt1.jpg", name: "Azure Breeze T-shirt" },
        { id: 2, type: "Dress", color: "Red", mood: "Excited", image: "/images/dress2.jpg", name: "Scarlet Affair Dress" },
        { id: 3, type: "Shorts", color: "White", mood: "Chill", image: "/images/shorts1.jpg", name: "Ivory Summer Shorts" },
        { id: 4, type: "Jacket", color: "Green", mood: "Relaxed", image: "/images/jacket1.jpg", name: "Emerald Explorer Jacket" },
        { id: 5, type: "Pants", color: "Gray", mood: "Happy", image: "/images/pants1.jpg", name: "Silver Mist Pants" },
    ]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarDays, setCalendarDays] = useState([]);
    const [activity, setActivity] = useState('');
    const [mood, setMood] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        generateCalendar();
    }, []);

    const toggleInput = () => {
        const inputSection = document.getElementById("inputSection");
        inputSection.style.display = inputSection.style.display === "none" ? "block" : "none";
    };

    const generateCalendar = () => {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => `${year}-${month + 1}-${i + 1}`);
        setCalendarDays(daysArray);
    };

    const addActivity = () => {
        if (!selectedDate || !activity || !mood) {
            alert("Please fill in all fields.");
            return;
        }
        const dayIndex = calendarDays.findIndex(date => date === selectedDate);
        if (dayIndex !== -1) {
            recommendOutfit(mood);
        }
    };

    const recommendOutfit = (mood) => {
        const filteredOutfits = inventory.filter(item => item.mood === mood);
        setRecommendations(filteredOutfits.length > 0 ? filteredOutfits : null);
    };

    return (
        <div>
            <h1>Clothing Recommendations Calendar</h1>
            <button onClick={toggleInput}>Add Activity</button>

            <div id="inputSection" style={{ display: 'none' }}>
                <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
                <select onChange={(e) => setActivity(e.target.value)} value={activity}>
                    <option value="">Select Activity</option>
                    <option value="Gym">Gym</option>
                    <option value="Office">Office</option>
                    <option value="Party">Party</option>
                    <option value="Picnic">Picnic</option>
                    <option value="Beach">Beach</option>
                </select>
                <select onChange={(e) => setMood(e.target.value)} value={mood}>
                    <option value="">Select Mood</option>
                    <option value="Motivated">Motivated</option>
                    <option value="Chill">Chill</option>
                    <option value="Happy">Happy</option>
                    <option value="Excited">Excited</option>
                    <option value="Relaxed">Relaxed</option>
                </select>
                <button onClick={addActivity}>Add Activity</button>
            </div>

            <div id="calendar">
                {calendarDays.map(day => (
                    <div
                        key={day}
                        className={`day ${selectedDate === day ? 'selected' : ''}`}
                        onClick={() => setSelectedDate(day)}
                    >
                        {new Date(day).getDate()}
                    </div>
                ))}
            </div>

            <div id="recommendation">
                <h3>Recommended Outfits for {mood} Mood:</h3>
                {recommendations ? (
                    recommendations.map(outfit => (
                        <div key={outfit.id}>
                            <h4>{outfit.name}</h4>
                            <img src={outfit.image} alt={outfit.name} style={{ width: '100px' }} />
                        </div>
                    ))
                ) : (
                    <p>No outfits available for this mood.</p>
                )}
            </div>
        </div>
    );
};

export default Calendar;