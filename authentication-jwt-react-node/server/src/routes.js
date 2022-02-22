import { Router } from "express";
import HelloController from "./controllers/HelloController";

const routes = new Router();

roputes.get('/hello', HelloController.index);