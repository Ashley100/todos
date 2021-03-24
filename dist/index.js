"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const config_1 = require("./config");
const router_1 = __importDefault(require("./router"));
const passport_1 = __importDefault(require("passport"));
const PORT = process.env.PORT || config_1.appConfig.PORT;
const app = express_1.default();
app.use(express_1.default.json());
/**
 * Session options
 */
let sessionOptions = {
    secret: config_1.appConfig.appSessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 600000
    },
    store: connect_mongo_1.default.create({
        mongoUrl: config_1.appConfig.db.url
    })
};
app.use(express_session_1.default(sessionOptions));
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
    let views = request.session.views;
    response.status(200).send(`
        <h1>Session id: ${request.session.id}</h1>
        <pre>Session id: ${JSON.stringify(request.headers, null, 4)}</pre>
        <p>views: ${views}</p>
    `);
});
/**
 * Passport initialization
 */
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
/**
 * App router
 */
router_1.default(app);
/**
 * App start
 */
(function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.appConfig.db.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false
            });
            app.listen(PORT, () => console.log('Express server started at post:' + PORT));
        }
        catch (e) {
            console.error(e);
        }
    });
})();
exports.default = app;
