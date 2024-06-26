/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//----------------------------------------------------
// GÉNÉRER ET AFFICHER LES CARTES RECETTES DANS LE DOM
//----------------------------------------------------
function generateRecipesCard(recipesArray, recipesSection) {
  for (const recipe of recipesArray) {
    const recipeCard = createRecipeCard(recipe);
    recipesSection.appendChild(recipeCard);
  }
}

//-----------------------------------------------------------
// GÉRER LES UNDEFINED (INGRÉDIENTS SANS QUANTITÉ DÉFINIE)
//-----------------------------------------------------------
function hideUndefined() {
  const quantityElements = document.querySelectorAll('.quantity');

  for (const element of quantityElements) {
    if (element.textContent.trim() === '' || element.textContent.trim() === 'undefined') {
      element.style.display = 'none';
    }
  }
}

//-----------------------------------------------------------
// UPDATE DE L'AFFICHAGE DES CARTES SELON RÉSULTATS RECHERCHE
// -----------------------------------------------------------
function updateRecipeResults(filteredRecipes) {
  const recipeResults = document.getElementById('recipeResults');
  recipeResults.innerHTML = '';

  const headerSearchTerm = document.getElementById('headerSearch').value;
  if (headerSearchTerm.length >= 3) {
    if (filteredRecipes.length === 0) {
      const noResultsMessage = document.createElement('p');
      noResultsMessage.className = 'message';
      noResultsMessage.innerHTML = `Aucune recette ne contient ‘<b>${headerSearchTerm}</b>’ vous pouvez chercher « tarte aux pommes », « poisson », etc. `;

      recipeResults.appendChild(noResultsMessage);
    } else {
      generateRecipesCard(filteredRecipes, recipeResults);
    }
  } else {
    generateRecipesCard(filteredRecipes, recipeResults);
  }

  recipesCounter();
  hideUndefined();
}

//--------------------------------------------------------------------------------------------------
// UPDATE DES LISTES DES DROPDOWNS (INGRÉDIENTS, APPAREILS, USTENSILS) SELON RÉSULTATS DES FILTRES
// UPDATE DE L'AFFICHAGE DES CARTES SELON RÉSULTATS DES FILTRES APPLIQUÉS
//--------------------------------------------------------------------------------------------------

function updateDropdownLists(filteredRecipes, ingredientSearchTerm, applianceSearchTerm, utensilSearchTerm, activeIngredients, activeAppliances, activeUtensils) {
  const ingredientList = document.getElementById('ingredientList');
  const applianceList = document.getElementById('applianceList');
  const utensilList = document.getElementById('utensilList');

  const ingredients = new Set();
  const appliances = new Set();
  const utensils = new Set();

  // Remplir les sets avec des valeurs normalisées
  for (const recipe of filteredRecipes) {
    for (const ing of recipe.ingredients) {
      ingredients.add(normalizeText(ing.ingredient));
    }
    appliances.add(normalizeText(recipe.appliance));
    for (const ust of recipe.ustensils) {
      utensils.add(normalizeText(ust));
    }
  }

  // Conversion des sets en tableaux et tri
  const sortedIngredients = Array.from(ingredients).sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));
  const sortedAppliances = Array.from(appliances).sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));
  const sortedUtensils = Array.from(utensils).sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));

  // Update de la liste des ingrédients, appliances et ustensils
  ingredientList.innerHTML = '';
  for (const ingredient of sortedIngredients) {
    if (!activeIngredients.has(ingredient) && ingredient.includes(ingredientSearchTerm)) {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientList.appendChild(li);
      li.addEventListener('click', () => {
        activeIngredients.add(ingredient);
        addFilterTag('ingredient', ingredient, activeIngredients, activeAppliances, activeUtensils);
        filterRecipes();
      });
    }
  }

  applianceList.innerHTML = '';
  for (const appliance of sortedAppliances) {
    if (!activeAppliances.has(appliance) && appliance.includes(applianceSearchTerm)) {
      const li = document.createElement('li');
      li.textContent = appliance;
      applianceList.appendChild(li);
      li.addEventListener('click', () => {
        activeAppliances.add(appliance);
        addFilterTag('appliance', appliance, activeIngredients, activeAppliances, activeUtensils);
        filterRecipes();
      });
    }
  }

  utensilList.innerHTML = '';
  for (const utensil of sortedUtensils) {
    if (!activeUtensils.has(utensil) && utensil.includes(utensilSearchTerm)) {
      const li = document.createElement('li');
      li.textContent = utensil;
      utensilList.appendChild(li);
      li.addEventListener('click', () => {
        activeUtensils.add(utensil);
        addFilterTag('utensil', utensil, activeIngredients, activeAppliances, activeUtensils);
        filterRecipes();
      });
    }
  }
}
