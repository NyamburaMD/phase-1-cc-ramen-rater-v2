// index.js
function displayRamens() {
  fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.innerHTML = ''; // Clear any existing content

      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen)); // Add click event for displaying details
        ramenMenu.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching ramens:', error));
}

function handleClick(ramen) {
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML = `
    <h2>${ramen.name}</h2>
    <img src="${ramen.image}" alt="${ramen.name}">
    <p>${ramen.description}</p>
    <p>Rating: ${ramen.rating}</p>
  `;
}

// Call displayRamens after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  displayRamens();
});

