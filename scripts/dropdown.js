/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
//----------------------------------------------------
// GÉRÉR DROPDOWN
//----------------------------------------------------

// Fonction pour fermer tous les autres dropdowns
function closeOtherDropdowns(currentDropdown) {
  const dropdowns = document.querySelectorAll('.dropdown-container');
  for (const dropdown of dropdowns) {
    if (dropdown !== currentDropdown) {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      const chevronIcon = dropdown.querySelector('.dropdown-toggle i');

      dropdownMenu.classList.remove('show');
      chevronIcon.classList.remove('fa-chevron-up');
      chevronIcon.classList.add('fa-chevron-down');
    }
  }
}

// Fonction pour afficher/cacher le dropdown
function toggleDropdown(dropdown) {
  closeOtherDropdowns(dropdown); // Ferme tous les autres dropdowns
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  const chevronIcon = dropdown.querySelector('.dropdown-toggle i');

  dropdownMenu.classList.toggle('show');
  chevronIcon.classList.toggle('fa-chevron-down');
  chevronIcon.classList.toggle('fa-chevron-up');
}
