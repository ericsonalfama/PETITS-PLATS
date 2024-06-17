/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//----------------------------------------------------
// GÉNÉRER ET AFFICHER LES CARTES RECETTES DANS LE DOM
//----------------------------------------------------
function generateRecipesCard(recipesArray, recipesSection) {
  const t0 = performance.now();

  recipesArray.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe);
    recipesSection.appendChild(recipeCard);
  });

  const t1 = performance.now();
  console.log(`Execution time: ${t1 - t0} milliseconds`);
}

//-----------------------------------------------------------
// GÉRER LES UNDEFINED (INGRÉDIENTS SANS QUANTITÉ DÉFINIE)
//-----------------------------------------------------------
function hideUndefined() {
  const quantityElements = document.querySelectorAll('.quantity');

  quantityElements.forEach((element) => {
    if (element.textContent.trim() === '' || element.textContent.trim() === 'undefined') {
      element.style.display = 'none';
    }
  });
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
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredients.add(normalizeText(ing.ingredient)));
    appliances.add(normalizeText(recipe.appliance));
    recipe.ustensils.forEach((ust) => utensils.add(normalizeText(ust)));
  });

  // Conversion des sets en tableaux et tri
  const sortedIngredients = Array.from(ingredients).sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));
  const sortedAppliances = Array.from(appliances).sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));
  const sortedUtensils = Array.from(utensils).sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));

  // Update de la liste des ingrédients, appareils et ustensiles
  ingredientList.innerHTML = '';
  sortedIngredients.forEach((ingredient) => {
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
  });

  applianceList.innerHTML = '';
  sortedAppliances.forEach((appliance) => {
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
  });

  utensilList.innerHTML = '';
  sortedUtensils.forEach((utensil) => {
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
  });
}
