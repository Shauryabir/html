// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    image: "https://cdn-icons-png.flaticon.com/512/1048/1048948.png"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 79.99,
    image: "https://cdn-icons-png.flaticon.com/512/1048/1049278.png"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 29.99,
    image: "https://cdn-icons-png.flaticon.com/512/1048/1049074.png"
  },
  {
    id: 4,
    name: "USB Flash Drive",
    price: 14.99,
    image: "https://cdn-icons-png.flaticon.com/512/1048/1049175.png"
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 19.99,
    image: "https://cdn-icons-png.flaticon.com/512/1048/1049176.png"
  }
];

let cart = [];

// Render products
function renderProducts() {
  const productsSection = document.getElementById("products");
  productsSection.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="price">$${product.price.toFixed(2)}</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsSection.appendChild(card);
  });
}

// Add item to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
}

// Update cart icon count
function updateCartCount() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

// Show cart modal
function showCart() {
  renderCartItems();
  document.getElementById("cart-modal").classList.remove("hidden");
}

// Hide cart modal
function hideCart() {
  document.getElementById("cart-modal").classList.add("hidden");
}

// Render cart items
function renderCartItems() {
  const cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.id})" style="background:#e74c3c;color:#fff;border:none;border-radius:3px;padding:0 8px;margin-left:8px;">X</button>
    `;
    cartItemsList.appendChild(li);
  });
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  renderCartItems();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  cart = [];
  updateCartCount();
  renderCartItems();
  hideCart();
}

// Event listeners
document.getElementById("cart-btn").addEventListener("click", showCart);
document.getElementById("close-cart").addEventListener("click", hideCart);
document.getElementById("checkout-btn").addEventListener("click", checkout);

// Initial render
renderProducts();
updateCartCount();