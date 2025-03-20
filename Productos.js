class Product {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }

    render() {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const img = document.createElement('img');
        img.src = `recursos/${this.image}`;
        img.alt = this.name;

        const nameElement = document.createElement('h3');
        nameElement.textContent = this.name;

        const priceElement = document.createElement('p');
        priceElement.textContent = `$${this.price.toFixed(2)}`;

        const button = document.createElement('button');
        button.textContent = 'Añadir al carrito';
        button.className = 'btn btn-primary';
        button.onclick = () => this.addToCart();

        productDiv.appendChild(img);
        productDiv.appendChild(nameElement);
        productDiv.appendChild(priceElement);
        productDiv.appendChild(button);

        return productDiv;
    }

    addToCart() {
        console.log(`${this.name} ha sido añadido al carrito.`);
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        this.items.push(product);
        console.log(`${product.name} added to cart. Total items: ${this.items.length}`);
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    renderCart() {
        console.log('Cart items:', this.items);
    }
}

class Producto {
    constructor(nombre, descripcion, precio) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

const carrito = [];

document.querySelectorAll('.btn').forEach((button, index) => {
    button.addEventListener('click', () => {
        const producto = new Producto(
            `Producto ${index + 1}`,
            `Descripción del producto ${index + 1}`,
            (index + 1) * 10
        );
        carrito.push(producto);
        alert(`${producto.nombre} añadido al carrito.`);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            brand: '1-2-3',
            name: 'Aceite 123',
            price: 50.99,
            image: 'Aceite123.png',
            rating: 4.0,
            reviews: 5
        },
        {
            brand: 'Bimbo',
            name: 'Bimbollos',
            price: 25.99,
            image: 'Bimbollos.png',
            rating: 4.5,
            reviews: 10
        },
        {
            brand: 'Kelloggs',
            name: 'Choco Krispis',
            price: 35.99,
            image: 'ChocoKrispis.png',
            rating: 4.2,
            reviews: 8
        },
        {
            brand: 'MacCain',
            name: 'Gajos de Papas',
            price: 15.99,
            image: 'Gajos de papas.png',
            rating: 4.0,
            reviews: 12
        },
        {
            brand: 'McCormick',
            name: 'Mayonesa McCormick',
            price: 45.99,
            image: 'McCormick.png',
            rating: 4.3,
            reviews: 7
        },
        {
            brand: 'MacCain',
            name: 'Papas a la Francesa',
            price: 20.99,
            image: 'PapasFrancesa.png',
            rating: 4.1,
            reviews: 9
        },
        {
            brand: 'LALA',
            name: 'Pechuga de Pavo',
            price: 55.99,
            image: 'PechugaPavo.png',
            rating: 4.4,
            reviews: 6
        },
        {
            brand: 'LALA',
            name: 'Salchicha DE PAVO',
            price: 30.99,
            image: 'SalchichaPavo.png',
            rating: 4.0,
            reviews: 11
        },
        {
            brand: 'Kelloggs',
            name: 'Zucaritas',
            price: 40.99,
            image: 'Zucaritas.png',
            rating: 4.5,
            reviews: 15
        }
    ];

    const productContainer = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const img = document.createElement('img');
        img.src = `recursos/${product.image}`;
        img.alt = product.name;

        const brandElement = document.createElement('h3');
        brandElement.textContent = product.brand;

        const nameElement = document.createElement('p');
        nameElement.textContent = product.name;

        const priceElement = document.createElement('p');
        priceElement.textContent = `$${product.price.toFixed(2)}`;

        const ratingElement = document.createElement('div');
        ratingElement.className = 'rating';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('img');
            star.src = i < product.rating ? 'recursos/EstrellaNegra.png' : 'recursos/EstrellaBlanca.png';
            ratingElement.appendChild(star);
        }
        const ratingText = document.createElement('span');
        ratingText.textContent = ` (${product.rating})`;
        ratingElement.appendChild(ratingText);

        const reviewsElement = document.createElement('p');
        reviewsElement.textContent = `${product.reviews} opiniones.`;
        reviewsElement.style.color = '#999';

        const button = document.createElement('button');
        button.textContent = 'Comprar ahora';
        button.className = 'btn btn-primary';

        productDiv.appendChild(img);
        productDiv.appendChild(brandElement);
        productDiv.appendChild(nameElement);
        productDiv.appendChild(priceElement);
        productDiv.appendChild(ratingElement);
        productDiv.appendChild(reviewsElement);
        productDiv.appendChild(button);

        productContainer.appendChild(productDiv);
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.brand.toLowerCase().includes(query)
        );

        productContainer.innerHTML = '';
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            const img = document.createElement('img');
            img.src = `recursos/${product.image}`;
            img.alt = product.name;

            const brandElement = document.createElement('h3');
            brandElement.textContent = product.brand;

            const nameElement = document.createElement('p');
            nameElement.textContent = product.name;

            const priceElement = document.createElement('p');
            priceElement.textContent = `$${product.price.toFixed(2)}`;

            const ratingElement = document.createElement('div');
            ratingElement.className = 'rating';
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('img');
                star.src = i < product.rating ? 'recursos/EstrellaNegra.png' : 'recursos/EstrellaBlanca.png';
                ratingElement.appendChild(star);
            }
            const ratingText = document.createElement('span');
            ratingText.textContent = ` (${product.rating})`;
            ratingElement.appendChild(ratingText);

            const reviewsElement = document.createElement('p');
            reviewsElement.textContent = `${product.reviews} opiniones.`;
            reviewsElement.style.color = '#999';

            const button = document.createElement('button');
            button.textContent = 'Comprar ahora';
            button.className = 'btn btn-primary';

            productDiv.appendChild(img);
            productDiv.appendChild(brandElement);
            productDiv.appendChild(nameElement);
            productDiv.appendChild(priceElement);
            productDiv.appendChild(ratingElement);
            productDiv.appendChild(reviewsElement);
            productDiv.appendChild(button);

            productContainer.appendChild(productDiv);
        });
    });

    // Modal functionality
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const closeLogin = document.getElementById('close-login');
    const closeSignup = document.getElementById('close-signup');

    loginButton.addEventListener('click', (event) => {
        event.stopPropagation();
        loginModal.style.display = 'block';
    });

    signupButton.addEventListener('click', (event) => {
        event.stopPropagation();
        signupModal.style.display = 'block';
    });

    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    closeSignup.addEventListener('click', () => {
        signupModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target == signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // Hover effect for logo and text together
});