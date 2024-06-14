/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//----------------------------------------------------
// NORMALISER LA CHAÎNE DE CARACTÈRES
//----------------------------------------------------
function normalizeText(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

/* function normalizeText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
} */

// Fonction pour récupérer les appareils
function getDescription() {
  const allDescriptionsSet = new Set();
  for (const recipe of recipes) {
    const normalizedDescription = normalizeText(recipe.description);
    allDescriptionsSet.add(normalizedDescription);
  }
  const allDescriptions = Array.from(allDescriptionsSet);

  return allDescriptions;
}
