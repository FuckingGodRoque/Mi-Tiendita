// Productos disponibles
const productos = {
    "Aceite 123": { precio: 50.99, stock: 10 },
    "Bimbollos": { precio: 25.99, stock: 10 },
    "Choco Krispis": { precio: 35.99, stock: 10 },
    "Gajos de papas": { precio: 20.99, stock: 10 },
    "Herllmanns": { precio: 30.99, stock: 10 },
    "McCormick": { precio: 34.99, stock: 10 },
    "PapasFrancesa": { precio: 69.99, stock: 10 },
    "Pechuga de pavo": { precio: 29.99, stock: 10 },
    "Salchicha de pavo": { precio: 34.99, stock: 10 },
    "Zucaritas": { precio: 39.99, stock: 10 }
};

let carrito = {};

// Mostrar/ocultar carrito al hacer clic en el ícono
document.querySelector('.contenedor-carrito').addEventListener('click', () => {
    const carritoDiv = document.getElementById('divCarro');
    carritoDiv.style.display = 'flex'; // Mostrar el modal
});

// Cerrar el carrito al hacer clic en el botón de cerrar
document.getElementById('cerrar-carrito').addEventListener('click', () => {
    const carritoDiv = document.getElementById('divCarro');
    carritoDiv.style.display = 'none'; // Ocultar el modal
});

// Cerrar el carrito al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    const carritoDiv = document.getElementById('divCarro');
    if (event.target === carritoDiv) {
        carritoDiv.style.display = 'none'; // Ocultar el modal
    }
});

// Mostrar/ocultar modales de login y registro
document.querySelector('.btn-outline').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'flex';
});

document.querySelector('.btn-primary').addEventListener('click', () => {
    document.getElementById('registerModal').style.display = 'flex';
});

document.getElementById('cerrar-login').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'none';
});

document.getElementById('cerrar-registro').addEventListener('click', () => {
    document.getElementById('registerModal').style.display = 'none';
});

// Función para agregar productos al carrito
function agregarAlCarrito(nombre) {
    if (productos[nombre].stock > 0) {
        if (!carrito[nombre]) carrito[nombre] = { cantidad: 0, precio: productos[nombre].precio };
        carrito[nombre].cantidad++;
        productos[nombre].stock--;

    
        const stockElemento = document.getElementById(`${nombre.toLowerCase().replace(/\s/g, '-')}-stock`);
        if (stockElemento) {
            stockElemento.textContent = productos[nombre].stock;
        } else {
            console.error(`No se encontró el elemento de stock para ${nombre}`);
        }

        actualizarUI();
    } else {
        alert('Producto sin stock disponible.');
    }
}

// Función para actualizar la interfaz del carrito
function actualizarUI() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');
    const totalCarrito = document.getElementById('total-carrito');
    let total = 0;
    listaCarrito.innerHTML = '';

    for (let nombre in carrito) {
        const item = carrito[nombre];
        total += item.cantidad * item.precio;
        listaCarrito.innerHTML += `
            <li>
                <img src="recursos/${nombre.toLowerCase().replace(/\s+/g, '')}.png" alt="${nombre}" style="width: 50px; height: 50px; margin-right: 10px;">
                ${nombre} x${item.cantidad} - $${(item.cantidad * item.precio).toFixed(2)}
                <button onclick="eliminarDelCarrito('${nombre}')">Eliminar</button>
            </li>
        `;
    }

    totalElement.textContent = `$${total.toFixed(2)} MXN`;
    totalCarrito.textContent = `$${total.toFixed(2)}`; // Actualiza el total en la cápsula
    actualizarStock();
    document.getElementById('comprarCarrito').disabled = total === 0;
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(nombre) {
    if (carrito[nombre]) {
        carrito[nombre].cantidad--;
        productos[nombre].stock++;
        if (carrito[nombre].cantidad === 0) delete carrito[nombre];
        actualizarUI();
    }
}

// Función para actualizar el stock en la interfaz
function actualizarStock() {
    for (let nombre in productos) {
        const id = nombre.toLowerCase().replace(/\s+/g, '-');
        document.getElementById(`${id}-stock`).textContent = productos[nombre].stock;
    }
}

// Vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    for (let nombre in carrito) productos[nombre].stock += carrito[nombre].cantidad;
    carrito = {};
    actualizarUI();
});

// Comprar productos
document.getElementById('comprarCarrito').addEventListener('click', () => {
    if (Object.keys(carrito).length > 0) {
        alert('Compra exitosa');
        carrito = {};
        actualizarUI();
    }
});

function realizarBusqueda() {
    const query = document.getElementById('buscar-input').value.toLowerCase();
    const productosDiv = document.querySelectorAll('#producto');

    productosDiv.forEach(producto => {
        const nombre = producto.getAttribute('data-nombre').toLowerCase();
        if (nombre.includes(query)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

actualizarUI();