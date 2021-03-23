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
const TodoSchema_1 = __importDefault(require("./TodoSchema"));
class TodosController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // let {id, author, title, description} = request.body;
                let params = {};
                Object.keys(request.body).map((el) => {
                    if (el in TodoSchema_1.default.schema.obj)
                        params[el] = request.body[el];
                });
                const todo = yield TodoSchema_1.default.create(params);
                response.status(200).json(todo);
            }
            catch (error) {
                response.status(500).json(error);
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            let updateParams = {};
            Object.keys(request.body).map((el) => {
                if (el in TodoSchema_1.default.schema.obj)
                    updateParams[el] = request.body[el];
            });
            try {
                const todo = yield TodoSchema_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, updateParams), {});
                response.status(200).json(todo);
            }
            catch (error) {
                response.status(500).json(error);
            }
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { author, id } = request.params;
            if (!author || !id)
                response.status(500).json("author or todoID is undefined!");
            try {
                const todo = yield TodoSchema_1.default.findByIdAndDelete({ _id: id });
                response.status(200).json(todo);
            }
            catch (error) {
                response.status(500).json(error);
            }
        });
    }
    getTodoById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { author, id } = request.params;
            try {
                const todo = yield TodoSchema_1.default.find({ author: author, _id: id });
                response.status(200).json(todo);
            }
            catch (error) {
                response.status(500).json(error);
            }
        });
    }
    getAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allTodos = yield TodoSchema_1.default.find({});
                // response.status(200).json(allTodos);
                response.status(200).send(`
                <pre>
                    ${JSON.stringify(allTodos, null, 4)}
                </pre>
            `);
            }
            catch (error) {
                response.status(500).json(error);
            }
        });
    }
    getAllByAuthor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allTodosByAuthor = yield TodoSchema_1.default.find({ author: request.params.author });
                response.status(200).json(allTodosByAuthor);
            }
            catch (error) {
                response.status(500).json(error);
            }
        });
    }
}
exports.default = new TodosController();
