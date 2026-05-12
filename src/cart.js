import './style.css';

const cartBadge = document.getElementById('cart-badge');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartSummary = document.getElementById('cart-summary');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const upiQr = document.getElementById('upi-qr');
const payNowBtn = document.getElementById('pay-now-btn');
const confirmWhatsappBtn = document.getElementById('confirm-whatsapp-btn');

const UPI_ID = '8073644604@ybl';
const WHATSAPP_NUM = '918073644604';

function getCart() {
  return JSON.parse(localStorage.getItem('oryn_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('oryn_cart', JSON.stringify(cart));
}

function updateBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

function renderCart() {
  const cart = getCart();
  
  // Clear previous items (keep empty message)
  document.querySelectorAll('.cart-item').forEach(el => el.remove());
  
  if (cart.length === 0) {
    emptyCartMsg.style.display = 'block';
    cartSummary.style.display = 'none';
    return;
  }
  
  emptyCartMsg.style.display = 'none';
  cartSummary.style.display = 'block';
  
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn minus" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn plus" data-id="${item.id}">+</button>
      </div>
      <div class="cart-item-price" style="width: 60px; text-align: right;">
        ₹${itemTotal}
      </div>
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;
    cartItemsContainer.insertBefore(div, emptyCartMsg);
  });
  
  subtotalEl.textContent = `₹${total}`;
  totalEl.textContent = `₹${total}`;
  
  // Setup UPI links
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Oryn&cu=INR&am=${total}`;
  payNowBtn.href = upiLink;
  
  // Generate QR Code via public API
  upiQr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiLink)}`;
  
  // Setup WhatsApp Confirmation
  let waMsg = `Hi Oryn! I have completed my payment of ₹${total} via UPI.\n\n*Order Details:*\n`;
  cart.forEach(item => {
    waMsg += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
  });
  waMsg += `\nPlease find the payment screenshot attached.`;
  
  confirmWhatsappBtn.href = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(waMsg)}`;
  
  attachListeners();
}

function attachListeners() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const isPlus = e.target.classList.contains('plus');
      let cart = getCart();
      const item = cart.find(i => i.id === id);
      
      if (item) {
        if (isPlus) item.quantity += 1;
        else if (item.quantity > 1) item.quantity -= 1;
        saveCart(cart);
        updateBadge();
        renderCart();
      }
    });
  });
  
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      let cart = getCart();
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);
      updateBadge();
      renderCart();
    });
  });
}

// Initial render
updateBadge();
renderCart();
