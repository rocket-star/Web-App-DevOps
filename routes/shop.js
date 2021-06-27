/*****ATTENTION: dans ce fichier l'ordre à une importance (lecture ce fait du haut vers le bas)*/
const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct); //route dynamique en fonction de l'id

router.get('/cart', shopController.getCart);

router.post('/cart-delete-item', shopController.postCartDelete);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
