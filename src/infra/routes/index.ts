import express from 'express';
import { Connection } from 'mongoose';
import userRoutes from './user-routes';

const routes = (connection: Connection) => {
    const router = express.Router();

    userRoutes(router, connection);

    return router;
};

export default routes;