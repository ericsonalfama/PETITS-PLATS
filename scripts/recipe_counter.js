/* eslint-disable no-unused-vars */
//----------------------------------------------------
// AFFICHER COMPTEUR DE RECETTES (RÉSULTATS RECHERCHE)
//----------------------------------------------------
function recipesCounter() {
  const recipeCards = document.querySelectorAll('.recipes_card');
  const totalRecipesCounterText = document.getElementById('total_recipes_counter_text');
  totalRecipesCounterText.textContent = `${recipeCards.length} recette${recipeCards.length !== 1 ? 's' : ''}`;
}
