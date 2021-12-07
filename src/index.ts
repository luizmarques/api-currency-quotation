import express, { Router, Request, Response } from 'express';

const app = express();

const router = Router();

app.use(express.json());

router.get('/', (request: Request, response: Response) => {
    response.json({ message: 'Hello World: from Express + TypeScript + Docker' });
});

app.use(router);

app.listen(3003, () => console.log('Server running on port 3003'));
