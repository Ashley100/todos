"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const TodosController_1 = __importDefault(require("./TodosController"));
const UserRoleMiddleware_1 = __importDefault(require("../users/middleware/UserRoleMiddleware"));
const todosRouter = express_1.default.Router();
exports.todosRouter = todosRouter;
todosRouter
    .get('/', [UserRoleMiddleware_1.default(["ADMIN"])], TodosController_1.default.getAll)
    .get('/:author', TodosController_1.default.getAllByAuthor)
    .get('/:author/:id', TodosController_1.default.getTodoById)
    .post('/:author', TodosController_1.default.create)
    .put('/:author/:id', TodosController_1.default.update)
    .delete('/:author/:id', TodosController_1.default.delete);
