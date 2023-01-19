import fs from "fs";

export default class ProductManager {

    constructor(products = [], path = "./productos.json") {

        this.products = products
        this.id = 1
        this.path = path

    }

    addProducts(title, description, price, thumbnail, code, stock) {
        
        const product = {
            id: this.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        ////////////// Aca validamos que se ingresen todos los parametros lo cambie de la entrega anterior
        if (!title || !description || !price || !thumbnail || !code || !stock) {
                throw new Error('TODOS LOS PARAMETROS SON REQUERIDOS')
            }

        ////// Aca validamos que no pueden tener el mismo code
        const [producto] = this.products.filter(product => product.code === code)

        if (producto) {
           // throw new Error('el codigo debe ser unico')
           console.log("ERROR : el codigo debe ser unico ")
        }
        /////////// Aca corregi de la entrega anterior en vez de ir sumando this.id++ lo que hago es 
        //////////  buscar el id mas grande  del array de objetos y luego sumarle uno,

        if (this.products.length === 0) {
            product.id = 1
        } else {
            product.id = this.products[this.products.length - 1].id + 1
        }

        this.products.push(product)  // pusheo los productos en el array de productos

        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))  

        return `se agrego el producto con id: ${product.id}`

    }

    getProducts() {

        return this.products
    }

    getProductsById(idProduct) {

        const productById = this.products.find(product => product.id === idProduct)

        if (!productById) {
            return `Not Found`
        } else {
            return productById
        }
    }

//////// En este metodo, le pido el id del producto a actualizar, seleccionar el key del cual voy a cambiar su value,
/////// y el value que va a ser modificado

    updateProduct(id, campoActualizar, valueAcambiar) {



        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8")
            const users = JSON.parse(data)
            const campoCambiar = Object.keys(users[id - 1])


            for (let i = 0; i < campoCambiar.length; i++) {
                if (campoCambiar[i] === campoActualizar) {
                    users[id - 1][campoCambiar[i]] = valueAcambiar
                    fs.writeFileSync(this.path, JSON.stringify(users, null, "\t"))
                }
            }
        } else {
            console.log("el pronducto con el id no existe")
        }

        return `Producto con id: ${id} actualizado correctamente`;
    }

    deleteProducts(id) {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8")
            const users = JSON.parse(data)
            users.splice(id-1,1)   // Aca borro el elemento del numero id ubicado en el lugar id-1

            fs.writeFileSync(this.path, JSON.stringify(users, null, "\t"))

            return `Se borro el elemento de id : ${id}`
        }
    }
}






