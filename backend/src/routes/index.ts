import path from "path";
import { Application } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import { PORT, HOST } from "@root";

// import { router } from "@routes/example";
import { routerUser } from "@routes/user/userRouter";
import { userRouter} from "@routes/users/userRouter";
//import pool from "../Database/index";
import { routerPost } from "@routes/posts";
//import { delUsers } from "@controllers/index";

export default (app: Application) => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Start Node API",
                version: "1.0.0",
                description:
                    "This page is dedicated to the route list in the application",
            },
            servers: [
                {
                    url: `http://${HOST}:${PORT}/api/v1`,
                },
            ],
        },
        apis: [
            `${__dirname}/*/*${path.extname(path.basename(__filename))}`,
            `${__dirname}/*/*/*${path.extname(path.basename(__filename))}`,
        ],
    };

    const specs = swaggerJsDoc(options);

    app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));

    app.get("/", (_, res) => {
   res.json({ message: "API Running ! " });
    });



    app.use("/api/v1", [userRouter]);
    app.use("/", [routerUser]);

    // app.post("/user", async (req, res) => {
    //     try {
    //         const user = {
    //             id: 4,
    //             username: "testupperCase",
    //             email: "test4@gamil.com",
    //             password: "0000",
    //             userphone: 123,
    //             role: "satagiaire",
    //             status: null,
    //             isAdmin: false
    //         };
    //         console.log(req.body);
    //         const newUser = await pool.query(
    //             "INSERT INTO users (id, username, email ,password, userphone, role, status, isadmin ) VALUES ($1, $2, $3 , $4 , $5 , $6 , $7 , $8)",
    //             [
    //                 user.id,
    //                 user.username,
    //                 user.email,
    //                 user.password,
    //                 user.userphone,
    //                 user.role,
    //                 user.status,
    //                 user.isAdmin
    //             ]
    //         );

    //         res.json(newUser);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // });
    app.use("/api/v2", [routerPost]);
};
