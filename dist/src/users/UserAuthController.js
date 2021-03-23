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
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserController_1 = __importDefault(require("./UserController"));
const UserSchema_1 = __importDefault(require("./UserSchema"));
class UserAuthController {
    constructor() {
        this.loginValidator = [
            express_validator_1.check('email', '[email] field is empty!').notEmpty(),
            express_validator_1.check('password', '[password] field is empty!').notEmpty(),
            express_validator_1.check('password', '[password] field length is incorrect! Min 6 and max 12 charsets.').isLength({ min: 6, max: 12 })
        ];
        this.registrationValidator = [
            express_validator_1.check('email', '[email] field is empty!').notEmpty(),
            express_validator_1.check('password', '[password] field is empty!').notEmpty(),
            express_validator_1.check('password', '[password] field length is incorrect! Min 6 and max 12 charsets.').isLength({ min: 6, max: 12 })
        ];
    }
    registration(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = express_validator_1.validationResult(request);
                if (!errors.isEmpty())
                    throw Object.assign({ message: "Registration error!" }, errors);
                let user = yield UserController_1.default.create(request, response);
                console.log(user);
                response.status(200).json("registration method!");
            }
            catch (error) {
                console.log("registration catch");
                response.status(400).json(error);
            }
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = express_validator_1.validationResult(request);
                if (!errors.isEmpty())
                    throw Object.assign({ message: "Registration error!" }, errors);
                const { email, password } = request.body;
                let user = yield UserSchema_1.default.findOne({ email: email });
                if (!user)
                    throw "User with this email not found!";
                console.log(email, password, user);
                // @ts-ignore
                const isPassportValid = bcrypt_1.default.compareSync(password, user.password);
                if (!isPassportValid)
                    throw "Password is wrong!";
                request.session.uid = user._id;
                response.status(200).json(user);
            }
            catch (error) {
                response.status(400).json({
                    message: error
                });
            }
        });
    }
    logout(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield request.session.regenerate(() => {
                    console.log("User logout");
                    response.status(200).json("Logout success!");
                });
            }
            catch (error) {
                response.status(403).json("Logout error");
            }
        });
    }
}
exports.default = new UserAuthController();
