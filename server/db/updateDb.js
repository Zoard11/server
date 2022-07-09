import dbConnection from './connection.js';

export const updateIngredient= (data,id) =>  {
    const query = 'UPDATE INGREDIENTS SET `COSING Ref No` = ?, `INCI name` = ?,`INN name` = ?,`Ph. Eur. Name` = ?,`CAS No` = ?,`EC No` = ?,`Chem/IUPAC Name / Description`  = ?,`Restriction` = ?,`Function` = ?,`Update Date` = ? WHERE Id=?; ';      
    return dbConnection.executeQuery(query, [data.inputTextCosingRefNo,data.inputTextInciName,data.inputTextInnName,data.inputTextPhEurName,data.inputTextCasNo,data.inputTextEcNo,data.inputTextDescription,data.inputTextRestriction,data.inputTextFunction,new Date(),id]);
  
  };