// import axios from 'axios';
import {app_id, key} from './config.js';
import Recipe from './recipe.js';

class Search{
	constructor(query){
		this.query = query;
	}

	async getResults(){

	  //   try{
			// const res = await axios(`https://api.edamam.com/search?q=${this.query}&app_id=${app_id}&app_key=${key}&to=30`);
			// console.log(res);
	  //   	this.result = res.data.hits;
	  //   	console.log(this.result);
	  //   }catch(error){
	  //       alert('Something wrong happened');
	  //   }
	 	   

	    try{
			const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&addRecipeInformation=true&apiKey=${key}&number=30`);
			this.result = res.data.results;
				console.log(res);

				console.log(this.result);
		    }catch(error){
	        alert('Something wrong happened');
	    }
	}
}
// Global state of the app
// - Search object
// - Current recipe object
// - SHopping list object
// - Likes object

const state = {};

// *********SEARCH CONTROLLER************

const controlSearch = async () =>{
	// 1 Get query from the UI
	const query = getInput();

	if(query){
		// 2 New Search object and add to state
		state.search = new Search(query);
	}
		// 3 Preparing UI for results
		clearInput();
		clearResults();
		renderLoader(elements.searchRes);
		try{
					// 4 Search for recipes
		await state.search.getResults();

		// 5 Render results to UI
		clearLoader();
		renderRecipes(state.search.result);
	}catch(err){
		alert('Please type in your meal');
		clearLoader();
	}

};




const elements = {
	searchForm: document.querySelector('.search'),
	searchInput: document.querySelector('.search__field'),
	searchResList: document.querySelector('.results_list'),
	searchRes: document.querySelector('.results'),
	searchResPages: document.querySelector('.results_pages')
};
const elementStrings = {
	loader: 'loader'
};

const renderLoader = parent =>{
	const loader = `
		<div class="${elementStrings.loader}"></div>
	`
parent.insertAdjacentHTML('afterbegin', loader)
};
const clearLoader = () =>{
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if(loader) loader.parentElement.removeChild(loader);
};


const getInput = () => elements.searchInput.value;

const clearInput = () =>{
	elements.searchInput.value = '';
};
const clearResults = () =>{
	elements.searchResList.innerHTML = '';
	elements.searchResPages.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 17) =>{
	const newTitle = [];
	if(title.length > limit){
		title.split(' ').reduce((acc, cur) =>{
			if(acc + cur.length <= limit){
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);
		// return the result		
		return `${newTitle.join(' ')}...`;
	}
	return title;
}

const renderRecipe = (recipe) =>{
	const markup = `
        <li>
          <a class="results__link" href="#${recipe.id}">
            <figure class="results__fig">
              <img src="${recipe.image}" alt="${recipe.title}" />
            </figure>
            <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.sourceName}</p>
              	<div class="results__data__secondary">
				  <p class="results__cookingTime"><i class="far fa-clock"></i> ${recipe.readyInMinutes} min</p>
				  <p class="results__cookingTime">Servings: ${recipe.servings}</p>
				</div>
            </div>
          </a>
        </li>		
	`
	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

     //    <li>
     //      <a class="results__link" href="${recipe.recipe.uri}">
     //        <figure class="results__fig">
     //          <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" />
     //        </figure>
     //        <div class="results__data">
     //          <h4 class="results__name">${limitRecipeTitle(recipe.recipe.label)}</h4>
     //          <p class="results__author">${recipe.recipe.source}</p>
			  // <p class="results__calories">Calories: ${Math.round(recipe.recipe.calories)}</p>
     //        </div>
     //      </a>
     //    </li>

            const createButton = (page, type) => {
              // 'type' will be either 'prev' or 'next'
              const goToPage = type === 'prev' ? page - 1 : page + 1;
              return `
                <button class="btn_inline results__btn--${type}" data-goto="${goToPage}">
                     ${type === 'prev' ? '<i class="fa fa-caret-left"></i>' : '<i class="fa fa-caret-right"></i>'}
                     <span>Page ${goToPage}</span>
                </button>
              `;
            };
    
        const renderButtons = (page, numResults, resPerPage) =>{
            const pages = Math.ceil(numResults / resPerPage);
            let button;
                if (page === 1 && pages > 1){
                    button = createButton(page, 'next');
                }else if (page < pages){
                    //both buttons
                    button = `
                        ${createButton(page, 'prev')}
                        ${createButton(page, 'next')}
                    `;
                }else if (page === pages && pages > 1){
                    button = createButton(page, 'prev');
                }
                else if (page === 1){
                    button = '';
                }
    
                document.querySelector(".results_pages").insertAdjacentHTML('afterbegin', button);
        };
    
    
    
        const renderRecipes = (recipes, page = 1, resPerPage = 5) =>{
                const start = (page - 1) * resPerPage;
                const end = page * resPerPage;
                recipes.slice(start, end).forEach(renderRecipe);
    
                //render pagination
                renderButtons (page, recipes.length, resPerPage);
        };
      



elements.searchForm.addEventListener('submit', e=>{
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn_inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        clearResults();
     	renderRecipes (state.search.result, goToPage);

    }
 });

// *********RECIPE CONTROLLER************

// const r = new Recipe(716429);
// r.getRecipe();
// console.log(r);

const controlRecipe = async () =>{
	const id = window.location.hash.replace('#', '');
	console.log(id);
	if(id) {
		// Prepare UI for changes

		// Create new recipe object
		state.recipe = new Recipe(id);
		//window.r = state.recipe;

		
		try{

		// Get recipe data and parse ingredients
		await state.recipe.getRecipe();
		state.recipe.parseIngredients();

		// Render recipe

		console.log(state.recipe);
		
		}catch(error){
			alert('Error processing recipe');
		}
	}
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
