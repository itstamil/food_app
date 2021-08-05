global.Sequelize = require('sequelize');
var db_name = "food_db"
global.Op = Sequelize.Op;

    //Connnecting to database
const sequelize = new Sequelize({
        host: 'localhost',
        dialect: 'sqlite',
        storage: db_name,
        logging: false
    })
    //DB connectivity check
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// User module schema

var User = sequelize.define('users', {
    user_id         : { type : Sequelize.UUID, defaultValue : Sequelize.UUIDV1, primaryKey : true},
    first_name      : { type : Sequelize.STRING },
    last_name       : { type : Sequelize.STRING },
    password        : { type : Sequelize.STRING },
    username        : { type : Sequelize.STRING, unique : true },
    phone_number    : { type : Sequelize.STRING },
    user_status     : { type : Sequelize.BOOLEAN },
    email           : { type : Sequelize.STRING }
});

var Food = sequelize.define('foods', {
    food_id         : { type : Sequelize.STRING, primaryKey : true},
    food_name       : { type : Sequelize.STRING },
    production_cost : { type : Sequelize.INTEGER },
    selling_cost    : { type : Sequelize.INTEGER },
    ingredient      : { type : Sequelize.STRING }
});

var Ingredient = sequelize.define('ingredients', {
    ingredient_id         : { type : Sequelize.STRING, primaryKey : true},
    ingredient_name       : { type : Sequelize.STRING },
    available_quantity    : { type : Sequelize.INTEGER },
    threshold_quantity    : { type : Sequelize.INTEGER },
    vendor                : { type : Sequelize.STRING }
});

var Order = sequelize.define('orders', {
    order_id         : { type : Sequelize.UUID, defaultValue : Sequelize.UUIDV1, primaryKey : true},
    food_name        : { type : Sequelize.STRING },
    food_quantity    : { type : Sequelize.INTEGER },
    cost             : { type : Sequelize.INTEGER },
    customer_name    : { type : Sequelize.STRING },
    order_status     : { type : Sequelize.STRING }
});

sequelize.sync();

//Export initialised models
module.exports = {
    User: User,
    Food: Food,
    Ingredient: Ingredient,
    Order: Order
};
