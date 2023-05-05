import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import initial from './router/index.js';
import { User } from './model/user.js';

const port = 5000;
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
//   User.findById()
// })

initial(app);

mongoose.connect('mongodb+srv://thuantruong:gMOcUbEFedwxY8RV@cluster0.gl2bqhl.mongodb.net/booking?retryWrites=true&w=majority')
  .then(res => {
    console.log('Connected to mongoDb!');
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    })
  })
  .catch(err => console.log(err))
