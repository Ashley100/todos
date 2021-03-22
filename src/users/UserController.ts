import {Request, Response} from "express";
import UserSchema from "./UserSchema";
import bcrypt from "bcrypt";


interface UserControllerInterface {
    create  (request: Request, response: Response): void,
    get     (request: Request, response: Response): void,
    update  (request: Request, response: Response): void,
    delete  (request: Request, response: Response): void
}


const userDefaultFields = {
    registrationDate: new Date(),
}


class UserController implements UserControllerInterface {

    async create (request: Request, response: Response) {

        try {

            const { email, password } = request.body;

            let candidate = await UserSchema.findOne({ email: email });

            if (candidate) throw 'User is registered!';

            const hashPassword = bcrypt.hashSync(password, 4);

            const user = await UserSchema.create({ email: email, password: hashPassword, ...userDefaultFields });

            return user;

        } catch (error) {

            throw {error};

        }
    }


    async get (request: Request, response: Response) {

        try {

            let { authorID } = request.params;

            let author = await UserSchema.findOne({ _id: authorID });

            if (author === null) throw { error: "Author just deleted!" };

            response.status(200).json(author);

        } catch (error) {
            response.status(500).json({
                message: "Author not found!",
                error
            });
        }
    }


    async update (request: Request, response: Response) {

        try {

            let { authorID } = request.params;
            let params: any = {};
            let invalidFields: Array<string> = [];

            Object.keys(request.body).map((el: string) => {
                if(el in UserSchema.schema.obj) params[el] = request.body[el];
                else invalidFields.push(el);
            });

            if (invalidFields.length) {
                response.status(500).json({
                    message: "[ERROR] Invalid fields!",
                    error: invalidFields
                });
            }

            let author = await UserSchema.findOneAndUpdate({_id: authorID}, params);

            response.status(200).json({
                message: "Author updated success!",
                author
            });
        } catch (error) {
            response.status(500).json({
                message: "[ERROR] Author update method!",
                error
            });
        }
    }


    async delete (request: Request, response: Response) {

        try {

            let { authorID } = request.params;

            let author = await UserSchema.deleteOne({ _id: authorID });

            response.status(200).json({
                message: "Author deleted success!",
                author
            });
        } catch (error) {
            response.status(500).json({
                message: "[ERROR] Author delete method!",
                error
            });
        }
    }

}

export default new UserController();