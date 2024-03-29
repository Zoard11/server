import dbConnection from './connection.js';

export const UserGroupsNumber = () => {
  const query = 'SELECT COUNT(*) AS DB FROM UserGroups';
  return dbConnection.executeQuery(query).then(result => result[0].DB);
};

export const UsersNumber = () => {
  const query = 'SELECT COUNT(*) AS DB FROM Users';
  return dbConnection.executeQuery(query).then(result => result[0].DB);
};

export const allUser = () => {
  const query = 'SELECT * FROM Users';
  return dbConnection.executeQuery(query);
};

export const passwordByUsername = username => {
  const query = 'SELECT password FROM Users WHERE UserName=?';
  return dbConnection.executeQuery(query, username).then(result => result[0]);
};

export const userIDByName = username => {
  const query = 'SELECT UserID FROM Users WHERE UserName=?';
  return dbConnection
    .executeQuery(query, username)
    .then(result => result[0].UserID);
};

export const userRole = username => {
  const query =
    'SELECT UserGroupname FROM Users f JOIN UserGroups fcs ON f.UserGroupID=fcs.UserGroupID WHERE UserName=?';
  return dbConnection
    .executeQuery(query, username)
    .then(result => result[0].UserGroupname);
};

export const allUserWithRole = () => {
  const query =
    'SELECT Username,UserGroupName FROM Users f JOIN UserGroups fcs ON f.UserGroupID=fcs.UserGroupID';
  return dbConnection.executeQuery(query);
};

export const userRoleModify = (groupName, username) => {
  const query =
    'UPDATE Users SET UserGroupID=(SELECT UserGroupID FROM UserGroups WHERE UserGroupname=?) WHERE UserName =?;';
  return dbConnection.executeQuery(query, [groupName, username]);
};

export const selectTopTen = () => {
  const query = 'select * from Ingredients limit 10 ';
  return dbConnection.executeQuery(query);
};

export const selectByName = name => {
  const nameWithSpace = ` ${name}`;
  const query =
    'Select * FROM Ingredients Where `INCI name` LIKE  ? OR `INCI name` LIKE ? ';
  return dbConnection
    .executeQuery(query, [name, nameWithSpace])
    .then(result => result[0]);
};

export const selectBySizeAndByFirstIndex = (
  resultsPerPage,
  indexOfFirstResult,
) => {
  const query = 'select * from Ingredients limit ?,? ';
  return dbConnection.executeQuery(query, [indexOfFirstResult, resultsPerPage]);
};

export const IngredientsNumber = () => {
  const query = 'SELECT COUNT(*) AS DB FROM Ingredients';
  return dbConnection.executeQuery(query).then(result => result[0].DB);
};

export const selectBySizeAndByFirstIndexFilter = (
  resultsPerPage,
  indexOfFirstResult,
  name,
) => {
  const query =
    'select * from Ingredients Where `INCI name` LIKE  ? limit ?,? ';
  return dbConnection.executeQuery(query, [
    name,
    indexOfFirstResult,
    resultsPerPage,
  ]);
};

export const IngredientsNumberFilter = name => {
  const query =
    'SELECT COUNT(*) AS DB FROM Ingredients Where `INCI name` LIKE  ?';
  return dbConnection.executeQuery(query, name).then(result => result[0].DB);
};

export const selectBySizeByFirstIndexFilterAndByOrder = (
  resultsPerPage,
  indexOfFirstResult,
  name,
  order
) => {
  if(order ==='asc'){
      const query =
        'select * from Ingredients Where `INCI name` LIKE  ?  ORDER BY `INCI name` asc limit ?,?;';
      return dbConnection.executeQuery(query, [
        name,
        indexOfFirstResult,
        resultsPerPage
      ]);
  } else{
    const query =
        'select * from Ingredients Where `INCI name` LIKE  ?  ORDER BY `INCI name` desc limit ?,?;';
      return dbConnection.executeQuery(query, [
        name,
        indexOfFirstResult,
        resultsPerPage
      ]);
  }
};