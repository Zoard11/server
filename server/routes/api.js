import express from 'express';
import * as uploadDb from '../db/uploadDb.js';
import * as deleteDb from '../db/deleteDb.js';
import multer from 'multer';
import * as requestDb from '../db/requests.js';
import * as updateDb from '../db/updateDb.js';
import * as insertDb from '../db/insertDb.js';

const router = express.Router();

const upload = multer({dest: 'tmp/csv/'});

router.get('/:name', async (req, resp) => {
  try {
    if (req.params.name) {
      const name = req.params.name.toString().trim();
      const result = await requestDb.selectByName(name);

      if (result) {
        resp.json(result);
      } else {
        resp.json('There is no ingredient with this name.');
      }
    } else {
      const errorMessage = 'Name is missing!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(400).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.post('/ingredients', upload.single('file'), async (req, resp) => {
  try {
    if (resp.locals.permission === 'admin') {
      if (req.file.filename) {
        await deleteDb.deleteIngredients();
        await uploadDb.changeIngredients(req.file.filename);

        resp.status(204).send();
      } else {
        const errorMessage = 'File is missing!';
        const obj = {};
        obj.errorMessage = errorMessage;
        const jsonString = JSON.stringify(obj);
        resp.status(400).json(jsonString);
      }
    } else {
      const errorMessage = 'Only admins can update database!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(403).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.get('/', async (req, resp) => {
  try {
    const dataPerPage = parseInt(req.query.dataPerPage);
    const indexOfFirstResult = parseInt(req.query.indexOfFirstResult);
    const search = `${req.query.search}%`;
    const order = req.query.order;

      if(order === ''){
          if (indexOfFirstResult === -1) {
            const db = await requestDb.IngredientsNumberFilter(search);

            let indexFirstResult = parseInt(db / dataPerPage) * dataPerPage;
            if (indexFirstResult === db) {
              indexFirstResult = indexFirstResult - 1;
            }

            await requestDb
              .selectBySizeAndByFirstIndexFilter(
                dataPerPage,
                indexFirstResult,
                search,
              )
              .then(result => {
                if (result) {
                  result.currentPage = indexFirstResult;
                  const response = {
                    result: result,
                    currentPage: parseInt(indexFirstResult / dataPerPage) + 1,
                  };
                  resp.json(response);
                } else {
                  resp.json('There is no ingredients in the database.');
                }
              })
              .catch(function (error) {
                console.log(error);
                resp.status(500).json('Database error.');
              });
          } else {
            await requestDb
              .selectBySizeAndByFirstIndexFilter(
                dataPerPage,
                indexOfFirstResult,
                search,
              )
              .then(result => {
                if (result) {
                  resp.json(result);
                } else {
                  resp.json('There is no ingredients in the database.');
                }
              })
              .catch(function (error) {
                console.log(error);
                resp.status(500).json('Database error.');
              });
          }
    } else{
      if (indexOfFirstResult === -1) {
        const db = await requestDb.IngredientsNumberFilter(search);

        let indexFirstResult = parseInt(db / dataPerPage) * dataPerPage;
        if (indexFirstResult === db) {
          indexFirstResult = indexFirstResult - 1;
        }

        await requestDb
          .selectBySizeByFirstIndexFilterAndByOrder(
            dataPerPage,
            indexFirstResult,
            search,
            order
          )
          .then(result => {
            if (result) {
              result.currentPage = indexFirstResult;
              const response = {
                result: result,
                currentPage: parseInt(indexFirstResult / dataPerPage) + 1,
              };
              resp.json(response);
            } else {
              resp.json('There is no ingredients in the database.');
            }
          })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          });
      } else {
        await requestDb
          .selectBySizeByFirstIndexFilterAndByOrder(
            dataPerPage,
            indexOfFirstResult,
            search,
            order
          )
          .then(result => {
            if (result) {
              resp.json(result);
            } else {
              resp.json('There is no ingredients in the database.');
            }
          })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          });
      }
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.put('/:id', async (req, resp) => {
  try {
    if (resp.locals.permission === 'admin') {
      if (req.params.id) {
        await updateDb
          .updateIngredient(req.body, req.params.id)
          .then(() => {
            resp.status(204).send();
          })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          });
      } else {
        const errorMessage = 'Id is missing!';
        const obj = {};
        obj.errorMessage = errorMessage;
        const jsonString = JSON.stringify(obj);
        resp.status(400).json(jsonString);
      }
    } else {
      const errorMessage = 'Only admins can update database!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(403).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.delete('/:id', async (req, resp) => {
  try {
    if (resp.locals.permission === 'admin') {
      if (req.params.id) {
        await deleteDb
          .deleteIngredientById(req.params.id)
          .then(() => {
            resp.status(204).send();
          })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          });
      } else {
        const errorMessage = 'Id is missing!';
        const obj = {};
        obj.errorMessage = errorMessage;
        const jsonString = JSON.stringify(obj);
        resp.status(400).json(jsonString);
      }
    } else {
      const errorMessage = 'Only admins can update database!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(403).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.post('/ingredient', async (req, resp) => {
  try {
    if (resp.locals.permission === 'admin') {
      await insertDb
        .insertIngredient(req.body)
        .then(() => {
          resp.status(204).send();
        })
        .catch(function (error) {
          console.log(error);
          resp.status(500).json('Database error.');
        });
    } else {
      const errorMessage = 'Only admins can update database!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(403).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.get('/users', async (req, resp) => {
  try {
    if (resp.locals.permission === 'admin') {
      const result = await requestDb.allUserWithRole();

      resp.json(result);
    } else {
      const errorMessage = 'Only admins can see this!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(403).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.delete('/users/:username', async (req, resp) => {
  try {
    if (resp.locals.permission === 'admin') {
      if (req.params.username) {
        await deleteDb
          .deleteUser(req.params.username)
          .then(() => {
            resp.status(204).send();
          })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          });
      } else {
        const errorMessage = 'Id is missing!';
        const obj = {};
        obj.errorMessage = errorMessage;
        const jsonString = JSON.stringify(obj);
        resp.status(400).json(jsonString);
      }
    } else {
      const errorMessage = 'Only admins can delete from database!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(403).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

router.patch('/users/:username', async (req, resp) => {
  try {
    if (resp.locals.permission === 'admin') {
      if (
        req.params.username &&
        req.body.newRole &&
        resp.locals.payload.username !== req.params.username
      ) {
        await requestDb
          .userRoleModify(req.body.newRole, req.params.username)
          .then(() => {
            resp.status(204).send();
          })
          .catch(function (error) {
            console.log(error);
            resp.status(500).json('Database error.');
          });
      } else {
        const errorMessage = 'Bad request!';
        const obj = {};
        obj.errorMessage = errorMessage;
        const jsonString = JSON.stringify(obj);
        resp.status(400).json(jsonString);
      }
    } else {
      const errorMessage = 'Only admins can modify user roles!';
      const obj = {};
      obj.errorMessage = errorMessage;
      const jsonString = JSON.stringify(obj);
      resp.status(403).json(jsonString);
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.message;
    const obj = {};
    obj.errorMessage = errorMessage;
    const jsonString = JSON.stringify(obj);
    resp.status(500).json(jsonString);
  }
});

export default router;
