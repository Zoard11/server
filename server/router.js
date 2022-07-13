import express from "express";
import * as db from "./database.js";
import bcrypt from "bcrypt";
import * as db from "../db/requests.js";
import * as insertDb from "../db/insertDb.js";

const router = express.Router();

const PASSWORD = "123456789";
const HASHED_PASSWORD = bcrypt.hashSync(PASSWORD, bcrypt.genSaltSync(10));

// Default admin user
setTimeout(async () => {
  const usersNumber = await db.UsersNumber();
  if (usersNumber === 0) {
    insertDb.insertUserAdmin("Admin", HASHED_PASSWORD);
  }
}, 2000);

router.get("", async (req, resp) => {
  console.log("Home");
});

export default router;
