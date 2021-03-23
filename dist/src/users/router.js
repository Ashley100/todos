"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorRouter = exports.authorsRouter = exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./UserController"));
const UsersController_1 = __importDefault(require("./UsersController"));
const UserAuthController_1 = __importDefault(require("./UserAuthController"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const authorRouter = express_1.default.Router();
exports.authorRouter = authorRouter;
const authorsRouter = express_1.default.Router();
exports.authorsRouter = authorsRouter;
authRouter
    .post("/login/", UserAuthController_1.default.login)
    .get("/logout/", UserAuthController_1.default.logout)
    .post("/registration/", [...UserAuthController_1.default.registrationValidator], UserAuthController_1.default.registration);
authorRouter
    .get('/:authorID', UserController_1.default.get)
    .put('/:authorID', UserController_1.default.update)
    .delete('/:authorID', UserController_1.default.delete);
authorsRouter
    .get('/', UsersController_1.default.getAllAuthors)
    .get('/:authorID', UsersController_1.default.getAuthor);
