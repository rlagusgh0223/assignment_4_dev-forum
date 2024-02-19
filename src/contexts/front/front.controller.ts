import { Router } from "express";
import postService from "../post/post.service";
import frontService from "./front.service";

const frontController = Router();

frontController.post("/", postService.createPost);
frontController.get("/", frontService.getPost);
frontController.put("/:tableId", postService.updatePost);
frontController.delete("/:tableId", postService.deletePost);

export default frontController;
