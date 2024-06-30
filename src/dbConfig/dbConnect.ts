import mongoose from "mongoose";
require('dotenv').config();

const connect = () => {
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL environment variable is not set');
    }

    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to database Successfully')
    })
    .catch((error) => {
        console.log('Error connecting to Database');
        console.error(error);
    })
}

export default connect;