import pool from "../Database/index";

export const get_all_user = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM users",
            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (get_all_user):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result:", response);
                    resolve(response);
                }
            }
        );
    });
};

export const get_user_by_id = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE id=${id}`,

            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (get_user_by_id):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result:", response);
                    resolve(response);
                }
            }
        );
    });
};

export const get_satgiaire = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE role='stagiaire'`,

            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (get_satgiaire):",
                        error.message
                    );
                    reject(error);
                } else {
                    //console.log("Query result:", response);
                    console.log("Query result:", "SUCESS");
                    resolve(response);
                }
            }
        );
    });
};

export const get_satgiaire_demande = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE role='stagiaire' AND status = 'Demande en cours'`;

        pool.query(sql, (error: Error, response: Response) => {
            //console.log("sql:", sql);
            if (error) {
                // console.log("sql: ", sql);
                console.log(
                    "Error executing query (get_satgiaire_demande):",
                    error.message
                );
                reject(error);
            } else {
                //console.log("Query result:", response);
                resolve(response);
            }
        });
    });
};

export const get_satgiaire_active = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE role='stagiaire' and status = 'En cours de stage';`,
            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (get_satgiaire_active):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result:", response);
                    resolve(response);
                }
            }
        );
    });
};

export const get_satgiaire_archive = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE role='stagiaire' and status = 'Archivé';`,
            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (get_satgiaire_archive):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result:", response);
                    resolve(response);
                }
            }
        );
    });
};

export const get_satgiaire_refuse = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE role='stagiaire'and status = 'Refusé';`,
            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (get_satgiaire_refuse):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result:", response);
                    resolve(response);
                }
            }
        );
    });
};

export const get_satgiaire_accepte = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE role='stagiaire'and status = 'Accepté';`,
            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (get_satgiaire_accepte):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result:", response);
                    resolve(response);
                }
            }
        );
    });
};

export const get_encadrent = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE role='encadreur'`,

            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (get_encadrent):",
                        error.message
                    );
                    reject(error);
                } else {
                    //console.log("Query result:", response);
                    console.log("Query result:", "SUCESS");
                    resolve(response);
                }
            }
        );
    });
};

interface UserInfo {
    formations: {
        niveau: string;
        diplome: string;
        specialite: string;
        faculte: string;
        date_debut: string;
        date_fin: string;
    }[];
    experiences: {
        societe: string;
        type: string;
        date_debut: string;
        date_fin: string;
    }[];
    projets: {
        title: string;
        language: string;
        type: string;
        description: string;
    }[];
    skills: string;
    files: string[];
}

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: number;
    role: "satagiaire" | "admin" | "encadreur";
    status: string | null;
    isAdmin: Boolean;
    infor: UserInfo;
};

export const add_user = async (user: User): Promise<any> => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users(username, email, password, userphone, role, status, isadmin, infor)
        VALUES ('${user.name}', '${user.email}' , '${user.password}' , ${
            user.phone
        } , '${user.role}' , '${user.status}' , ${
            user.isAdmin
        }, '${JSON.stringify(user.infor)}'::jsonb );`;
        console.log("sql: ", sql);
        console.log("user ", user);
        pool.query(sql, (error: Error, response: Response) => {
            if (error) {
                console.log("Error executing query (add_user):", error.message);
                reject(error);
            } else {
                console.log("Query result:", "SUCCESS");
                resolve(response);
            }
        });
    });
};

export const delete_user = async (id: number): Promise<Response> => {
    return new Promise((resolve, reject) => {
        pool.query(
            `DELETE FROM users WHERE id=${id}`,
            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (delete_user):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result:", response);
                    resolve(response);
                }
            }
        );
    });
};

export const update_user = async (id: number, user: User): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            //
            `UPDATE users SET username = '${user.name}' , email = '${
                user.email
            }',password = '${user.password}', userphone = ${
                user.phone
            },role = '${user.role}', status = '${user.status}', isadmin = ${
                user.isAdmin
            }, infor = '${JSON.stringify(user.infor)}'::jsonb WHERE id = ${id}`,
            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (update_user):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result: SUCESS");
                    resolve(response);
                }
            }
        );
    });
};

export const update_status_user = async (
    id: number,
    status: string
): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            //
            `UPDATE users SET status = '${status}' WHERE id = ${id}`,
            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (update_status_user):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result: SUCESS");
                    resolve(response);
                }
            }
        );
    });
};

export const verifier_data_user_login = async (
    email: string,
    password: string
): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT id, role, isadmin FROM users WHERE email='${email}' AND password='${password}';`,
            (error: Error, response: Response) => {
                if (error) {
                    console.log(
                        "Error executing query (update_status_user):",
                        error.message
                    );
                    reject(error);
                } else {
                    console.log("Query result: SUCESS");
                    //console.log("RESPONSE: ", response);
                    resolve(response);
                }
            }
        );
    });
};
