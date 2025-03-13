import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { startSplitting } from './service';

const app = express();
const PORT = 3001;

app.use(cors()); // Allow requests from frontend

app.get('/run/:type', async (req, res) => {
    const type = req.params.type === 'worker' ? 'worker' : null;
    const processTime = await startSplitting(type);
    const response = 'The process took ' + processTime + ' milliseconds for ' +  (type ? 'worker' : 'synchronous') + ' approach';
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
