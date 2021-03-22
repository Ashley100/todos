import {Request, Response, NextFunction} from "express";
import UserSchema from "../UserSchema";

export default function UserRoleMiddleware (roles: Array<string>) {

    return async function (request:Request, response:Response, next: NextFunction) {

        if (request.method === "OPTION") next();

        console.log(request.session);

        try {

            if (!request.session.uid) throw new Error("UID is not found!");

            let user = await UserSchema.findOne({ _id: "605612b1595c532f2cb8ecf5" });

            console.log("user", user);

            next();


        } catch (error) {
            response.status(403).json({
                message: "Your account have not access to this page!",
                error: error
            })
        }

    }
}