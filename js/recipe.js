import {app_id, key} from './config.js';


export default class Recipe{
	constructor(id){
		this.id = id;
	}
		async getRecipe(){
		// try{
		// 	const res = await axios(`https://api.edamam.com/search?r=${this.id}&app_id=${app_id}&app_key=${key}`);
		// 	this.label = res.data.label;
		// 	this.author = res.data.source;
		// 	this.img = res.data.image;
		// 	this.url = res.data.url;
		// 	this.ingredients = res.data.ingredients;

		// 	console.log(this.label);
		// }catch(error){
		// 	console.log(error);
		// }
			try{
				const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${key}`);
				console.log(res);
					this.title = res.data.title;
					this.author = res.data.sourceName;
					this.img = res.data.image;
					this.url = res.data.sourceUrl;
					this.ingredients = res.data.extendedIngredients;
					this.summary = res.data.summary;
					this.time = res.data.readyInMinutes;
					this.servings = res.data.servings;
			    }catch(error){
	        		alert('Something wrong happened');
	    		}
	}

	// getIngredients(){

	// 	let newArr = [];
	// 	let newIngs = this.ingredients.forEach(ing =>{
	// 		if(ing.original) {
	// 			 newArr.push(ing.original);
	// 			}
	// 	});
	// 	this.ingredients = newArr;
	// }

	parseIngredients(){
		let newArr = [];
		let newIngs = this.ingredients.forEach(ing =>{
			if(ing.original) {
				 newArr.push(ing.original);
				}
		});
		this.ingredients = newArr;
		
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
		const unitsShort = ['tbsp', 'tbsp','oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];


		const newIngredients = this.ingredients.map(el =>{
			// 1 Uniform units
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, i) =>{
				ingredient = ingredient.replace(unit, unitsShort[i]);
			});

			// 2 Remove parenthesis
			ingredient = ingredient.replace(/ *\([^)]*\) */g, '');
			// 3 Parse ingredients into count, unit and ingredient
			const arrIng = ingredient.split(' ');
			const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

			let objIng;
			if(unitIndex > -1){
				//there is a unit
				//Ex. 4 1/2 cups, arrCount is [4, 1/2]
				const arrCount = arrIng.slice(0, unitIndex);

				let count;
				if (arrCount.length === 1){
					count = eval(arrIng[0].replace('-', '+'));
				}else{
					count = eval(arrIng.slice(0, unitIndex).join('+'));
				}

				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex+1).join(' ')
				}

			}else if(parseInt(arrIng[0], 10)){
				//there is NO unit, but 1st element is number
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				}

			}else if(unitIndex === -1){
				//there is no unit and no number in 1st position
				objIng = {
					count: 1,
					unit: '',
					ingredient
				}
			}

			return objIng;
		});
		this.ingredients = newIngredients;
	}
}

