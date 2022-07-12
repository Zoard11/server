import jwt from 'jsonwebtoken';
import  SECRET  from '../util/config.js';
import * as db from '../db/requests.js';

export async function decodeJWTToken(req, resp, next) {
  resp.locals.payload = {};
  if (req.headers.authorization) {
    try {
      resp.locals.payload = jwt.verify(req.headers.authorization, SECRET);
      resp.locals.permission = await db.userRole(resp.locals.payload.username);
    } catch (error) {
      resp.clearCookie('token');
    }
  }
  next();
}
