import express from 'express';
import { Connection } from 'mongoose';
import routes from './infra/routes';
import cors from 'cors';

const setupApp = (connection: Connection) => {
    const app = express();
    
    app.use(cors());
    app.use(express.json());

    app.use(routes(connection));

    return app.listen(3003, () => console.log('Server running on port 3003'));
};

export default setupApp;
