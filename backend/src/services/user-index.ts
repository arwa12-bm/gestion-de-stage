import pool from "../Database/index";

export const get_all_user = async () => {
    try {
        const result = await pool.query(
            "SELECT * FROM users",
            (error, response) => {
                console.log(
                    "error message into get all users: ",
                    error.message
                );
                return response;
            }
        );
        return result.rows;
    } catch (error) {
        console.error(error.message);
    }
};

export const get_user_by_id = async (id: number) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE id=${id}`,
            (error, response) => {
                console.log(
                    "error message into get user by id: ",
                    error.message
                );
                return response;
            }
        );
        return result;
    } catch (error) {
        console.error(error.message);
    }
};

export const get_satgiaire = async () => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE role='stagiaire'`
            //,
            // (error, response) => {
            //     console.log(
            //         "error message into get stagiaire: ",
            //         error.message
            //     );
            //     return response;
            // }
        );
        //console.log(result.rows);
        return result;
    } catch (error) {
        console.error(error.message);
    }
};

/**
 * error undefined & result undefined !!
 * @returns
 */
export const get_satgiaire_demande = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE role='stagiaire' AND status = 'Demande en cours';`; // Votre requête SQL ici

        pool.query(sql, (error: any, response: any) => {
            if (error) {
                console.log("Error executing query:", error);
                reject(error); // Rejette la promesse en cas d'erreur
            } else {
                console.log("Query result:", response.rows);
                resolve(response.rows); // Résout la promesse avec les résultats de la requête
            }
        });
    });
};

//  async () => {
//     //let data = [];
//     try {
//         const sql = `SELECT * FROM users WHERE role='stagiaire' AND status = 'Demande en cours';`;
//         const data = await pool.query(
//             sql
            //     , (err: any, res: any) => {
            //     if (err) {
            //         return err;
            //     }
            //     // console.log("resss", res);
            //     return res.rows;
            // }
//         );
//         console.log("sql: ", data);
//         return data;
//     } catch (error) {
//         console.log(
//             "error message catch into get stagaire demande: ",
//             error.message
//         );
//         console.error(error.message);
//     }
// };

export const get_satgiaire_active = async () => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE role='stagiaire' and status = 'en cours de stage';`,
            (error, response) => {
                console.log(
                    "error message get stagaire active: ",
                    error.message
                );
                return response;
            }
        );
        return result;
    } catch (error) {
        console.error(error.message);
    }
};

export const get_satgiaire_archive = async () => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE role='stagiaire' and status = 'archivé';`,
            (error, response) => {
                console.log(
                    "error message into get stagaire archive: ",
                    error.message
                );
                return response;
            }
        );
        return result;
    } catch (error) {
        console.error(error.message);
    }
};

export const get_satgiaire_refuse = async () => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE role='stagiaire'and status = 'refusé';`,
            (error, response) => {
                console.log(
                    "error message get stagaire refuse: ",
                    error.message
                );
                return response;
            }
        );
        return result;
    } catch (error) {
        console.error(error.message);
    }
};

export const get_satgiaire_accepte = async () => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE role='stagiaire'and status = 'accepté';`,
            (error, response) => {
                console.log(
                    "error message get stagaire accepte: ",
                    error.message
                );
                return response;
            }
        );
        return result;
    } catch (error) {
        console.error(error.message);
    }
};

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: number;
    role: "satagiaire" | "admin" | "encadreur";
    status: string | null;
    isAdmin: Boolean;
};

export const add_user = async (user: User) => {
    try {
        const sql = `INSERT INTO users(username, email, password, userphone, role, status, isadmin)
        VALUES ('${user.name}', '${user.email}' , '${user.password}' , ${user.phone} , '${user.role}' , '${user.status}' , false );`;

        const result = await pool.query(sql, (error, response) => {
            console.log("error message add user: ", error.message);
            return response;
        });
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const delete_user = async (id: number) => {
    try {
        const result = await pool.query(
            `DELETE FROM users WHERE id=${id}`,
            (error, response) => {
                console.log("error message delete user: ", error.message);
                return response;
            }
        );
        console.log(result.rows);

        return "success";
    } catch (error) {
        console.error(error.message);
    }
}; //

export const update_user = async (id: number, user: User) => {
    try {
        const result = await pool.query(
            //
            `UPDATE users SET username = '${user.name}' , email = '${user.email}',password = '${user.password}', userphone = ${user.phone},role = '${user.role}', status = '${user.status}', isadmin = ${user.isAdmin} WHERE id = ${id}`,
            (error, response) => {
                console.log("error message update user: ", error.message);
                return response;
            }
        );
        console.log(result.rows);

        return "success";
    } catch (error) {
        console.error(error.message);
    }
};

export const update_status_user = async (id: number, status: string) => {
    try {
        const result = await pool.query(
            //
            `UPDATE users SET status = '${status}' WHERE id = ${id}`,
            (error, response) => {
                console.log("error messageupdate user status: ", error.message);
                return response;
            }
        );
        console.log(result.rows);
        return "success";
    } catch (error) {
        console.error(error.message);
    }
};
