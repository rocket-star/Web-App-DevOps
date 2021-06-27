const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) =>{
  const prodId = req.params.productId //"productId" car doit etre le meme nom que dans le chemin route
  //console.log(prodId);
  Product.findById(prodId, product => {//le 2eme argument est une fonction de callback qui manipule le produit ayant pour id prodId
    res.render('shop/product-detail', {
      product: product, 
      pageTitle: product.title,
      path: '/products'
    });
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => { //action ci dessous ne peut etre executé que quand la fonction getCart à recuperer la Cart
    Product.fetchAll(products => {//action ci dessous ne peut etre executé que quand la fonction fetchAll à recuperer tous les produits
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id ===product.id);// renvoi le produit si il existe dans la Cart
        if(cartProductData){// si il existe alors
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;//"productId", car c'est le name utilisé dans product-detail.ejs 
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart'); 
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
