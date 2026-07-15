const wishlistContainer = document.getElementById("wishlistContainer");
const createWishlistBtn = document.getElementById("createWishlistBtn");
const wishlistNameInput = document.getElementById("wishlistName");

createWishlistBtn.addEventListener("click", handleCreateWishlist);

wishlistNameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleCreateWishlist();
    }
});

function handleCreateWishlist() {

    const name = wishlistNameInput.value.trim();

    if (name === "") {
        alert("Please enter a wishlist name.");
        return;
    }

    createWishlist(name);

    wishlistNameInput.value = "";

    renderWishlists();

}

function renderWishlists() {

    const lists = getWishlists();

    if (lists.length === 0) {

        wishlistContainer.innerHTML = `
            <p class="emptyText">You haven't created any wishlists yet.</p>
        `;

        renderMergeSection(lists);

        return;

    }

    wishlistContainer.innerHTML = lists.map(list => `

        <div class="wishlistCard">

            <div class="wishlistHeader">

                <h3>${list.name}</h3>

                <div class="wishlistActions">
                    <button onclick="renameWishlistPrompt(${list.id})">Rename</button>
                    <button onclick="handleDeleteWishlist(${list.id})">Delete</button>
                </div>

            </div>

            <div class="wishlistProducts">
                ${renderWishlistProducts(list)}
            </div>

        </div>

    `).join("");

    renderMergeSection(lists);

}

function renderWishlistProducts(list) {

    if (list.products.length === 0) {
        return `<p class="emptyText">No products added yet.</p>`;
    }

    return list.products.map(productId => {

        const product = products.find(p => p.id === productId);

        if (!product) return "";

        return `
            <div class="wishlistItem">

                <img src="${product.image}" alt="${product.brand} ${product.name}">

                <div class="wishlistItemInfo">
                    <p><strong>${product.brand}</strong> ${product.name}</p>
                    <p class="price">₹${product.price.toLocaleString()}</p>
                </div>

                <button class="removeBtn" onclick="handleRemoveProduct(${list.id}, ${product.id})">
                    Remove
                </button>

            </div>
        `;

    }).join("");

}

function handleRemoveProduct(listId, productId) {

    removeProductFromWishlist(listId, productId);

    renderWishlists();

}

function handleDeleteWishlist(listId) {

    if (confirm("Delete this wishlist? This cannot be undone.")) {
        deleteWishlist(listId);
        renderWishlists();
    }

}

function renameWishlistPrompt(listId) {

    const newName = prompt("Enter new wishlist name:");

    if (newName && newName.trim() !== "") {
        renameWishlist(listId, newName.trim());
        renderWishlists();
    }

}

function renderMergeSection(lists) {

    let mergeSection = document.getElementById("mergeSection");

    if (!mergeSection) {
        mergeSection = document.createElement("div");
        mergeSection.id = "mergeSection";
        wishlistContainer.after(mergeSection);
    }

    if (lists.length < 2) {
        mergeSection.innerHTML = "";
        return;
    }

    const options = lists
        .map(list => `<option value="${list.id}">${list.name}</option>`)
        .join("");

    mergeSection.innerHTML = `

        <h3>Merge Wishlists</h3>

        <div class="mergeBox">

            <label>
                First wishlist
                <select id="mergeFirst">${options}</select>
            </label>

            <label>
                Second wishlist
                <select id="mergeSecond">${options}</select>
            </label>

            <label>
                New wishlist name
                <input type="text" id="mergeName" placeholder="e.g. Combined Favorites">
            </label>

            <label class="checkboxLabel">
                <input type="checkbox" id="keepOriginals">
                Keep original wishlists
            </label>

            <button id="mergeBtn">Merge</button>

        </div>

    `;

    document.getElementById("mergeBtn").addEventListener("click", handleMerge);

}

function handleMerge() {

    const firstId = Number(document.getElementById("mergeFirst").value);
    const secondId = Number(document.getElementById("mergeSecond").value);
    const newName = document.getElementById("mergeName").value.trim();
    const keepOriginals = document.getElementById("keepOriginals").checked;

    if (firstId === secondId) {
        alert("Please select two different wishlists to merge.");
        return;
    }

    if (newName === "") {
        alert("Please enter a name for the merged wishlist.");
        return;
    }

    mergeWishlists(firstId, secondId, newName, keepOriginals);

    renderWishlists();

}

renderWishlists();
