import {Request, Response} from "express";
import UserSchema from "./UserSchema";

class UsersController {

    async getAuthor (request: Request, response: Response) {

        const { authorID } = request.params;

        console.log(request.params);

        try {

            const todo = await UserSchema.find({ _id: authorID });

            response.status(200).json(todo);

        } catch (error) {
            response.status(500).json(error);
        }


    }


    async getAllAuthors (request: Request, response: Response) {

        try {

            const allAuthors = await UserSchema.find({});

            response.status(200).json(allAuthors);

        } catch (error) {

            response.status(500).json(error);

        }

    }

}

export default new UsersController();