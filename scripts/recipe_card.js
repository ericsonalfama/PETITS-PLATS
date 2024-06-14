/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
//----------------------------------------------------
// CRÉATION DE LA CARTE RECETTE
//----------------------------------------------------
function createRecipeCard(recipe) {
  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipes_card');

  const recipeImageContainer = createRecipeImageContainer(recipe);
  const recipeContainer = createRecipeDetailsContainer(recipe);
  const ingredientsContainer = createIngredientsContainer(recipe);

  recipeCard.appendChild(recipeImageContainer);
  recipeCard.appendChild(recipeContainer);
  recipeCard.appendChild(ingredientsContainer);

  return recipeCard;
}

//----------------------------------------------------
// CRÉATION IMAGE RECETTE ET TEMPS DE PRÉPARATION
//----------------------------------------------------
function createRecipeImageContainer(recipe) {
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('card_image_container');

  const image = document.createElement('img');
  image.src = `/assets/recipes/${recipe.image}`;
  image.alt = recipe.name;

  const preparationTime = document.createElement('span');
  preparationTime.classList.add('preparation_time');
  preparationTime.textContent = `${recipe.time} min`;

  imageContainer.appendChild(image);
  imageContainer.appendChild(preparationTime);

  return imageContainer;
}
//----------------------------------------------------
// CRÉATION NOM RECETTE ET DESCRIPTION
//----------------------------------------------------
function createRecipeDetailsContainer(recipe) {
  const container = document.createElement('div');
  container.classList.add('recipe_container');

  const title = document.createElement('h1');
  title.textContent = recipe.name;

  const subtitle = document.createElement('h6');
  subtitle.classList.add('subtitle');
  subtitle.textContent = 'Recette';

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('recipe_description_container');

  const descriptionLength = recipe.description.substring(0, 200);

  const description = document.createElement('p');
  description.textContent = descriptionLength;
  description.classList.add('description');
  // ... (Truncate description if needed) ... // Defina a lógica de truncamento da descrição aqui

  descriptionContainer.appendChild(description);

  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(descriptionContainer);

  return container;
}

//----------------------------------------------------
// CRÉATION INGRÉDIENTS DE LA RECETTE
//----------------------------------------------------
function createIngredientsContainer(recipe) {
  const container = document.createElement('div');
  container.classList.add('ingredients_container');

  const subtitle = document.createElement('h6');
  subtitle.classList.add('subtitle');
  subtitle.textContent = 'Ingrédients';

  const ingredientsList = document.createElement('ul');

  recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement('li');
    ingredientItem.classList.add('ingredients');

    const ingredientName = document.createElement('h6');
    ingredientName.classList.add('subtitle-2');
    ingredientName.textContent = ingredient.ingredient;

    const quantity = document.createElement('p');
    quantity.classList.add('quantity');
    quantity.textContent = `${ingredient.quantity}${ingredient.unit ? ` ${ingredient.unit}` : ''}`;

    ingredientItem.appendChild(ingredientName);
    ingredientItem.appendChild(quantity);

    ingredientsList.appendChild(ingredientItem);
  });

  container.appendChild(subtitle);
  container.appendChild(ingredientsList);

  return container;
}
