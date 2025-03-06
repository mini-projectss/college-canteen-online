document.addEventListener("DOMContentLoaded", function () {
    // Load order details from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Display cart items
    let orderItemsDiv = document.getElementById("order-items");
    orderItemsDiv.innerHTML = cart.map(item => `
        <p>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</p>
    `).join("");

    // Show total amount
    document.getElementById("total-amount").textContent = totalAmount;

    // Handle Payment
    document.getElementById("pay-btn").addEventListener("click", function () {
        let selectedPayment = document.querySelector('input[name="payment"]:checked').value;

        if (selectedPayment === "upi") {
            alert("Redirecting to UPI payment...");
            setTimeout(() => {
                alert("✅ Payment Successful!");
                localStorage.removeItem("cart"); // Clear cart
                window.location.href = "track-order.html"; // Redirect to order status page
            }, 2000);
        } else if (selectedPayment === "cash") {
            alert("✅ Cash on Delivery Selected. Your order is confirmed!");
            localStorage.removeItem("cart"); // Clear cart
            window.location.href = "track-order.html"; // Redirect to order status page
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Load order details from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Display cart items
    let orderItemsDiv = document.getElementById("order-items");
    orderItemsDiv.innerHTML = cart.map(item => `
        <p>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</p>
    `).join("");

    // Show total amount
    document.getElementById("total-amount").textContent = totalAmount;

    // Handle Payment
    document.getElementById("pay-btn").addEventListener("click", function () {
        let selectedPayment = document.querySelector('input[name="payment"]:checked').value;

        if (selectedPayment === "upi") {
            alert("Redirecting to UPI payment...");
            setTimeout(() => {
                localStorage.removeItem("cart"); // Clear cart
                window.location.href = "payment-success.html"; // Redirect to Success Page
            }, 2000);
        } else if (selectedPayment === "cash") {
            alert("✅ Cash on Delivery Selected. Your order is confirmed!");
            localStorage.removeItem("cart"); // Clear cart
            window.location.href = "payment-success.html"; // Redirect to Success Page
        }
    });
});
