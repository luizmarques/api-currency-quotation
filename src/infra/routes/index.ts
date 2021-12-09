import express from 'express';
import { Connection } from 'mongoose';
import userRoutes from './user-routes';
import currencyRoutes from './currency-routes';

const routes = (connection: Connection) => {
    const router = express.Router();

    userRoutes(router, connection);
    currencyRoutes(router);

    return router;
};

export default routes;