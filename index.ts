import express, { Application } from 'express';
import session, {Session, SessionOptions} from "express-session";
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import {appConfig} from "./src/config";
import appRouter from "./src/router";
import passport from "passport";

const PORT = process.env.PORT || appConfig.PORT;

const app: Application = express();

app.use(express.json());

/**
 * Session options
 */
let sessionOptions : SessionOptions = {
    secret: appConfig.appSessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 600000
    },
    store: MongoStore.create({
        mongoUrl: appConfig.db.url
    })
};
app.use(session(sessionOptions));

/**
 * Test
 */
declare module 'express-session' {
    interface SessionData {
        views: number;
    }
}
app.use(function (request, response, next) {

//  // @ts-ignore
    request.session.views = request.session.views ? request.session.views + 1 : 1;
    // @ts-ignore
    console.log(request.session.views);
    console.log(request.session.id);
    console.log(request.session.cookie);

    next();
});
/**
 * Test
 */


app.get('/', function (request, response) {
    // @ts-ignore
    let views = request.session.views
    response.status(200).send(`
        <h1>Session id: ${request.session.id}</h1>
        <pre>Session id: ${JSON.stringify(request.headers, null, 4)}</pre>
        <p>views: ${views}</p>
    `);
});


/**
 * Passport initialization
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * App router
 */
appRouter(app);

/**
 * App start
 */
(async function startApp () {
    try {

        await mongoose.connect(appConfig.db.url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });

        app.listen(PORT, () => console.log('Express server started at post:' + PORT));

    } catch (e) {
        console.error(e);
    }

})();


export default app;