import express from "express";
import ProductManager from "./app.js/productsManager.js";

const productManager = new ProductManager('./products.json');

const app = express();

app.use(express.json());

app.get('/products', async (req, res)=>{
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

app.post('/products', async (req, res)=>{
    try {
       const product = await productManager.addProduct(req.body)
       res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

app.get('/products/:id', async (req, res)=>{
    try {
        const {id}= req.params;
        const product = await productManager.getProductById(id);
        if(!product) res.status(404).json({msg: 'producto no encontrado'});
        else res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

app.put('/products/:id', async (req, res)=>{
    try {
        const {id}= req.params;
        const productUpd = await productManager.updateProduct(req.body, id);
        if (!productUpd) res.status(404).json({ msg: "Error al actualizar el producto" });
    res.status(200).json(productUpd);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})


app.delete('/products/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const delProduct = await productManager.deleteProduct(id);
        if(!delProduct) res.status(404).json({ msg: `Producto con id: ${id} eliminado correctamente`});
        res.status(200).json({msg:"Producto eliminado"})
        } catch (error) {
        res.status(500).json({msg: error.message})
    }
})



const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on porto ${PORT}`));
