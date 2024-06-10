document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartModal = document.getElementById('cartModal');
    const cartModalClose = cartModal.querySelector('.close');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalCartElement = document.getElementById('total-cart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartDisplay = () => {
        cartCountElement.textContent = cart.length;
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <span>${item.name}</span>
                    <span>Rs ${item.price}</span>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += parseInt(item.price);
        });

        totalCartElement.textContent = total;
    };

    const addToCart = (product) => {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productElement = e.target.closest('.pro');
            const product = {
                image: productElement.querySelector('img').src,
                name: productElement.querySelector('h5').textContent,
                price: productElement.querySelector('h4').textContent.replace('Rs ', '')
            };
            addToCart(product);
            alert('Item added to cart!');
        });
    });

    // Initialize cart display on page load
    updateCartDisplay();

    // Handle modal display
    document.getElementById('cart-icon').addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
    });

    cartModalClose.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });
});
