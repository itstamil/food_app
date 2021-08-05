var express       = require('express'),
    router        = express.Router(),
    bodyParser    = require('body-parser'),
    jwt           = require('jsonwebtoken'),
    editJsonFile  = require('edit-json-file'),
    bcrypt   	  = require('bcryptjs');

var conf = editJsonFile(__root +"config.json");
var User = __db.User;
var Order = __db.Order;
var Food = __db.Food;
var Ingredient = __db.Ingredient;

router.use(bodyParser.json());

router.get('/order/:username',function(req,res){
  Order.findAll({raw:true,attributes: ['food_name', 'food_quantity', 'cost'],where: {customer_name: req.params.username}}).then(function(order_info){
    return res.status(200).send("All orders placed by user :"+req.params.username+"\r\n"+ JSON.stringify(order_info));
  },function(err){
    return res.status(500).send("Problem in finding order information");
  })
});

router.get('/cost_diff',function(req,res) {
  Food.findAll({raw:true, where: { production_cost: {[Op.gt]: Sequelize.col('selling_cost')}}}).then(function(cost_diff){
    return res.status(200).send("Food's which selling cost is more than production_cost:"+JSON.stringify(cost_diff));
  },function(err){
    return res.status(500).send("Problem in finding cost information");
  })
})

router.post('/order', function(req, res) {
  var req_body=req.body
  User.findOne({raw:true,where: {username: req_body.username,user_status:true}}).then(function(user){
    if((user == 0) || (user == null) || (!user)){
      return res.status(404).send('User is not active/ No User found.');
    }else{
      Food.findOne({raw:true,where: {food_name: req_body.food_name}}).then(function(food_info){
        if((food_info == 0) || (food_info == null) || (!food_info)){
          return res.status(404).send('Specified Food is not available');
        }else{
          var amount = req_body.food_quantity * food_info.selling_cost
          req_body.customer_name = req_body.username;
          req_body.cost = amount;
          req_body.order_status = "Recived";
          Order.create(req_body).then(function(order){
            Ingredient.findOne({raw:true,where: {ingredient_name: food_info.ingredient}}).then(function(ingredient){
              if(ingredient.available_quantity){
                var quantity = ingredient.available_quantity - req_body.food_quantity  
                Ingredient.update({available_quantity: quantity},{where:{ingredient_name: food_info.ingredient}}).then(function (ingredient_update) {
                  if(ingredient_update == 0) {res.status(500).send("Ingredient Updation Failed")}
                      if(ingredient_update > 0) {res.status(200).send("Order created successfully. Total payable amount is "+amount);}
                },function(err){
                    return res.status(500).send("Ingredient information update Failed")
                });
              }else{
                return res.status(500).send("Current food item is not available")
              }
            },function(err){
                return res.status(500).send("Problem in finding ingredient information")
            })
          },function(err){
            if(err && err.errors[0].message) { return res.status(500).send(err.errors[0].message)} //DUPLICATE ENTRY FOR UNIQUE FIELD
            res.status(500).send("Order creation failed");
          })
        }
      },function(err){
        res.status(500).send("Food information retrival failed");
      })
    }
  },function(err){
    return res.status(500).send('There was a problem in finding the user');
  });
});

module.exports = router;