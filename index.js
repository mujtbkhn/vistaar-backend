require('dotenv').config()
const express = require('express')
const cors = require('cors')

const userRoute = require('./routes/user')
const connectToDB = require('./connectToDB')

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors())
app.use(express.json())


app.use('/api', userRoute)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
});


connectToDB()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
