import dbConnection from './connection.js';
import {UserGroupsNumber} from './requests.js';
import {insertUserGroup} from './insertDb.js';

export const createTableStudents = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS Ingredients (
      \`COSING Ref No\` VARCHAR(10),
      \`INCI name\` TEXT,
      \`INN name\` VARCHAR(400),
      \`Ph. Eur. Name\` VARCHAR(400),
      \`CAS No\` VARCHAR(400),
      \`EC No\` VARCHAR(400),
      \`Chem/IUPAC Name / Description\` TEXT,
      \`Restriction\` VARCHAR(400),
      \`Function\` VARCHAR(400),
      \`Update Date\` Date,
        Id INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (\`Id\`) 
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
