import express, { Router } from 'express';
import cors from 'cors';


class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes() {
        const routes = new Router();

        routes.get('/hello', (req, res) => {
            res.json({ hello: 'world'});
        });
        this.server.use(routes);
    }
}

export default new App().server;