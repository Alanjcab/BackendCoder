const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      console.error(error);
    }
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }
    try {
      let products = await this.getProducts();
      if (products.some((product) => product.code === code)) {
        console.error("El código ya existe");
        return;
      }
      const product = {
        id: this.#getMaxId(products) + 1,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log("Producto agregado");
    } catch (error) {
      console.error("Error al agregar el producto", error);
    }
  }

  async updateProduct(id, fieldToUpdate, updatedValue) {
    try {
      let products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        console.error("Producto no encontrado");
        return;
      }
      products[index][fieldToUpdate] = updatedValue;
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log("Producto actualizado");
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        console.error("Producto no encontrado");
        return;
      }
      products.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log("Producto eliminado");
    } catch (error) {
      console.error("Error al eliminar el producto ", error);
    }
  }

  #getMaxId(products) {
    let maxId = 0;
    products.forEach((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === id);
      if (!product) {
        console.error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      console.error("Error al obtener el producto", error);
    }
  }
}

const productManager = new ProductManager("./data.json");

productManager.addProduct(
  "zapatillas",
  "adidas Galaxy",
  50000,
  "zapatillas.jpg",
  "galaxy123",
  30
);
productManager.addProduct(
  "zapatillas",
  "adidas forum",
  100000,
  "zapatillas.jpg",
  "galaxy126",
  30
);
productManager.addProduct(
  "zapatillas",
  "adidas Galaxy",
  50000,
  "zapatillas.jpg",
  "galaxy123",
  30
);
productManager.addProduct(
  "zapatillas",
  30000,
  "zapatillas.jpg",
  "galaxy125",
  30
);
const eliminarProducto = 2;

productManager.deleteProduct(eliminarProducto)

const test = async()=>{
  try {
    const products = await productManager.getProducts();
    console.log(products);
  } catch (error) {
    console.error("Error al obtener los productos", error);
  }
}

test()

