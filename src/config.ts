export const appConfig = {

    PORT: process.env.PORT || 3000,

    db: {
        // url: "mongodb+srv://<username>:<password>@cluster0.nry4j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        url: "mongodb+srv://todos-app-admin:AuWrYoDTBIuf5RfR@cluster0.nry4j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    },

    appSessionSecret: "todos-app-secret-key"
}