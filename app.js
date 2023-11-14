const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Placeholder variables to store data
let rooms = [];
let bookings = [];

// Endpoint to create a room
app.post('/createRoom', (req, res) => {
    // Your logic to create a room
});

// Endpoint to book a room
app.post('/bookRoom', (req, res) => {
    // Your logic to book a room
    app.post('/createRoom', (req, res) => {
        const { roomName, seats, amenities, pricePerHour } = req.body;
        const newRoom = { roomName, seats, amenities, pricePerHour };
        rooms.push(newRoom);
        res.status(201).json({ message: 'Room created successfully', room: newRoom });
    });
    
});

// Endpoint to list all rooms with booked data
app.get('/listRooms', (req, res) => {
    // Your logic to list all rooms with booked data
    app.post('/bookRoom', (req, res) => {
        const { customerName, date, startTime, endTime, roomName } = req.body;
        const room = rooms.find((r) => r.roomName === roomName);
    
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
    
        const newBooking = {
            customerName,
            date,
            startTime,
            endTime,
            roomName,
            bookedStatus: 'Booked',
        };
    
        bookings.push(newBooking);
        res.status(201).json({ message: 'Room booked successfully', booking: newBooking });
    });
});

// Endpoint to list all customers with booked data
app.get('/listCustomers', (req, res) => {
    // Your logic to list all customers with booked data
    app.get('/listRooms', (req, res) => {
        const roomsWithBookings = rooms.map((room) => {
            const bookingsForRoom = bookings.filter((booking) => booking.roomName === room.roomName);
            return { ...room, bookings: bookingsForRoom };
        });
        res.status(200).json({ rooms: roomsWithBookings });
    });
    
    // Endpoint to list all customers with booked data
    app.get('/listCustomers', (req, res) => {
        const customersWithBookings = bookings.reduce((acc, booking) => {
            if (!acc[booking.customerName]) {
                acc[booking.customerName] = [];
            }
            acc[booking.customerName].push(booking);
            return acc;
        }, {});
        res.status(200).json({ customers: customersWithBookings });
    });
});

// Endpoint to list booking details for a customer
app.get('/customerBooking/:customerName', (req, res) => {
    // Your logic to list booking details for a customer
    app.get('/customerBooking/:customerName', (req, res) => {
        const { customerName } = req.params;
        const bookingsForCustomer = bookings.filter((booking) => booking.customerName === customerName);
        res.status(200).json({ customerName, bookings: bookingsForCustomer });
    });
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
