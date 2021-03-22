import {Request, Response} from "express";
import {check, validationResult} from "express-validator";
import bcrypt from "bcrypt";


import UserController from "./UserController";
import UserSchema from "./UserSchema";
import {UserInterface} from "./UserInterface";


interface UserAuthControllerInterface {
    registration    (request: Request, response: Response): void,
    login           (request: Request, response: Response): void
}

declare module 'express-session' {
    interface SessionData {
        uid: string;
    }
}

class UserAuthController implements UserAuthControllerInterface {

    loginValidator: Array<any>
    registrationValidator: Array<any>

    constructor() {

        this.loginValidator = [
            check('email', '[email] field is empty!').notEmpty(),
            check('password', '[password] field is empty!').notEmpty(),
            check('password', '[password] field length is incorrect! Min 6 and max 12 charsets.').isLength({min: 6, max: 12})
        ];

        this.registrationValidator = [
            check('email', '[email] field is empty!').notEmpty(),
            check('password', '[password] field is empty!').notEmpty(),
            check('password', '[password] field length is incorrect! Min 6 and max 12 charsets.').isLength({min: 6, max: 12})
        ];

    }

    async registration (request: Request, response: Response) {

        try {

            const errors = validationResult(request);

            if (!errors.isEmpty()) throw { message: "Registration error!", ...errors };

            let user = await UserController.create(request, response);

            console.log(user);

            response.status(200).json("registration method!");

        } catch (error) {

            console.log("registration catch");

            response.status(400).json(error);

        }

    }


    async login (request: Request, response: Response) {

        try {

            const errors = validationResult(request);

            if (!errors.isEmpty()) throw { message: "Registration error!", ...errors };

            const { email, password } = request.body;

            let user = await UserSchema.findOne({ email: email });

            if (!user) throw "User with this email not found!";

            console.log(email, password, user);

            // @ts-ignore
            const isPassportValid = bcrypt.compareSync(password, user.password);

            if (!isPassportValid) throw "Password is wrong!";

            request.session.uid = user._id;

            response.status(200).json(user);

        } catch (error) {

            response.status(400).json({
                message: error
            });

        }

    }


    async logout (request: Request, response: Response) {

        try {

            await request.session.regenerate(() => {
                console.log("User logout");

                response.status(200).json("Logout success!");
            });

        } catch (error) {
            response.status(403).json("Logout error");
        }

    }

}


export default new UserAuthController();