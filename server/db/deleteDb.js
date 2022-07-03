import dbConnection from './connection.js';

export const deleteUser = (username) => {
  const query = 'DELETE FROM Users WHERE Username = ?;';
  return dbConnection.executeQuery(query, username);
};

