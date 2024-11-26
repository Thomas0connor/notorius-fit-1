// Carrito almacenado en localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar productos al carrito
function agregarAlCarrito(elemento) {
    // Obtén los datos del producto desde el atributo 'data' de la tarjeta
    const tarjetaProducto = elemento.closest('.producto-tarjeta');
    const producto = {
        id: tarjetaProducto.getAttribute('data-id'),
        nombre: tarjetaProducto.getAttribute('data-nombre'),
        precio: parseFloat(tarjetaProducto.getAttribute('data-precio')),
        cantidad: 1
    };

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        // Si el producto ya está en el carrito, solo incrementamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no está en el carrito, lo agregamos
        carrito.push(producto);
    }

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar el contador del carrito
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito en el icono del carrito
function actualizarContadorCarrito() {
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById('contador-carrito').textContent = totalProductos;
}

// Inicializar el contador al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarContadorCarrito();

    // Agregar eventos de clic a los botones de comprar
    const botonesComprar = document.querySelectorAll('.boton-comprar');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', function() {
            agregarAlCarrito(this);
        });
    });
});

