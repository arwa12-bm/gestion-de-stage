import express from "express";

import {
    addUser,
    deleteUser,
    getAllUser,
    getStagiaire,
    getStagiaireDemandee,
    getUserById,
    updateUserStatus,
    updateUser,
    getStagiaireAcceptee,
    getStagiaireRefusee,
    getStagiaireArchivee,
    getStagiaireActivee,
} from "@controllers/index";

export const routerUser = express.Router();

routerUser.route("/getAllUser").get(getAllUser);

routerUser.route("/stagiaires").get(getStagiaire);

routerUser.route("/stagiaires-demandees").get(getStagiaireDemandee);

routerUser.route("/stagiaires-acceptees").get(getStagiaireAcceptee);

routerUser.route("/stagiaires-refusees").get(getStagiaireRefusee);

routerUser.route("/stagiaires-activees").get(getStagiaireActivee);

routerUser.route("/stagiaires-archivees").get(getStagiaireArchivee);

routerUser.route("/getUser/:id").get(getUserById);

routerUser.route("/delete").delete(deleteUser);

routerUser.route("/update").put(updateUserStatus);

routerUser.route("/updateuser").put(updateUser);

routerUser.route("/stage-demandes").post(addUser);
