import dbConnection from './connection.js';

export const deleteUser = username => {
  const query = 'DELETE FROM Users WHERE Username = ?;';
  return dbConnection.executeQuery(query, username);
};

export const deleteIngredients = () => {
  const query = 'Delete FROM Ingredients;';
  return dbConnection.executeQuery(query);
};

export const deleteIngredientById = id => {
  const query = 'Delete FROM Ingredients WHERE Id = ?';
  return dbConnection.executeQuery(query, id);
};
