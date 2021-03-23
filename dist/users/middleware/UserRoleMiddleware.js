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
const UserSchema_1 = __importDefault(require("../UserSchema"));
function UserRoleMiddleware(roles) {
    return function (request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.method === "OPTION")
                next();
            console.log(request.session);
            try {
                if (!request.session.uid)
                    throw new Error("UID is not found!");
                let user = yield UserSchema_1.default.findOne({ _id: "605612b1595c532f2cb8ecf5" });
                console.log("user log", user);
                next();
            }
            catch (error) {
                response.status(403).json({
                    message: "Your account have not access to this page!",
                    error: error
                });
            }
        });
    };
}
exports.default = UserRoleMiddleware;
