const appId = '6278635f';
const appKey = '597689c2e213105580104f83cb048a6d';

async function searchRecipes() {
  // Get the user input from the search box
  const searchInput = document.getElementById('search').value;

  // Make a request to the Edamam API to search for recipes
  const response = await fetch(`https://api.edamam.com/search?q=${searchInput}&app_id=${appId}&app_key=${appKey}`);

  // Parse the response as JSON
  const data = await response.json();

  // Extract the list of recipes from the response
  const recipes = data.hits.map(hit => hit.recipe);

  // Render the list of recipes on the page
  const recipesDiv = document.getElementById('recipes');
  recipesDiv.innerHTML = '';
  recipes.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    recipesDiv.appendChild(recipeCard);
  });
}

function createRecipeCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('recipe');
  card.addEventListener('click', () => {
    window.open(recipe.url, '_blank');
  });

  const image = document.createElement('img');
  image.src = recipe.image;
  card.appendChild(image);

  const title = document.createElement('h2');
  title.innerText = recipe.label;
  card.appendChild(title);

  const ingredients = document.createElement('p');
  ingredients.innerText = `Ingredients: ${recipe.ingredientLines.join(', ')}`;
  card.appendChild(ingredients);

  return card;
}
