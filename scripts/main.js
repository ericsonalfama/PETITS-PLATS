/* eslint-disable no-undef */
//-----------------------------------------------------------------------------
// AFFICHAGE DES RECETTES ET EVENEMENTS POUR LES INPUTS ET FILTRES DE RECHERCHE
//-----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const headerSearch = document.getElementById('headerSearch');
  const ingredientSearch = document.getElementById('ingredientSearch');
  const appliancesearch = document.getElementById('appliancesearch');
  const utensilSearch = document.getElementById('utensilSearch');

  window.activeIngredients = new Set();
  window.activeAppliances = new Set();
  window.activeUtensils = new Set();

  headerSearch.addEventListener('input', () => {
    const headerSearchTerm = normalizeText(headerSearch.value);
    if (headerSearchTerm.length > 0 && headerSearchTerm.length < 3) {
      return false;
    }
    return filterRecipes();
  });
  ingredientSearch.addEventListener('input', () => updateDropdownLists(recipes, normalizeText(ingredientSearch.value), '', '', activeIngredients, activeAppliances, activeUtensils));
  appliancesearch.addEventListener('input', () => updateDropdownLists(recipes, '', normalizeText(appliancesearch.value), '', activeIngredients, activeAppliances, activeUtensils));
  utensilSearch.addEventListener('input', () => updateDropdownLists(recipes, '', '', normalizeText(utensilSearch.value), activeIngredients, activeAppliances, activeUtensils));

  filterRecipes();
  hideUndefined();
  getDescription();
});
