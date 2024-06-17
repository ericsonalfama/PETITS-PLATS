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
      const chevronIcon = dropdown.querySelector('.fa-solid');

      dropdownMenu.classList.remove('show');
      chevronIcon.classList.remove('fa-chevron-up');
      chevronIcon.classList.add('fa-chevron-down');
    }
  }
}

// Fonction pour afficher/cacher le dropdown
function toggleDropdown(dropdown) {
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  const chevronIcon = dropdown.querySelector('.fa-solid');

  if (dropdownMenu.classList.contains('show')) {
    dropdownMenu.classList.remove('show');
    chevronIcon.classList.remove('fa-chevron-up');
    chevronIcon.classList.add('fa-chevron-down');
  } else {
    closeOtherDropdowns(dropdown); // Ferme tous les autres dropdowns
    dropdownMenu.classList.add('show');
    chevronIcon.classList.remove('fa-chevron-down');
    chevronIcon.classList.add('fa-chevron-up');
  }
}

// Fermer le dropdown quand on clique à l'extérieur
document.addEventListener('click', (event) => {
  const isClickInside = event.target.closest('.dropdown-container');

  if (!isClickInside) {
    closeOtherDropdowns(null);
  }
});

// Fermer le dropdown quand on appuie sur la touche ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOtherDropdowns(null);
  }
});
