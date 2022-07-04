import dbConnection from './connection.js';

export const deleteUser = (username) => {
  const query = 'DELETE FROM Users WHERE Username = ?;';
  return dbConnection.executeQuery(query, username);
};

export const deleteIngredients = () => {
  const query = 'Delete FROM ingredients;';
  return dbConnection.executeQuery(query);
};


