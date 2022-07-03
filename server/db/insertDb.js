import dbConnection from './connection.js';

export const insertUserGroup= (groupName) => {
  const query = 'INSERT INTO UserGroups VALUES ( 0,?);';
  return dbConnection.executeQuery(query, [groupName]);
};

export const insertUserAdmin = (username, hashedPassword) => {
  const query = 'INSERT INTO Users VALUES ( 0,?,?,1);';
  return dbConnection.executeQuery(query, [username, hashedPassword]);
};

export const insertUserUser = (username, hashedPassword) => {
  const query = 'INSERT INTO Users VALUES ( 0,?,?,2);';
  return dbConnection.executeQuery(query, [username, hashedPassword]);
};
