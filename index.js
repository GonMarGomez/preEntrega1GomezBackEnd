const { log } = require("console");
const fs = require("fs");
class ProductManager {
  constructor(path) {
    this.path = path
    this.id = 0;
    this.products = []
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    let cod = this.products.map(i => i.code)
    const productoNuevo = {
      id: ++this.id,
      title: (() => { if (!title) { throw "Error: El producto no tiene titulo" } return title })(),
      description: (() => { if (!description) { throw "Error: El producto no tiene descripcion" } return description })(),
      price: (() => { if (!price) { throw "Error: El procuto no tiene precio" } return price })(),
      thumbnail: (() => { if (!thumbnail) { throw "Error: El procuto no tiene imagen" } return thumbnail })(),
      code: (() => { if (!code || cod.includes(code)) { throw "Error al agregar codigo al producto" } return code })(),
      stock: (() => { if (!stock || stock <= 0) { throw "Error: Se debe agreegar el stock del procuto, el stock no puede ser menor que uno" } return stock })()

    }
    this.products.push(productoNuevo)
    fs.writeFileSync(this.path, JSON.stringify(this.products, null,), error => {
      console.log(error);
    })
  }
  getProducts() {
    return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
  }
  getProductById(id) {
    let archivoDeProductos = this.getProducts()
    let checkId = archivoDeProductos.map(product => product.id)
    if (!checkId.includes(id)) {
      throw new Error('Not found')
    }
    else {
      return archivoDeProductos.find(product => product.id === id)
    }
  }
  updateProduct(id, actualizacion, valor) {
      const data = fs.readFileSync(this.path, 'utf8');
      const products = JSON.parse(data);
      const productToUpdate = products.find((product) => product.id === id);
      if (productToUpdate) {
        productToUpdate[actualizacion] = valor;
       fs.writeFileSync(this.path, JSON.stringify(products));
        console.log('Producto actualizado');
      } else {
        console.error('Producto no encontrado');
      }

  }
  deleteProduct(id) {
    const data = fs.readFileSync(this.path, 'utf8');
    const products = JSON.parse(data);
    if (this.getProductById(id)) {
      let newProducts = products.filter((products) => products.id !== id);
      fs.writeFileSync(this.path, JSON.stringify(newProducts));
      return newProducts
    } else {
      console.error('Producto no encontrado');
    }
  }
}
const invocacionDePM = new ProductManager('./Products.json');
let producto1 = invocacionDePM.addProduct('Cuphead', 'Cuphead es un juego de acción clásico estilo "dispara y corre".Inspirado en los dibujos animados de los años 30.', 1400, '[thumbnail]', 'iFgru67', 1)
let producto2 = invocacionDePM.addProduct('Call of Duty: Black Ops III', 'Call of Duty es un juego de disparos en primera persona', 3400, '[thumbnail]', 'iJhnru81', 1)
console.log(invocacionDePM.updateProduct(1, 'price', 2200))
console.log(invocacionDePM.getProductById(1));
console.log(invocacionDePM.deleteProduct(2));
console.log(invocacionDePM.getProducts());



