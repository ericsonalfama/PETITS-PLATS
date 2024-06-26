/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
//----------------------------------------------------
// FONCTION POUR RECHERCHER/FILTRER RECETTES
//----------------------------------------------------
function filterRecipes() {
  console.time('filterRecipes');
  const headerSearch = document.getElementById('headerSearch');
  const headerSearchTerm = normalizeText(headerSearch.value);

  const filteredRecipes = [];
  for (const recipe of recipes) {
    let matchesHeaderSearch = !headerSearchTerm;

    for (const ing of recipe.ingredients) {
      matchesHeaderSearch = matchesHeaderSearch || normalizeText(ing.ingredient).includes(headerSearchTerm);
    }

    matchesHeaderSearch = matchesHeaderSearch || normalizeText(recipe.appliance).includes(headerSearchTerm);

    for (const ust of recipe.ustensils) {
      matchesHeaderSearch = matchesHeaderSearch || normalizeText(ust).includes(headerSearchTerm);
    }

    let matchesIngredientSearch = true;
    for (const activeIngredient of activeIngredients) {
      let foundIngredient = false;
      for (const ing of recipe.ingredients) {
        if (normalizeText(ing.ingredient).includes(activeIngredient)) {
          foundIngredient = true;
          break;
        }
      }
      matchesIngredientSearch = matchesIngredientSearch && foundIngredient;
      if (!matchesIngredientSearch) {
        break;
      }
    }

    const matchesApplianceSearch = activeAppliances.size === 0 || normalizeText(recipe.appliance).includes([...activeAppliances][0]);

    let matchesUtensilSearch = true;
    for (const activeUtensil of activeUtensils) {
      let foundUtensil = false;
      for (const ust of recipe.ustensils) {
        if (normalizeText(ust).includes(activeUtensil)) {
          foundUtensil = true;
          break;
        }
      }
      matchesUtensilSearch = matchesUtensilSearch && foundUtensil;
      if (!matchesUtensilSearch) {
        break;
      }
    }

    if (matchesHeaderSearch && matchesIngredientSearch && matchesApplianceSearch && matchesUtensilSearch) {
      filteredRecipes.push(recipe);
    }
  }

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
