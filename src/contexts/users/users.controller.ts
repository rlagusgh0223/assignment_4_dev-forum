import { Router } from "express";
import usersService from "./users.service";

const usersController = Router();

usersController.get("/", usersService.getUsers);
usersController.post("/signUp", usersService.signUp);
usersController.get("/:userEmail/:pw", usersService.logIn);

export default usersController;
