// Get the product container
const container = document.getElementById("productContainer");

// Display only the first 3 featured watches on page load
displayProducts(products.slice(0, 3));

// Function to display products
function displayProducts(list) {

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = `
            <h2 style="text-align:center; width:100%; margin-top:30px;">
                No watches found.
            </h2>
        `;
        return;
    }

    list.forEach(product => {

        container.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.brand} ${product.name}">

            <h3>${product.brand}</h3>

            <p>${product.name}</p>

            <p class="price">₹${product.price.toLocaleString()}</p>

            <button onclick="viewProduct(${product.id})">
                View Details
            </button>

        </div>

        `;

    });

}

// Store selected product and open product page
function viewProduct(id) {

    localStorage.setItem("selectedProduct", id);

    window.location.href = "product.html";

}

// Search elements
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

// Search function
function searchProducts() {

    const text = searchBar.value.trim().toLowerCase();

    // Empty search -> show featured watches
    if (text === "") {
        displayProducts(products.slice(0, 3));
        return;
    }

    const filtered = products.filter(product =>

        product.brand.toLowerCase().includes(text) ||

        product.name.toLowerCase().includes(text)

    );

    displayProducts(filtered);

}

// Search button click
searchButton.addEventListener("click", searchProducts);

// Press Enter in search bar
searchBar.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchProducts();
    }

});
