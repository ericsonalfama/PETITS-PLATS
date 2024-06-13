/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
//----------------------------------------------------
// FONCTION POUR RECHERCHER/FILTRER RECETTES
//----------------------------------------------------
function filterRecipes() {
  const headerSearch = document.getElementById('headerSearch');
  const headerSearchTerm = normalizeText(headerSearch.value);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesHeaderSearch = !headerSearchTerm
            || normalizeText(recipe.name).includes(headerSearchTerm)
            || normalizeText(recipe.description).includes(headerSearchTerm)
            || recipe.ingredients.some((ing) => normalizeText(ing.ingredient).includes(headerSearchTerm))
            || normalizeText(recipe.appliance).includes(headerSearchTerm)
            || recipe.ustensils.some((ust) => normalizeText(ust).includes(headerSearchTerm));

    const matchesIngredientSearch = [...activeIngredients].every((ai) => recipe.ingredients.some((ing) => normalizeText(ing.ingredient).includes(ai)));

    const matchesappliancesearch = [...activeAppliances].every((ai) => normalizeText(recipe.appliance).includes(ai));

    const matchesUtensilSearch = [...activeUtensils].every((au) => recipe.ustensils.some((ust) => normalizeText(ust).includes(au)));

    return matchesHeaderSearch && matchesIngredientSearch && matchesappliancesearch && matchesUtensilSearch;
  });

  updateRecipeResults(filteredRecipes);
  updateDropdownLists(
    filteredRecipes,
    normalizeText(document.getElementById('ingredientSearch').value),
    normalizeText(document.getElementById('appliancesearch').value),
    normalizeText(document.getElementById('utensilSearch').value),
    activeIngredients,
    activeAppliances,
    activeUtensils,
  );
}
