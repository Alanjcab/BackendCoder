class ProductManager{
    constructor(){
        this.products= [];
    }
    addProduct(title,description,price,thumbnail,code,stock){
            if(!title || !description || !price || !thumbnail || !code || !stock){
                console.error("Todos los campos son obligatorios");
                return;
            }
            if(this.products.some(product => product.code===code)){
                console.error("El codigo ya existe");
                return;
            }

        const product = {
            id: this.#getMaxId()+1,
            title:title,
            description:description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock
        };
        this.products.push(product);
    }
    #getMaxId(){
        let maxId = 0;
        this.products.map((product)=>{
            if(product.id> maxId) maxId =product.id;
        })
        return maxId;
    }
    getProductByid(id){
        const product = this.products.find(product => product.id===id);
        if(!product){
            console.error("Not found");
        } return product;
       }
    getProducts(){
        return this.products;
    }
}

const productManager = new ProductManager();

productManager.addProduct("zapatillas", "adidas Galaxy", 50000, "zapatillas.jpg","galaxy123",30)
productManager.addProduct("zapatillas", "adidas forum", 100000, "zapatillas.jpg","galaxy124",30)
productManager.addProduct("zapatillas", "adidas Galaxy", 50000, "zapatillas.jpg","galaxy123",30)
productManager.addProduct("zapatillas", 30000, "zapatillas.jpg","galaxy125",30)
console.log(productManager.getProducts())