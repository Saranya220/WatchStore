/*

Storage Helper Functions

Everything related to LocalStorage
will be kept here.

*/

function getWishlists() {

    return JSON.parse(localStorage.getItem("wishlists")) || [];

}

function saveWishlists(lists) {

    localStorage.setItem(
        "wishlists",
        JSON.stringify(lists)
    );

}

function getSelectedProduct() {

    return Number(
        localStorage.getItem("selectedProduct")
    );

}

function clearSelectedProduct() {

    localStorage.removeItem(
        "selectedProduct"
    );

}

function createWishlist(name) {

    let lists = getWishlists();

    const newList = {
        id: Date.now(),
        name: name,
        products: []
    };

    lists.push(newList);

    saveWishlists(lists);

    return newList;

}

function addProductToWishlist(listId, productId) {

    let lists = getWishlists();

    let list = lists.find(item => item.id == listId);

    if (!list) return;

    if (!list.products.includes(productId)) {
        list.products.push(productId);
    }

    saveWishlists(lists);

}

function removeProductFromWishlist(listId, productId) {

    let lists = getWishlists();

    let list = lists.find(item => item.id == listId);

    if (!list) return;

    list.products = list.products.filter(id => id != productId);

    saveWishlists(lists);

}

function isProductInWishlist(listId, productId) {

    let list = getWishlists().find(item => item.id == listId);

    if (!list) return false;

    return list.products.includes(productId);

}

function deleteWishlist(listId) {

    let lists = getWishlists().filter(
        list => list.id != listId
    );

    saveWishlists(lists);

}

function renameWishlist(listId, newName) {

    let lists = getWishlists();

    let list = lists.find(item => item.id == listId);

    if (list) {
        list.name = newName;
    }

    saveWishlists(lists);

}

function mergeWishlists(firstId, secondId, newName, keepOriginals) {

    let lists = getWishlists();

    let first = lists.find(item => item.id == firstId);
    let second = lists.find(item => item.id == secondId);

    if (!first || !second) return;

    let merged = [
        ...new Set([
            ...first.products,
            ...second.products
        ])
    ];

    lists.push({
        id: Date.now(),
        name: newName,
        products: merged
    });

    if (!keepOriginals) {
        lists = lists.filter(item =>
            item.id != firstId &&
            item.id != secondId
        );
    }

    saveWishlists(lists);

}
