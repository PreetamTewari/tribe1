const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const LoginRoute = require('./routes/login.route');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", LoginRoute);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
