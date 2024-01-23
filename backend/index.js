const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()

const PORT = process.env.PORT || 5000;

//connect to mongodb
mongoose.connect("mongodb+srv://prasadsontakke731:pAU9C0kUWVzTvtUO@cluster0.j9xehqc.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected DB");
    })
    .catch((err) => {
        console.log(err);
    })
// Body parser middleware
app.use(bodyParser.json());

// Define MongoDB Schema
const schema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    hobbies: String,
});

const Entry = mongoose.model('Entry', schema);

// API to get all entries
app.get('/api/entries', async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// API to add a new entry
app.post('/api/entries', async (req, res) => {
    try {
        const newEntry = new Entry(req.body);
        await newEntry.save();
        res.json(newEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// API to update an entry
app.put('/api/entries/:id', async (req, res) => {
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// API to delete an entry
app.delete('/api/entries/:id', async (req, res) => {
    try {
        const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
        res.json(deletedEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
