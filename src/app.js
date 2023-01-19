import ProductManager from "./ProductManager.js"
import express from "express"
import fs from "fs"

const port = 8080
const app = express()


const manager = new ProductManager()
/*
console.log(manager.addProducts("el extranjero","libro",30,"a","abc123",200))
console.log(manager.addProducts("el extranjero","libro",30,"a","abc124",200))
console.log(manager.addProducts("el extranjero","libro",30,"a","abc1235",200))
console.log(manager.addProducts("el extranjero","libro",30,"a","abc1236",200))
console.log(manager.addProducts("el extranjero","libro",30,"a","abc1237",200))
*/

app.get("/products", async (req, res) => {

    const data = await fs.promises.readFile("./productos.json", "utf-8")
    const products = JSON.parse(data)
    const { limit } = req.query

    if (req.query != null) {
        const newProductsArray = products.slice(0, limit)
        res.json(newProductsArray)
    } else {
        res.json(products)
    }
})

app.get("/products/:pid", async (req, res) => {

    const data = await fs.promises.readFile("./productos.json", "utf-8")
    const products = JSON.parse(data)
    const { pid } = req.params

    if (Number(pid) <= Object.keys(products).length) {
        const productId = products.filter(product => product.id === Number(pid))
        res.json(productId)
    } else {
        res.json({error: `El producto con el id : ${pid} no se encontro`})

    }

})


app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

