/**
 *  /todos              - GET - list of all todos in data base
 *  /todos/:author      - GET - list of all todos by current user[id]
 *
 *  /todos/:author/      - POST - create todo by author
 *  /todos/:author/:id   - GET - todo by id
 *  /todos/:author/:id   - PUT - update todo by id
 *  /todos/:author/:id   - DELETE - delete todo by author
 *
 **/

import express, {Router, Request, Response} from "express";

import TodosController from './TodosController';
import UserRoleMiddleware from "../users/middleware/UserRoleMiddleware";

const todosRouter: Router = express.Router();


todosRouter
    .get('/', [UserRoleMiddleware(["ADMIN"])], TodosController.getAll)
    .get('/:author', TodosController.getAllByAuthor)
    .get('/:author/:id', TodosController.getTodoById)
    .post('/:author', TodosController.create)
    .put('/:author/:id', TodosController.update)
    .delete('/:author/:id', TodosController.delete);


export {todosRouter};

