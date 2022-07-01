const fs = require('fs');

interface IContenedor {
  fileName: string;
  save(producto: IProducto): Promise<number>;
  getById(id: number): Promise<IProducto | null>;
  getAll(): Promise<IProducto[]>;
  deleteById(id: number): Promise<void>;
  deleteAll(): Promise<void>;
  getRandomProduct(): Promise<IProducto>
}

export interface IProducto {
  title: string;
  price: number;
  thumbnail: string;
  id?: number;
}

export class Contenedor implements IContenedor {
  constructor(public fileName: string) {
    this.fileName = fileName + '.txt';
    if (!fs.existsSync(this.fileName)) {
      fs.promises.writeFile(this.fileName, JSON.stringify([]));
    } else {
      console.log('Ya existe');
    }
  }

  async save(producto: IProducto): Promise<number> {
    try {
      const document = await fs.promises.readFile(this.fileName, 'utf-8');
      const listadoProductos: IProducto[] = await JSON.parse(document);

      listadoProductos.length
        ? (producto.id = listadoProductos[listadoProductos.length - 1].id! + 1)
        : (producto.id = 1);

      listadoProductos.push(producto);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(listadoProductos, null, 2)
      );
      return producto.id;
    } catch (error) {
      throw new Error('Error guardando archivo');
    }
  }

  async getById(id: number): Promise<IProducto | null> {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8');
      const productos = await JSON.parse(data);
      return (
        productos.find((producto: IProducto) => producto.id === id) || null
      );
    } catch (error) {
      throw new Error(`Error en la consulta`);
    }
  }
  async getAll(): Promise<IProducto[]> {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8');
      const productos = await JSON.parse(data);
      return productos;
    } catch (error) {
      throw new Error('Error obteniendo registros');
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8');
      const productos = await JSON.parse(data);
      const productosFiltrados = productos.filter(
        (producto: IProducto) => producto.id !== id
      );
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(productosFiltrados, null, 2)
      );
      console.log(`Registro con id ${id} eliminado`);
    } catch (error) {
      throw new Error('Error eliminando registro');
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
      console.log('Todos los registros fueron eliminados');
    } catch (error) {
      throw new Error('Error eliminando registros');
    }
  }

 async getRandomProduct(): Promise<IProducto> {
    const productos = await this.getAll();
    const index = Math.floor(Math.random() * productos.length);
    return productos[index];
 }
}
