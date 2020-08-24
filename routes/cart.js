
var express = require('express');
var router = express.Router();

var Product = require('../app/api/models/products');
var Cart = require('../models/cart');
var Order = require('../models/order');