import {Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SECRET from '../util/config.js';
import * as db from '../db/requests.js';
import * as insertDb from '../db/insertDb.js';

const router = Router();

const PASSWORD = '123456789';
const HASHED_PASSWORD = bcrypt.hashSync(PASSWORD, bcrypt.genSaltSync(10));

// Default admin user
setTimeout(async () => {
  const usersNumber = await db.UsersNumber();
  if (usersNumber === 0) {
    insertDb.insertUserAdmin('Admin', HASHED_PASSWORD);
  }
}, 2000);

router.post('/login', async (req, resp) => {
  try {
    const {username, password} = req.body.data;
    if (username && password) {
      const passwordInDatabase = await db.passwordByUsername(username);
      if (passwordInDatabase) {
        if (await bcrypt.compare(password, passwordInDatabase.password)) {
          const token = jwt.sign({username}, SECRET);
          const permission = await db.userRole(username);

          resp.json({token, permission, username});
        } else {
          resp.status(401).send('Wrong password!');
        }
      } else {
        resp.status(401).send('Wrong username!');
      }
    } else {
      resp.status(401).send('Error!');
    }
  }
  catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.post('/register', async (req, resp) => {
  try {
    const {username, password, password2} = req.body.data;
    if (username && password && password2) {
      if (password === password2) {
        const user = await db.passwordByUsername(username);
        if (!user) {
          const hashedPassword = await bcrypt.hash(
            password,
            bcrypt.genSaltSync(10),
          );
          await insertDb.insertUserUser(username, hashedPassword);
          const token = jwt.sign({username}, SECRET);

          const permission = await db.userRole(username);
          resp.json({token, permission, username});
        } else {
          const message = 'Username already exist!';
          resp.status(401).json(message);
        }
      } else {
        const message = 'The two password is not matching!';
        resp.status(401).json(message);
      }
    } else {
      const message = 'There is no username or password!';
      resp.status(401).json(message);
    }
  }
  catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

export default router;
