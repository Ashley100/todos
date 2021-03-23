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
const UserSchema_1 = __importDefault(require("./UserSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDefaultFields = {
    registrationDate: new Date(),
};
class UserController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = request.body;
                let candidate = yield UserSchema_1.default.findOne({ email: email });
                if (candidate)
                    throw 'User is registered!';
                const hashPassword = bcrypt_1.default.hashSync(password, 4);
                const user = yield UserSchema_1.default.create(Object.assign({ email: email, password: hashPassword }, userDefaultFields));
                return user;
            }
            catch (error) {
                throw { error };
            }
        });
    }
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { authorID } = request.params;
                let author = yield UserSchema_1.default.findOne({ _id: authorID });
                if (author === null)
                    throw { error: "Author just deleted!" };
                response.status(200).json(author);
            }
            catch (error) {
                response.status(500).json({
                    message: "Author not found!",
                    error
                });
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { authorID } = request.params;
                let params = {};
                let invalidFields = [];
                Object.keys(request.body).map((el) => {
                    if (el in UserSchema_1.default.schema.obj)
                        params[el] = request.body[el];
                    else
                        invalidFields.push(el);
                });
                if (invalidFields.length) {
                    response.status(500).json({
                        message: "[ERROR] Invalid fields!",
                        error: invalidFields
                    });
                }
                let author = yield UserSchema_1.default.findOneAndUpdate({ _id: authorID }, params);
                response.status(200).json({
                    message: "Author updated success!",
                    author
                });
            }
            catch (error) {
                response.status(500).json({
                    message: "[ERROR] Author update method!",
                    error
                });
            }
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { authorID } = request.params;
                let author = yield UserSchema_1.default.deleteOne({ _id: authorID });
                response.status(200).json({
                    message: "Author deleted success!",
                    author
                });
            }
            catch (error) {
                response.status(500).json({
                    message: "[ERROR] Author delete method!",
                    error
                });
            }
        });
    }
}
exports.default = new UserController();
