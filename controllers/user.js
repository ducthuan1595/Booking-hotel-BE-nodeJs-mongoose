import { User } from '../model/user.js';
import { Hotel } from '../model/hotel.js';

let userCurrent;
class UserController {
  addUser (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    User.find()
      .then(user => {
        const existUser = user.find(u => u.email === email);
        if(!existUser) {
          const user = new User({
            email: email,
            password: password,
            isAdmin: false
          })
          user.save()
            .then(user => {
              res.status(200).json({
                message: 'ok',
                user: user
              })
            })
            .catch(err => {
              res.status(400).json({ message: err })
            })
        }else {
          res.status(400).json({ message: 'Email exiting'})
        }
      })
      .catch(err => res.status(400).json({ message: err }))
    
  };

  signIn (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    User.find()
      .then(users => {
        const findUser = users.some(user => {
          if(user.email === email && user.password === password) {
            return user;
          }
        })
        if(findUser) {
          userCurrent = email;
          res.status(200).json({
            message: 'ok',
          })
        }else {
          res.status(400).json({ message: 'Invalid user!'})
        }
      })
      .catch(err => res.status(400).json({ message: err }))
  };

  adminSignIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    User.find()
      .then(users => {
        const findUser = users.some(user => {
          if(user.email === email && user.password === password && user.isAdmin) {
            return user;
          }
        })
        if(findUser) {
          userCurrent = email;
          res.status(200).json({
            message: 'ok',
            user: findUser
          })
        }else {
          res.status(400).json({ message: 'Invalid user!'})
        }
      })
      .catch(err => res.status(400).json({ message: err }))
  }

  getUserCurrent(req, res) {
    if(userCurrent) {
      User.find()
        .then(users => {
          const findUser = users.find(user => user.email === userCurrent);
          return findUser;
        })
        .then((user) => {
          res.status(200).json({
            message: 'ok',
            user: user
          })
        })
        .catch(err => res.status(400).json({ message: err}))
    }else {
      res.status(400).json({ message: 'Not found user.'})
    }

  };

  getAllUser (req, res) {
    User.find()
      .then(users => {
        res.status(200).json({ message: 'ok', users: users })
      })
      .catch(err => res.status(400).json({ message: err }))
  }

}

export const userController = new UserController;