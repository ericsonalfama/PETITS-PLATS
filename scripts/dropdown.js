/* eslint-disable no-unused-vars */
//----------------------------------------------------
// GÉRÉR DROPDOWN
//----------------------------------------------------

// Fonction pour fermer tous les autres dropdowns
function closeOtherDropdowns(currentDropdown) {
  const dropdowns = document.querySelectorAll('.dropdown-container');
  dropdowns.forEach((dropdown) => {
    if (dropdown !== currentDropdown) {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      const chevronIcon = dropdown.querySelector('.dropdown-toggle i');

      dropdownMenu.classList.remove('show');
      chevronIcon.classList.remove('fa-chevron-up');
      chevronIcon.classList.add('fa-chevron-down');
    }
  });
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
    closeOtherDropdowns(dropdown);
    dropdownMenu.classList.add('show');
    chevronIcon.classList.remove('fa-chevron-down');
    chevronIcon.classList.add('fa-chevron-up');
  }
}

// Fermer le dropdown avec clique à l'extérieur ou avec la touche ESC
document.addEventListener('click', (event) => {
  const isClickInside = event.target.closest('.dropdown-container');

  if (!isClickInside) {
    closeOtherDropdowns(null);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOtherDropdowns(null);
  }
});

