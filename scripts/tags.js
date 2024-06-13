/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//----------------------------------------------------
// CREATION DES TAGS
//----------------------------------------------------
function addFilterTag(type, value) {
  const activeFilters = document.getElementById('activeFilters');
  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.innerHTML = `
        <span>${value}</span>
        <button>&times;</button>
    `;
  tag.querySelector('button').addEventListener('click', () => {
    if (type === 'ingredient') {
      activeIngredients.delete(value);
    } else if (type === 'appliance') {
      activeAppliances.delete(value);
    } else if (type === 'utensil') {
      activeUtensils.delete(value);
    }
    activeFilters.removeChild(tag);
    filterRecipes();
  });
  activeFilters.appendChild(tag);
}
