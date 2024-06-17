/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//----------------------------------------------------
// NORMALISER LA CHAÎNE DE CARACTÈRES
//----------------------------------------------------
/* function normalizeText(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
} */

function normalizeText(text) {
  return text
    .toLowerCase()  // Converte todo o texto para minúsculas
    .normalize('NFD')  // Normaliza o texto
    .replace(/[\u0300-\u036f]/g, '')  // Remove acentos e diacríticos
    .trim()  // Remove espaços em branco no início e no final
    .split(' ')  // Divide o texto em palavras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitaliza a primeira letra de cada palavra
    .join(' ');  // Junta as palavras de volta em uma string
}


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
