/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
//----------------------------------------------------
// FONCTION POUR RECHERCHER/FILTRER RECETTES
//----------------------------------------------------
function filterRecipes() {
  console.time('filterRecipes');

  const headerSearch = document.getElementById('headerSearch');
  const headerSearchTerm = normalizeText(headerSearch.value);

  const filteredRecipes = recipes.reduce((acc, recipe) => {
    const matchesHeaderSearch = !headerSearchTerm
            || normalizeText(recipe.name).includes(headerSearchTerm)
            || normalizeText(recipe.description).includes(headerSearchTerm)
            || recipe.ingredients.some((ing) => normalizeText(ing.ingredient).includes(headerSearchTerm))
            || normalizeText(recipe.appliance).includes(headerSearchTerm)
            || recipe.ustensils.some((ust) => normalizeText(ust).includes(headerSearchTerm));

    const matchesIngredientSearch = [...activeIngredients].every((ai) => recipe.ingredients.some((ing) => normalizeText(ing.ingredient).includes(ai)));

    const matchesApplianceSearch = [...activeAppliances].every((ai) => normalizeText(recipe.appliance).includes(ai));

    const matchesUtensilSearch = [...activeUtensils].every((au) => recipe.ustensils.some((ust) => normalizeText(ust).includes(au)));

    if (matchesHeaderSearch && matchesIngredientSearch && matchesApplianceSearch && matchesUtensilSearch) {
      acc.push(recipe);
    }

    return acc;
  }, []);

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

  console.timeEnd('filterRecipes');
}
