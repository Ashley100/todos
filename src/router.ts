import {Application} from "express";

import {todosRouter} from "./todos/router";
import {authRouter, authorRouter, authorsRouter} from "./users/router";


export default function appRouter (app: Application) {

    app.use('/todos', todosRouter);

    app.use('/auth', authRouter);

    app.use('/author', authorRouter);

    app.use('/authors', authorsRouter);

}