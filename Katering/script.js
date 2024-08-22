// Simpan item keranjang dalam localStorage
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} telah ditambahkan ke keranjang.`);
}

// Tampilkan item keranjang di halaman cart
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.name} - Rp ${item.price}`;
        cartList.appendChild(li);
        total += item.price;
    });

    document.getElementById('total-price').textContent = `Rp ${total}`;
}

// Checkout dan kirim detail ke WhatsApp
function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderDetails = cart.map(item => `${item.name}: Rp ${item.price}`).join('%0A');
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    let message = `Pesanan saya:%0A${orderDetails}%0ATotal Harga: Rp ${totalPrice}`;

    window.location.href = `https://wa.me/089665119793?text=${encodeURIComponent(message)}`;
    localStorage.removeItem('cart'); // Kosongkan keranjang setelah checkout
}

// Pastikan halaman cart memuat item saat pertama kali
if (document.getElementById('cart-list')) {
    displayCart();
}

// Pastikan halaman checkout memuat detail saat pertama kali
if (document.getElementById('order-details')) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderDetails = cart.map(item => `${item.name}: Rp ${item.price}`).join('\n');
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('order-details').textContent = orderDetails;
    document.getElementById('total-price').textContent = `Rp ${totalPrice}`;
}
