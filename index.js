const express = require('express');
require('dotenv').config();
const cors = require('cors');
const admin = require('./routes/admin_routes');
const users = require('./routes/user_routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', admin);
app.use('/api/user', users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
})
