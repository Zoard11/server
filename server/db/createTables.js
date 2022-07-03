import dbConnection from './connection.js';
import { UserGroupsNumber } from './requests.js';
import { insertUserGroup } from './insertDb.js';

export const createTableStudents = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS Ingredients (
      "COSING Ref No" INT
      ,"INCI name",
      "INN name","Ph. Eur. Name","CAS No","EC No","Chem/IUPAC Name / Description",
      "Restriction","Function","Update Date" 
        PRIMARY KEY (StudentID)
            );`);
    console.log('Table created successfully');
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }
};

export const createTableUserGroups = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS UserGroups(
      UserGroupID INT NOT NULL AUTO_INCREMENT,
      UserGroupName VARCHAR(100),
      PRIMARY KEY (UserGroupID)
    );`);
    console.log('Table created successfully');
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }
};

export const createTableUsers = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS Users (
      UserID INT NOT NULL AUTO_INCREMENT,
      Username VARCHAR(100),
      Password  VARCHAR(256),
      UserGroupID INT,
      PRIMARY KEY (UserID),
      FOREIGN KEY (UserGroupID) REFERENCES UserGroups(UserGroupID)
      );`);
    console.log('Table created successfully');
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }
};
export const createAllTable = async () => {
  try {
    await createTableUserGroups();
    await createTableUsers();
    await createTableStudents();
    const userGroupsNumber = await UserGroupsNumber();
    if (userGroupsNumber === 0) {
      await insertUserGroup('admin');
      await insertUserGroup('user');
    }
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }
};
