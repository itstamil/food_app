var bcrypt    	= require('bcryptjs'),
	db_model 	= require(__dirname +'/db.js'),
	Food 		= db_model.Food,
	Ingredient 		= db_model.Ingredient;

const createEntries = () => {
	var food = [
		{
			"id": 1,
			"food_id": "9c2ae99c-6f7a-11eb-85c7-d43d7ecc27c9",
			"food_name": "Dosa",
			"production_cost": "20",
			"selling_cost": "30",
			"ingredient": "rice_floor"
		},
		{
			"id": 2,
			"food_id": "9c2aec76-6f7a-11eb-85c7-d43d7ecc27c9",
			"food_name": "Idly",
			"production_cost": "20",
			"selling_cost": "30",
			"ingredient": "rice_floor"
		},
		{
			"id": 3,
			"food_id": "9c2aed73-6f7a-11eb-85c7-d43d7ecc27c9",
			"food_name": "Biriyani",
			"production_cost": "290",
			"selling_cost": "120",
			"ingredient": "basmathi_rice"
		},
		{
			"id": 4,
			"food_id": "9c2aedd4-6f7a-11eb-85c7-d43d7ecc27c9",
			"food_name": "poori",
			"production_cost": "60",
			"selling_cost": "80",
			"ingredient": "wheet_flour"
		},
		{
			"id": 5,
			"food_id": "9c2aee2b-6f7a-11eb-85c7-d43d7ecc27c9",
			"food_name": "Salad",
			"production_cost": "190",
			"selling_cost": "150",
			"ingredient": "carrot"
		},
		{
			"id": 6,
			"food_id": "9c2aee80-6f7a-11eb-85c7-d43d7ecc27c9",
			"food_name": "dhal",
			"production_cost": "160",
			"selling_cost": "70",
			"ingredient": "dhal"
		}
    ]

    var ingredient = [
		{
			"id": 1,
			"ingredient_id": "9c2ae99c-6f7a-11eb-85c7-d43d7ecc27c9",
			"ingredient_name": "wheet_flour",
			"available_quantity": "20",
			"threshold_quantity": "20",
			"vendor":"naturls"
		},
		{
			"id": 2,
			"ingredient_id": "9c2aec76-6f7a-11eb-85c7-d43d7ecc27c9",
			"ingredient_name": "rice_floor",
			"available_quantity": "20",
			"threshold_quantity": "20",
			"vendor":"organic_former"
		},
		{
			"id": 3,
			"ingredient_id": "9c2aed73-6f7a-11eb-85c7-d43d7ecc27c9",
			"ingredient_name": "carrot",
			"available_quantity": "90",
			"threshold_quantity": "90",
			"vendor":"naturls"
		},
		{
			"id": 4,
			"ingredient_id": "9c2aedd4-6f7a-11eb-85c7-d43d7ecc27c9",
			"ingredient_name": "dhal",
			"available_quantity": "60",
			"threshold_quantity": "60",
			"vendor":"dhal_mart"
		},
		{
			"id": 6,
			"ingredient_id": "9c2aee80-6f7a-11eb-85c7-d43d7ecc27c9",
			"ingredient_name": "basmathi_rice",
			"available_quantity": "160",
			"threshold_quantity": "160",
			"vendor":"naturls"
		}
    ]

	Food.bulkCreate(food)
	Ingredient.bulkCreate(ingredient)
}

createEntries()