import {Request, Response} from "express";
import TodoSchema from "./TodoSchema";

class TodosController {

    async create (request: Request, response: Response) {

        try {

            // let {id, author, title, description} = request.body;

            let params: any = {};

            Object.keys(request.body).map((el: string) => {
                if(el in TodoSchema.schema.obj) params[el] = request.body[el];
            });

            const todo = await TodoSchema.create(params)

            response.status(200).json(todo);

        } catch (error) {

            response.status(500).json(error);

        }
    }

    async update (request: Request, response: Response) {

        const { id } = request.params;

        let updateParams: any = {};

        Object.keys(request.body).map((el: string) => {
            if(el in TodoSchema.schema.obj) updateParams[el] = request.body[el];
        });

        try {

            const todo = await TodoSchema.findOneAndUpdate({ _id: id }, { ...updateParams }, {});

            response.status(200).json(todo);

        } catch (error) {
            response.status(500).json(error);
        }

    }

    async delete (request: Request, response: Response) {

        const {author, id} = request.params;

        if (!author || !id) response.status(500).json("author or todoID is undefined!");

        try {

            const todo = await TodoSchema.findByIdAndDelete({ _id: id });

            response.status(200).json(todo);

        } catch (error) {
            response.status(500).json(error);
        }
    }

    async getTodoById (request: Request, response: Response) {

        const { author, id } = request.params;

        try {

            const todo = await TodoSchema.find({ author: author, _id: id });

            response.status(200).json(todo);

        } catch (error) {
            response.status(500).json(error);
        }


    }

    async getAll (request: Request, response: Response) {

        try {

            const allTodos = await TodoSchema.find({});

            // response.status(200).json(allTodos);

            response.status(200).send(`
                <pre>
                    ${JSON.stringify(allTodos, null, 4)}
                </pre>
            `);

        } catch (error) {

            response.status(500).json(error);

        }

    }

    async getAllByAuthor (request: Request, response: Response) {

        try {

            const allTodosByAuthor = await TodoSchema.find({ author: request.params.author });

            response.status(200).json(allTodosByAuthor);

        } catch (error) {

            response.status(500).json(error);

        }
    }

}

export default new TodosController();