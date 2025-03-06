document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    const scheduleTimeInput = document.getElementById("scheduleTime");
    const checkoutButton = document.getElementById("checkout-btn");
    const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');

    // Toggle Navbar in Mobile View
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });

    // Handle Dropdown Menu
    document.querySelector(".profile-dropdown").addEventListener("mouseover", function () {
        document.querySelector(".dropdown").style.display = "block";
    });

    document.querySelector(".profile-dropdown").addEventListener("mouseleave", function () {
        document.querySelector(".dropdown").style.display = "none";
    });

    // Load Cart from Local Storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</span>
                <div>
                    <button onclick="decreaseQuantity(${index})">➖</button>
                    <button onclick="increaseQuantity(${index})">➕</button>
                    <button onclick="removeItem(${index})">❌</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalAmount.innerText = `Total Amount: ₹${total}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Increase Quantity of Item
    window.increaseQuantity = function (index) {
        cart[index].quantity++;
        updateCartDisplay();
    };

    // Decrease Quantity of Item
    window.decreaseQuantity = function (index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            removeItem(index); // Remove item if quantity becomes 0
        }
        updateCartDisplay();
    };

    // Remove Item from Cart
    window.removeItem = function (index) {
        cart.splice(index, 1);
        updateCartDisplay();
    };

    // Handle Order Type Selection
    orderTypeRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            scheduleTimeInput.disabled = this.value !== "schedule";
        });
    });

    // Proceed to Payment
    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let orderType = document.querySelector('input[name="orderType"]:checked').value;
        let scheduleTime = scheduleTimeInput.value;

        if (orderType === "schedule" && !scheduleTime) {
            alert("Please select a schedule time.");
            return;
        }

        window.location.href = "payment.html";
    });

    // Initial Display
    updateCartDisplay();
});
