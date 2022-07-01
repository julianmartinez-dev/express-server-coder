"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Contenedor_1 = require("./Contenedor");
const app = (0, express_1.default)();
const contenedor = new Contenedor_1.Contenedor('fileWithData');
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
app.get('/productos', (_req, res) => {
    contenedor.getAll()
        .then(data => res.send(data));
});
app.get('/productoRandom', (_req, res) => {
    contenedor.getRandomProduct()
        .then(data => res.send(data));
});
