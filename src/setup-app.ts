import express from 'express';
import { Connection } from 'mongoose';
import routes from './infra/routes';

const setupApp = (connection: Connection) => {
    const app = express();

    app.use(express.json());

    app.use(routes(connection));

    return app.listen(3003, () => console.log('Server running on port 3003'));
};

export default setupApp;
