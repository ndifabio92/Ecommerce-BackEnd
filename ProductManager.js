const fs = require('fs').promises;

class ProductManager {

  #nextId
  #products

  constructor() {
    this.#nextId = 1;
    this.#products = [];
    this.path = './products.json'
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) throw new Error('Todos los campos son obligatorios');

      const isExist = this.getProductExists('code', code);
      if (isExist) throw new Error(`El codigo: ${code} ingresado ya existe`);

      this.#products.push({
        id: this.#nextId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      });

      await fs.writeFile(this.path, JSON.stringify(this.#products));

      return `Producto creado con exito`;

    } catch (error) {
      return error;
    }
  }

  async getLastId() {
    try {
      let lastId = this.#nextId;
      const data = await this.getProducts();
      for (let i = 0; i < data.length; i++) {
        if (data[i].id > lastId) {
          lastId = data[i].id
        }
      }
      return lastId + 1;

    } catch (error) {
      return error;
    }
  }

  async getProducts() {
    // return this.#products;
    try {
      const data = await fs.readFile(this.path, { encoding: 'utf-8' });
      return JSON.parse(data)

    } catch (error) {
      return error;
    }
  }

  getProductById(id) {
    try {
      const product = this.#products.find(product => product.id === id);

      if (!product) throw new Error("Not Found");

      return product;

    } catch (error) {
      return error;
    }
  }

  async updateProductById(obj) {
    try {
      this.#products = this.#products.map(item => item.id === obj.id ? { ...item, ...obj } : item)
      await fs.writeFile(this.path, JSON.stringify(this.#products));
      return `Producto ID: ${obj.id} actualizado con exito`;

    } catch (error) {
      return error;
    }

  }

  async deleteProductById(id) {
    try {
      const isExist = this.getProductExists('id', id);
      if (!isExist) throw new Error(`No se encontro el id: ${id} para eliminar.`);

      this.#products = this.#products.filter(product => product.id !== id);
      await fs.writeFile(this.path, JSON.stringify(this.#products));
      return `Producto ID: ${id} eliminado con exito`;

    } catch (error) {
      return error;
    }
  }

  getProductExists(key, value) {
    return this.#products.find(product => product[key] === value);
  }

  async createFile() {
    try {
      await fs.readFile(this.path, { encoding: 'utf-8' });
      await this.loadProducts();
      this.#nextId = await this.getLastId();
      return 'El archivo ya se encuentra creado';
    } catch (error) {
      await fs.writeFile(this.path, '[]',);
      return 'Archivo creado con exito';
    }
  }

  async loadProducts() {
    try {
      this.#products = await this.getProducts();
    } catch (error) {
      return error;
    }
  }
}

const item = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25
};

const item2 = {
  title: 'producto prueba2',
  description: 'Este es un producto prueba2',
  price: 150,
  thumbnail: 'Sin imagen',
  code: 'abc456',
  stock: 2
};

const item3 = {
  title: 'producto prueba3',
  description: 'Este es un producto prueba3',
  price: 100,
  thumbnail: 'Sin imagen',
  code: 'abc789',
  stock: 3
};

const updateItem = {
  id: 3,
  title: 'producto actualizado',
  description: 'Este es un producto actualizdo',
  price: 12093810391,
  thumbnail: 'Con Imagen',
  code: 'ccc195',
  stock: 25
};


const main = async () => {
  const product = new ProductManager();
  console.log(await product.createFile());
  await product.loadProducts();
  console.log(await product.addProduct(item));
  console.log(await product.addProduct(item2));
  console.log(await product.addProduct(item3));
  console.log(await product.addProduct(item));
  console.log(await product.deleteProductById(2));
  console.log(await product.updateProductById(updateItem))

}
main();
