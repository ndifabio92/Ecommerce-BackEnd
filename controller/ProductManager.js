import * as fs from 'fs/promises';

class ProductManager {

  #nextId

  constructor() {
    this.#nextId = 1;
    this.path = './products.json';
  }

  async addProduct({ title, description, price, thumbnail, code, stock, category }) {
    try {
      if (!title || !description || !code || !price || !stock || !category) throw new Error('Todos los campos son obligatorios');

      const arrProducts = await this.getProducts();
      const isExist = await this.getProductExists('code', code);

      if (isExist) {
        this.#nextId = this.#nextId - 1;
        throw new Error(`El codigo: ${code} ingresado ya existe`);
      }

      arrProducts.push({
        id: this.#nextId++,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnail,
      });

      await fs.writeFile(this.path, JSON.stringify(arrProducts));

      return { message: `Producto creado con exito` };

    } catch (error) {
      throw { error: error.message };
    }
  }

  async getLastId() {
    try {
      let lastId = this.#nextId;
      const data = await this.getProducts();
      for (let i = 0; i < data.length; i++) {
        if (data[i].id > lastId) {
          lastId = data[i].id;
        }
      }

      return lastId + 1;

    } catch (error) {
      throw { error: error.message };
    }
  }

  async getProducts() {
    try {
      const data = await this.readFile();
      return JSON.parse(data);

    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {

      const data = await this.readFile();
      const product = JSON.parse(data).find(product => product.id === id);

      if (!product) throw new Error("El producto no existe");

      return product;

    } catch (error) {
      throw { error: error.message };
    }
  }

  async updateProductById(obj, id) {
    try {
      const isExist = await this.getProductExists('id', id);
      if (!isExist) throw new Error(`No se encontro el id ${id} para modificar.`);

      const data = await this.getProducts();

      const result = data.map(item => item.id === obj.id ? { ...item, ...obj } : item);
      await fs.writeFile(this.path, JSON.stringify(result));
      return { message: `Producto ID ${obj.id} actualizado con exito` };

    } catch (error) {
      throw { error: error.message };
    }

  }

  async deleteProductById(id) {
    try {
      const isExist = await this.getProductExists('id', id);
      if (!isExist) throw new Error(`No se encontro el id: ${id} para eliminar.`);

      const data = await this.getProducts();

      const result = data.filter(product => product.id !== id);
      await fs.writeFile(this.path, JSON.stringify(result));

      return { message: `Producto ID ${id} eliminado con exito` }

    } catch (error) {
      throw { error: error.message };
    }
  }

  async getProductExists(key, value) {
    try {
      const data = await this.getProducts();
      return data.find(product => product[key] === value);
    } catch (error) {
      throw error;
    }
  }

  async createFile() {
    try {
      await fs.readFile(this.path, { encoding: 'utf-8' });
      this.#nextId = await this.getLastId();
      return 'El archivo ya se encuentra creado';
    } catch (error) {
      await fs.writeFile(this.path, '[]',);
      return 'Archivo creado con exito';
    }
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.path, { encoding: 'utf-8' });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductManager;
