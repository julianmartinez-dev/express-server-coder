import express, { Response } from 'express';
import { Contenedor } from './Contenedor';

const app = express();
const contenedor = new Contenedor('fileWithData');

const PORT = 8080;

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`); 
})


app.get('/productos', (_req, res: Response) => {
    contenedor.getAll()
    .then(data => res.send(data))
})

app.get('/productoRandom', (_req, res :Response) => {
    contenedor.getRandomProduct()
    .then(data => res.send(data))
})
