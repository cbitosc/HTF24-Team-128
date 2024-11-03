import React, { useEffect, useState } from 'react';
import '../assets/css/Wardrobe.css';


const Wardrobe = () => {
    const [inventory, setInventory] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        image: '',
        type: '',
        color: '',
        style: ''
    });

    useEffect(() => {
        // Load inventory from the JSON file
        fetch(`${process.env.PUBLIC_URL}/json/inventory.json`)
            .then(response => response.json())
            .then(data => {
                setInventory(data);
            })
            .catch(error => console.error('Error loading inventory:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setNewItem(prevState => ({ ...prevState, image: reader.result }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInventory(prevInventory => [...prevInventory, newItem]);
        setNewItem({ name: '', image: '', type: '', color: '', style: '' });
        setFormVisible(false);
        showNotification();
    };

    const showNotification = () => {
        setNotificationVisible(true);
        setTimeout(() => {
            setNotificationVisible(false);
        }, 3000);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const filteredInventory = inventory.filter(item => 
            (name === 'type' && item.type === value) ||
            (name === 'color' && item.color === value) ||
            (name === 'style' && item.style === value)
        );
        setInventory(filteredInventory);
    };

    const uniqueValues = (key) => [...new Set(inventory.map(item => item[key]))];

    return (
        <div className="container">
            <h1>
                Clothing Inventory <span className="add-item" onClick={() => setFormVisible(!formVisible)}>+</span>
            </h1>
            {formVisible && (
                <form id="item-form" onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} required />
                    <input type="text" name="name" value={newItem.name} onChange={handleInputChange} placeholder="Name (e.g., Summer Shirt)" required />
                    <input type="text" name="type" value={newItem.type} onChange={handleInputChange} placeholder="Type (e.g., Shirt)" required />
                    <input type="text" name="color" value={newItem.color} onChange={handleInputChange} placeholder="Color" required />
                    <input type="text" name="style" value={newItem.style} onChange={handleInputChange} placeholder="Style (e.g., Casual)" required />
                    <button type="submit">Add Item</button>
                </form>
            )}
            {notificationVisible && <div className="notification">Item added successfully!</div>}
            <div className="filter">
                <h2>Filter Items</h2>
                <select name="type" onChange={handleFilterChange}>
                    <option value="">Select Type</option>
                    {uniqueValues('type').map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <select name="color" onChange={handleFilterChange}>
                    <option value="">Select Color</option>
                    {uniqueValues('color').map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
                <select name="style" onChange={handleFilterChange}>
                    <option value="">Select Style</option>
                    {uniqueValues('style').map(style => (
                        <option key={style} value={style}>{style}</option>
                    ))}
                </select>
            </div>

            <div id="inventory" className="inventory">
                {inventory.map((item, index) => (
                    <div key={index} className="inventory-item">
                        <img src={item.image} alt={item.name} />
                        <strong>{item.name}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wardrobe;