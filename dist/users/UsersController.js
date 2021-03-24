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
class UsersController {
    getAuthor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorID } = request.params;
            console.log(request.params);
            try {
                const todo = yield UserSchema_1.default.find({ _id: authorID });
                response.status(200).json(todo);
            }
            catch (error) {
                response.status(500).json(error);
            }
        });
    }
    getAllAuthors(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allAuthors = yield UserSchema_1.default.find({});
                response.status(200).json(allAuthors);
            }
            catch (error) {
                response.status(500).json(error);
            }
        });
    }
}
exports.default = new UsersController();
