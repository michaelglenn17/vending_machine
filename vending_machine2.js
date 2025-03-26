let cart = {
    items: {},
    count: 0,
    total: 0
};

function toggleProductSelection(element) {
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
}

function changeQuantity(productId, change) {
    const quantityElement = document.getElementById(`qty-${productId}`);
    let currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity + change < 1) return;
    currentQuantity += change;
    quantityElement.textContent = currentQuantity;
}

function addToCart(productId) {
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    const productName = productCard.getAttribute('data-name');
    const productPrice = parseInt(productCard.getAttribute('data-price'));
    const quantity = parseInt(document.getElementById(`qty-${productId}`).textContent);
    if (cart.items[productId]) {
        cart.items[productId].quantity += quantity;
    } else {
        cart.items[productId] = {
            name: productName,
            price: productPrice,
            quantity: quantity
        };
    }
    updateCartSummary();
    alert(`Added ${quantity} ${productName} to cart!`);
    document.getElementById(`qty-${productId}`).textContent = "1";
    productCard.classList.remove('selected');
}

function updateCartSummary() {
    cart.count = 0;
    cart.total = 0;
    for (const id in cart.items) {
        cart.count += cart.items[id].quantity;
        cart.total += cart.items[id].price * cart.items[id].quantity;
    }
    document.querySelector('.cart-items').textContent =
        `Cart: ${cart.count} items | ₹${cart.total.toLocaleString()}`;
}

function checkout() {
    if (cart.count === 0) {
        alert('Your cart is empty. Please add items before checkout.');
    } else {
        alert(`Proceeding to checkout with ${cart.count} items totaling ₹${cart.total.toLocaleString()}`);
    }
}

function showHelp() {
    alert('Help section would appear here');
}

function switchLanguage() {
    alert('Language options would appear here');
}

document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelector('.category-btn.active').classList.remove('active');
        this.classList.add('active');
    });
});

function toggleMenuSidebar() {
    let menuBtn = document.getElementById("menu-btn");
    let menuList = document.getElementById("menu-list");

    menuBtn.addEventListener("click", function() {
        if (menuList.style.display === "block") {
            menuList.style.display = "none";
        } else {
            menuList.style.display = "block";
        }
    });

    document.addEventListener("click", function(event) {
        if (!menuBtn.contains(event.target) && !menuList.contains(event.target)) {
            menuList.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", toggleMenuSidebar);
