import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import initial from './router/index.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
//   User.findById()
// })

initial(app);

mongoose.connect(process.env.ACCESS_URL_MONGODB)
  .then(res => {
    console.log('Connected to mongoDb!');
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    })
  })
  .catch(err => console.log(err))
