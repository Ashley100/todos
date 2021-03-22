/**
 *
 *  /auth/registration/   - POST - create user in system
 *  /auth/login/          - POST - login user in system
 *  ------------------------------------------------------
 *  /author/<authorID>    - GET - get author info
 *  /author/<authorID>    - PUT - update author info
 *  /author/<authorID>    - DELETE - delete author info
 *  ------------------------------------------------------
 *  /authors/<authorID>   - GET - find author by name
 *  /authors/             - POST - create new author
 *
 **/

import express, {Router, Request, Response} from "express";
import {check} from "express-validator";

import UserController from "./UserController";
import UsersController from './UsersController';
import UserAuthController from "./UserAuthController";
import UserRoleMiddleware from "./middleware/UserRoleMiddleware";

const authRouter: Router = express.Router();
const authorRouter: Router = express.Router();
const authorsRouter: Router = express.Router();

authRouter
    .post("/login/", UserAuthController.login)
    .get("/logout/", UserAuthController.logout)
    .post("/registration/", [...UserAuthController.registrationValidator], UserAuthController.registration)

authorRouter
    .get('/:authorID', UserController.get)
    .put('/:authorID', UserController.update)
    .delete('/:authorID', UserController.delete);

authorsRouter
    .get('/', UsersController.getAllAuthors)
    .get('/:authorID', UsersController.getAuthor);


export {authRouter, authorsRouter, authorRouter};
