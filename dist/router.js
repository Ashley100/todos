"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./todos/router");
const router_2 = require("./users/router");
function appRouter(app) {
    app.use('/todos', router_1.todosRouter);
    app.use('/auth', router_2.authRouter);
    app.use('/author', router_2.authorRouter);
    app.use('/authors', router_2.authorsRouter);
}
exports.default = appRouter;
