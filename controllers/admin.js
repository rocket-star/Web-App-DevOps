const Product = require('../models/product');

const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/shop', {
    useNewUrlParser: true,
  },
);
mongoose.Promise = global.Promise;

const Item = require('../models/item');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //const product = new Product(null, title, imageUrl, description, price);// null pour l'id qui est généré automatiquement
  //product.save();
  var item = new Item({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  });
  item.save(function (err, save) {
    if (err) return console.error(err);
    res.redirect('/');
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //si dans l'url on a ?edit=true alors editMode vaut true
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Item.findById(prodId, function (err, product) {
    if(!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,// true or false
      product: product
    });
  });

  /*Product.findById(prodId, product => {
    if(!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,// true or false
      product: product
    });
  });*/
};

exports.postEditProduct = (req, res, next) => {// mis a jours des données et remplacement du produit dans la db (gérer par le "model/product" en fonction de l'existence de l'id )
  const id = req.body.productId //l'id nous est envoyer grace a un input hidden dans la vue edit-product/ qui elle a acces a l'id du produit modifier
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const UpdatedProduct = {
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  };
  
  //const UpdatedProduct = new Product(id, title, imageUrl, description, price);
  Item.findByIdAndUpdate({_id: id},UpdatedProduct, function(err, result){
    console.log("ok");
    res.redirect('/admin/products');
  });
};

exports.getProducts = (req, res, next) => {
  Item.find({}, function(err, items) {
    res.render('admin/products', {
      prods: items,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Item.findByIdAndDelete(prodId, async function () {
    res.redirect('/admin/products');
  });

}
