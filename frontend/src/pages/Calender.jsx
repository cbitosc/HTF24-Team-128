import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../assets/css/Calender.css';

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activity, setActivity] = useState('');
    const [activities, setActivities] = useState([]); // Array to store multiple activities
  
    // Mock function to get outfit based on activity
    const getOutfitSuggestion = (activity) => {
      switch (activity.toLowerCase()) {
        case 'gym':
          return 'Workout clothes, sneakers, water bottle';
        case 'office':
          return 'Formal wear, blazer, leather shoes';
        case 'party':
          return 'Casual dress, trendy shoes, accessories';
        case 'casual':
          return 'T-shirt, jeans, sneakers';
        default:
          return 'No outfit suggestion available';
      }
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleActivityChange = (event) => {
      setActivity(event.target.value);
    };
  
    const handleAddActivity = (event) => {
      event.preventDefault();
      if (activity) {
        const outfit = getOutfitSuggestion(activity);
        setActivities([...activities, { activity, outfit }]); // Add new activity to the list
        setActivity(''); // Clear input field after adding activity
      }
    };
  
    return (
      <div className="calendar-page">
        <h1>Plan Your Day</h1>
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <form className="activity-form" onSubmit={handleAddActivity}>
          <label htmlFor="activity">Add Activity</label>
          <input
            type="text"
            id="activity"
            value={activity}
            onChange={handleActivityChange}
            placeholder="e.g., Gym, Office, Party"
            required
          />
          <button type="submit">Add Activity</button>
        </form>
        {activities.length > 0 && (
          <div className="outfit-suggestions">
            <h2>Outfit Suggestions</h2>
            <ul>
              {activities.map((item, index) => (
                <li key={index}>
                  <strong>{item.activity}:</strong> {item.outfit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default CalendarPage;