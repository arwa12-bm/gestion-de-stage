import express from "express";

import {
    addUser,
    deleteUser,
    getAllUser,
    getStagiaire,
    getStagiaireDemandee,
    getUserById,
    updateUserStatus,
} from "@controllers/index";

export const routerUser = express.Router();

routerUser.route("/getAllUser").get(getAllUser);

routerUser.route("/stagiaires").get(getStagiaire);

routerUser.route("/stagiaires-demandees").get(getStagiaireDemandee);

routerUser.route("/getUser/:id").get(getUserById);

routerUser.route("/delete").delete(deleteUser);

routerUser.route("/update").put(updateUserStatus);

routerUser.route("/stage-demandes").post(addUser);
