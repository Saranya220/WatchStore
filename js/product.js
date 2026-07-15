const productPage = document.getElementById("productPage");

const productId = getSelectedProduct();
const product = products.find(p => p.id === productId);

if (!product) {

    productPage.innerHTML = `
        <div class="notFoundBox">
            <h2>Product not found.</h2>
            <p>It may have been removed, or the link is invalid.</p>
            <button onclick="window.location.href='index.html'">Back to Home</button>
        </div>
    `;

} else {

    renderProduct();

}

function renderProduct() {

    const specsRows = Object.entries(product.specs)
        .map(([key, value]) => `
            <tr>
                <td>${key}</td>
                <td>${value}</td>
            </tr>
        `)
        .join("");

    productPage.innerHTML = `

        <div class="productDetail">

            <div class="productImage">
                <img src="${product.image}" alt="${product.brand} ${product.name}">
            </div>

            <div class="productInfo">

                <h2>${product.brand} ${product.name}</h2>

                <p class="price">₹${product.price.toLocaleString()}</p>

                <p class="description">${product.description}</p>

                <table class="specTable">
                    <tbody>
                        ${specsRows}
                    </tbody>
                </table>

                <div class="wishlistBox">
                    <h3>Add to Wishlist</h3>
                    <div id="wishlistControls"></div>
                </div>

            </div>

        </div>

    `;

    renderWishlistControls();

}

function renderWishlistControls() {

    const wishlistControls = document.getElementById("wishlistControls");
    const lists = getWishlists();

    if (lists.length === 0) {

        wishlistControls.innerHTML = `
            <p class="emptyText">You don't have any wishlists yet.</p>
            <div class="inlineForm">
                <input type="text" id="newListName" placeholder="New wishlist name">
                <button id="createAndAddBtn">Create &amp; Add</button>
            </div>
        `;

        document.getElementById("createAndAddBtn").addEventListener("click", handleCreateAndAdd);

        return;

    }

    const options = lists
        .map(list => `<option value="${list.id}">${list.name} (${list.products.length})</option>`)
        .join("");

    wishlistControls.innerHTML = `
        <div class="inlineForm">
            <select id="wishlistSelect">
                ${options}
            </select>
            <button id="addToWishlistBtn">Add</button>
        </div>

        <details class="newListDetails">
            <summary>Create a new wishlist instead</summary>
            <div class="inlineForm">
                <input type="text" id="newListName" placeholder="New wishlist name">
                <button id="createAndAddBtn">Create &amp; Add</button>
            </div>
        </details>
    `;

    document.getElementById("addToWishlistBtn").addEventListener("click", () => {

        const listId = Number(document.getElementById("wishlistSelect").value);

        addProductToWishlist(listId, product.id);

        renderWishlistControls();

    });

    document.getElementById("createAndAddBtn").addEventListener("click", handleCreateAndAdd);

}

function handleCreateAndAdd() {

    const input = document.getElementById("newListName");
    const name = input.value.trim();

    if (name === "") {
        alert("Please enter a wishlist name.");
        return;
    }

    const newList = createWishlist(name);

    addProductToWishlist(newList.id, product.id);

    renderWishlistControls();

}
