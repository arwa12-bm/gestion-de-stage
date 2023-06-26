import { Response, Request } from "express";
import {
    get_all_user,
    add_user,
    delete_user,
    update_status_user,
    get_user_by_id,
    get_satgiaire,
    get_satgiaire_demande,
    update_user,
    get_satgiaire_accepte,
    get_satgiaire_refuse,
    get_satgiaire_active,
    get_satgiaire_archive,
    get_encadrent,
} from "../services/user-index";
import pool from "../Database/index";
import jwt from "jsonwebtoken";

export async function addUser(request: Request, response: Response) {
    try {
        const data = request.body;
        await add_user(data);
        return response.status(200).json({ result: "SUCCESS" });
    } catch (error) {
        console.error("Failed to add user:", error);
        return response.status(500).json({ error: "Failed to add user" });
    }
}

export async function getAllUser(_: Request, response: Response) {
    try {
        const res = await get_all_user();
        return response.status(200).json({ result: res });
    } catch (error) {
        console.error("Failed to get all user:", error);
        return response.status(500).json({ error: "Failed to get all user" });
    }
}

export async function getStagiaire(_: Request, response: Response) {
    try {
        const res = await get_satgiaire();
        return response.status(200).json({ result: res.rows });
    } catch (error) {
        console.error("Failed to get stagiaire:", error.message);
        return response.status(500).json({ error: "Failed to get stagiaire" });
    }
}
export async function getEncadrent(_: Request, response: Response) {
    try {
        const res = await get_encadrent();
        return response.status(200).json({ result: res.rows });
    } catch (error) {
        console.error("Failed to get Encadrent:", error.message);
        return response.status(500).json({ error: "Failed to get Encadrent" });
    }
}

export async function getStagiaireDemandee(_: Request, response: Response) {
    try {
        const res = await get_satgiaire_demande();
        return response.status(200).json({ result: res.rows });
    } catch (error) {
        console.error("Failed to get stagiaire demandée:", error.message);
        return response
            .status(500)
            .json({ error: "Failed to get stagiaire demandée" });
    }
}

export async function getStagiaireAcceptee(_: Request, response: Response) {
    try {
        const res = await get_satgiaire_accepte();
        return response.status(200).json({ result: res.rows });
    } catch (error) {
        console.error("Failed to get stagiaire demandée:", error.message);
        return response
            .status(500)
            .json({ error: "Failed to get stagiaire demandée" });
    }
}

export async function getStagiaireRefusee(_: Request, response: Response) {
    try {
        const res = await get_satgiaire_refuse();
        return response.status(200).json({ result: res.rows });
    } catch (error) {
        console.error("Failed to get stagiaire demandée:", error.message);
        return response
            .status(500)
            .json({ error: "Failed to get stagiaire demandée" });
    }
}

export async function getStagiaireActivee(_: Request, response: Response) {
    try {
        const res = await get_satgiaire_active();
        return response.status(200).json({ result: res.rows });
    } catch (error) {
        console.error("Failed to get stagiaire demandée:", error.message);
        return response
            .status(500)
            .json({ error: "Failed to get stagiaire demandée" });
    }
}

export async function getStagiaireArchivee(_: Request, response: Response) {
    try {
        const res = await get_satgiaire_archive();
        return response.status(200).json({ result: res.rows });
    } catch (error) {
        console.error("Failed to get stagiaire demandée:", error.message);
        return response
            .status(500)
            .json({ error: "Failed to get stagiaire demandée" });
    }
}

export async function deleteUser(request: Request, response: Response) {
    try {
        const id = request.query.id;

        delete_user(Number(id));
        return response.status(200).json({ result: "DELETED" });
    } catch (error) {
        console.error("Failed to delete user:", error);
        return response.status(500).json({ error: "Failed to delete user" });
    }
}

export async function updateUserStatus(request: Request, response: Response) {
    try {
        const id = request.query.id;
        const status = request.query.status;

        update_status_user(Number(id), status as string);
        return response.status(200).json({ result: "UPDATED" });
    } catch (error) {
        console.error("Failed to update user status:", error);
        return response
            .status(500)
            .json({ error: "Failed to update user status" });
    }
}

export async function updateUser(request: Request, response: Response) {
    try {
        const id = request.query.id;
        const user = request.body;

        update_user(Number(id), user);
        return response.status(200).json({ result: "UPDATED" });
    } catch (error) {
        console.error("Failed to update user :", error);
        return response.status(500).json({ error: "Failed to update user " });
    }
}

export async function getUserById(request: Request, response: Response) {
    try {
        const res = await get_user_by_id(Number(request.params.id));
        return response.status(200).json({ result: res });
    } catch (error) {
        console.error("Failed to get user by id:", error);
        return response.status(500).json({ error: "Failed to get user by id" });
    }
}

export async function getUserByEmail(request: Request, response: Response) {
    try {
        const email = request.query.email;
        console.log(email);
        const result = await pool.query(`select * from users where email=$1`, [
            email,
        ]);
        console.log(result.rows);
        return response.status(200).json(result.rows);
    } catch (err) {
        console.log(err.message);
    }
}
export async function getUserToken(request: Request, response: Response) {
    try {
        const email = request.body.email;

        console.log(email);
        const result = await pool.query(`select * from users where email=$1`, [
            email,
        ]);
        const id_user = result.rows[0].id;
        const post = await pool.query(
            `select * from posts where id_user=${id_user}`
        );
        console.log(result);
        console.log(post.rows);
        if (
            result.rows[0].email &&
            result.rows[0].password === request.body.password
        ) {
            const token = jwt.sign(
                {
                    username: result.rows[0].username,
                    isAdmin: result.rows[0].isAdmin,
                    role: result.rows[0].role,
                    userphone: result.rows[0].userphone,
                    email: result.rows[0].email,
                    status: result.rows[0].status,
                    id: result.rows[0].id,
                    post: post.rows,
                },
                process.env.JWT_KEY
            );

            return response.status(200).json({ error: false, result: token });
        } else {
            return response
                .status(404)
                .json({ error: true, message: "user not found" });
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function updateUsers(request: Request, response: Response) {
    try {
        const { rows } = await pool.query(
            " UPDATE users SET email=$2,password=$3,username=$4,userphone=$5,role=$6,isadmin=$7,status=$8 where id=$1 ",
            [
                request.body.id,
                request.body.email,
                request.body.password,
                request.body.username,
                request.body.userphone,
                request.body.role,
                request.body.isadmin,
                request.body.status,
            ]
        );
        console.log(rows);
        return response.status(200).json({ error: false, message: "success" });
    } catch (err) {
        console.log(err.message);
    }
}
export async function updateUsersProfile(request: Request, response: Response) {
    try {
        const { rows } = await pool.query(
            " UPDATE users SET email=$2,username=$3,userphone=$4  where id=$1 ",
            [
                request.body.id,
                request.body.email,
                request.body.username,
                request.body.userphone,
            ]
        );
        console.log(rows);
        return response.status(200).json({ error: false, message: "success" });
    } catch (err) {
        console.log(err.message);
    }
}
