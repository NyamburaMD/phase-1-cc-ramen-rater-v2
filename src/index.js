// index.js

document.addEventListener("DOMContentLoaded", main);

function main() {
    displayRamens();
    addSubmitListener();
}

// Function to fetch and display all ramen
function displayRamens() {
    fetch('http://localhost:3000/ramens')
        .then(response => response.json())
        .then(ramens => {
            const ramenMenu = document.getElementById('ramen-menu');
            ramens.forEach(ramen => {
                const img = document.createElement('img');
                img.src = ramen.image;
                img.alt = ramen.name;
                img.dataset.id = ramen.id; // Store the id for later use
                img.addEventListener('click', handleClick);
                ramenMenu.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching ramens:', error));
}

// Click handler to show ramen details
function handleClick(event) {
    const ramenId = event.target.dataset.id;
    fetch(`http://localhost:3000/ramens/${ramenId}`)
        .then(response => response.json())
        .then(ramen => {
            const ramenDetailImage = document.getElementById('ramen-detail-image');
            const ramenDetailName = document.getElementById('ramen-detail-name');
            const ramenDetailDescription = document.getElementById('ramen-detail-description');
            const ramenDetailRating = document.getElementById('ramen-detail-rating');

            ramenDetailImage.src = ramen.image;
            ramenDetailName.textContent = ramen.name;
            ramenDetailDescription.textContent = ramen.description;
            ramenDetailRating.textContent = `Rating: ${ramen.rating}`;
        })
        .catch(error => console.error('Error fetching ramen details:', error));
}

// Function to add submit event listener for new ramen
function addSubmitListener() {
    const form = document.getElementById('new-ramen');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('new-ramen-name').value;
        const image = document.getElementById('new-ramen-image').value;
        const description = document.getElementById('new-ramen-description').value;
        const rating = document.getElementById('new-ramen-rating').value;

        const newRamen = {
            name: name,
            image: image,
            description: description,
            rating: parseInt(rating) // Make sure rating is a number
        };

        // Add new ramen to ramen menu (does not persist)
        const ramenMenu = document.getElementById('ramen-menu');
        const img = document.createElement('img');
        img.src = image;
        img.alt = name;
        img.dataset.id = 'new'; // No id for new ramen
        img.addEventListener('click', handleClick);
        ramenMenu.appendChild(img);

        // Clear the form fields
        form.reset();
    });
}
