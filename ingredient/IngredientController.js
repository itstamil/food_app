var express       = require('express'),
    router        = express.Router(),
    bodyParser    = require('body-parser'),
    jwt           = require('jsonwebtoken'),
    editJsonFile  = require('edit-json-file'),
    bcrypt   	  = require('bcryptjs');

var conf = editJsonFile(__root +"config.json");
var Ingredient = __db.Ingredient;

router.use(bodyParser.json());

// Ingredient sold by an same vendor
router.get('/:vendor',function(req,res){
  Ingredient.findAll({raw:true,attributes: ['ingredient_name', 'available_quantity', 'threshold_quantity'],where: {vendor: req.params.vendor}}).then(function(vendor_info){
    return res.status(200).send("All Ingredient sold by :"+req.params.vendor+"\r\n"+ JSON.stringify(vendor_info));
  },function(err){
    return res.status(500).send("Problem in finding order information");
  })
});


router.get('/available/quantity',function(req,res) {
  Ingredient.findAll({raw:true,attributes: ['ingredient_name'], where: { available_quantity: {[Op.lt]: Sequelize.col('threshold_quantity')}}}).then(function(stock_diff){
    console.log(stock_diff)
    return res.status(200).send("Items which are less in quantity "+JSON.stringify(stock_diff));
  },function(err){
    return res.status(500).send("Problem in finding cost information");
  })
})

module.exports = router;