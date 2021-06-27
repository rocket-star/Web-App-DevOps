const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err){
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex (prod => prod.id == id);  
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){// si le produit qu'on veux ajouter a la carte existe deja on incrémente sa quantité
                updatedProduct = { ...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct; 
            } else {
                updatedProduct = {id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct]; //on ajoute le contenue actuel + le nouveau produit
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err); 
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return //si il y a une erreur sa signifie qu'il n'y a rien a supprimer !!
            }

            const updatedCart = {...JSON.parse(fileContent)}; //on recupère le contenu de la Cart avant la suppression
            const product = updatedCart.products.find(prod => prod.id == id);
            if(!product){//si le produit n'éxiste pas dans la cart on execute pas le reste
                return;
            }
            const productQty = product.qty; //on recupère la quantité du produit (soit le nombre de foix qu'on la ajouté dans la cart)
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err); 
            });
        });
    }

    static getCart(cb) { //cb fct de callback appeler une fois qu'on a les produits
        fs.readFile(p, (err, fileContent) =>{
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }
        });
    }
};