var express       = require('express'),
    router        = express.Router(),
    bodyParser    = require('body-parser'),
    jwt           = require('jsonwebtoken'),
    editJsonFile  = require('edit-json-file'),
    bcrypt   	  = require('bcryptjs');

var conf = editJsonFile(__root +"config.json");
var User = __db.User;

router.use(bodyParser.json());

//User register - POST 
router.post('/register',function (req, res) {  
	var request = req.body;
	request.password = bcrypt.hashSync(request.password, 8);
	request.user_status = true;
	User.create(request).then(function(user){
		res.status(200).send("User created successfully");
	},function(err){
		if(err && err.errors[0].message) { return res.status(500).send(err.errors[0].message)} //DUPLICATE ENTRY FOR UNIQUE FIELD
		res.status(500).send("User creation failed");
	})
})

// GET password reset link
router.get('/reset/:username',function (req, res) {  
  User.findOne({raw:true,where: {username: req.params.username,user_status:true}}).then(function(user){
    var password_reset_url = "http://localhost:8080/api/user/update/password/"+user.username
    res.status(200).send(password_reset_url);
  },function(err){
    if(err && err.errors[0].message) { return res.status(500).send(err.errors[0].message)} //DUPLICATE ENTRY FOR UNIQUE FIELD
    res.status(500).send("User creation failed");
  })
})

//User Login - POST 
router.post('/login', function(req, res) {
  var req_body=req.body
  User.findOne({raw:true,where: {username: req_body.username,user_status:true}}).then(function(user){
    if((user == 0) || (user == null) || (!user)){
      return res.status(404).send('No user found.');
    }else{
      // check if the password is valid
      var passwordIsValid = bcrypt.compareSync(req_body.password, user.password);

      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      //if user is found and password is valid
      // create a token
      var user_id=user.user_id
      var token = jwt.sign({ id: user_id,user_status: user.user_status }, conf.get('secret'), {
        expiresIn: conf.get('expires_time') // expires in 15 mins
      });
      //return the information including token as JSON
      var response_payload = { 
      	auth: true, 
      	token: token, 
      	userId:user_id, 
      	expireMin: conf.get('expires_time'), 
      	first_name:user.first_name, 
      	last_name:user.last_name
      }
      res.status(200).send(response_payload);
    }
  },function(err){
    return res.status(500).send('There was a problem in finding the user');
  });
});


//User deactivation - PUT 
router.put('/deactivate/:user_name',function (req, res) {  
	var user_name = req.params.user_name
	User.update({user_status: false},{where:{username:user_name}}).then(function (user_update) {
		if(user_update == 0) {res.status(500).send("User deactivation Failed")}
        if(user_update > 0) {res.status(200).send("The username: "+user_name+" is deactivated successfully")}
	},function(err){
	    return res.status(500).send("Deactivation Failed")
	});
})


//Password updation
router.put('/update/password/:username',function (req, res) {  
  var user_name = req.params.username;
  var hashed_password = bcrypt.hashSync(req.body.password, 8);
  User.update({password: hashed_password},{where:{username:user_name}}).then(function (user_update) {
    if(user_update == 0) {res.status(500).send("password updation deactivation Failed")}
        if(user_update > 0) {res.status(200).send("Password updated for the username: "+user_name)}
  },function(err){
      return res.status(500).send("password updation Failed")
  });
})
module.exports = router;