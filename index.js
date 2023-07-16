
class ProductManager{
    constructor(){
        this.id = 0;
      this.products = []
    }
    addProduct([title, description, price, thumbnail, code, stock]) {
    let cod = this.products.map(i => i.code)
    const productoNuevo = {
      id: ++this.id,
      title: (() => { if (!title) { throw "Error: El producto no tiene titulo"} return title})(),
      description: (() => { if (!description) { throw "Error: El producto no tiene descripcion"} return description})(),
      price: (() => { if (!price) { throw "Error: El procuto no tiene precio" } return price})(),
      thumbnail: (() => { if (!thumbnail ) { throw "Error: El procuto no tiene imagen" }return thumbnail })(),
      code: (() => { if (!code || cod.includes(code)){ throw "Error al agregar codigo al producto" } return code })(),
      stock: (() => { if (!stock || stock <= 0)  { throw "Error: Se debe agreegar el stock del procuto, el stock no puede ser menor que uno"}return stock})()
    }
    this.products.push(productoNuevo)
      }
     getProducts = () => this.products
      getProductById(id){
        let checkId = this.products.map(product => product.id)
        if(!checkId.includes(id)){
            throw new Error('Not found')
        }
        else{
            return this.products.find(product => product.id === id)
        }
      }
}

const invocacionDePM = new ProductManager;
let producto1 = invocacionDePM.addProduct(['Cuphead','Cuphead es un juego de acción clásico estilo "dispara y corre".Inspirado en los dibujos animados de los años 30.',1400,'[thumbnail]', 'iFgru67', 1])
 console.log(invocacionDePM.getProducts());
 console.log(invocacionDePM.getProductById(1));