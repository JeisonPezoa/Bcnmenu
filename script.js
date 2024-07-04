function iniciarSesion() {
    const rut = document.getElementById('rut').value;
    if (rut.trim() !== "") {
        document.getElementById('formularioInicioSesion').style.display = 'none';
        document.getElementById('menus').style.display = 'block';
    }
    return false;
}

function cerrarSesion() {
    document.getElementById('rut').value = '';
    document.getElementById('formularioInicioSesion').style.display = 'block';
    document.getElementById('menus').style.display = 'none';
}

function mostrarDetalles(menuId) {
    const menu = document.getElementById(menuId);
    const cantidad = menu.querySelector('.cantidad').textContent;
    const imagenSrc = menu.querySelector('img').src;

    document.getElementById('detalleImagen').src = imagenSrc;

    const platosDeEntrada = {
        'menu1': 'Pollo con papas fritas',
        'menu2': 'Lentejas con huevo',
        'menu3': 'Mix de ensalada',
        'menu4': 'Arroz arverjado con pollo'
    };

    document.getElementById('entradaEditable').value = platosDeEntrada[menuId];

    const ensaladas = ['Tomate con cebolla', 'Porotos verdes', 'Lechuga'];
    const postres = ['Flan de chocolate', 'Jalea de naranja', 'Manzana'];

    const checkboxesEnsaladas = document.getElementById('checkboxesEnsaladas');
    checkboxesEnsaladas.innerHTML = '';
    ensaladas.forEach(ensalada => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check';
        checkbox.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${ensalada}" id="${ensalada}">
            <label class="form-check-label" for="${ensalada}">${ensalada}</label>
        `;
        checkboxesEnsaladas.appendChild(checkbox);
    });

    const checkboxesPostres = document.getElementById('checkboxesPostres');
    checkboxesPostres.innerHTML = '';
    postres.forEach(postre => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check';
        checkbox.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${postre}" id="${postre}">
            <label class="form-check-label" for="${postre}">${postre}</label>
        `;
        checkboxesPostres.appendChild(checkbox);
    });

    $('#detalleMenu').modal('show');
}

function confirmarPedido() {
    const rut = document.getElementById('rut').value;
    const fechaHora = obtenerFechaHoraActual();
    const entrada = document.getElementById('entradaEditable').value;
    const ensaladas = Array.from(document.querySelectorAll('#checkboxesEnsaladas input:checked')).map(el => el.value);
    const postres = Array.from(document.querySelectorAll('#checkboxesPostres input:checked')).map(el => el.value);

    const detallesPedido = document.getElementById('detallesPedido');
    detallesPedido.innerHTML = `
        <h5>Detalle de su Pedido:</h5>
        <p><strong>Entrada:</strong> ${entrada}</p>
        <p><strong>Ensalada:</strong> ${ensaladas.join(', ')}</p>
        <p><strong>Postre:</strong> ${postres.join(', ')}</p>
        <p><strong>RUT:</strong> ${rut}</p>
        <p><strong>Fecha y Hora:</strong> ${fechaHora}</p>
    `;

    actualizarStock(entrada);

    $('#detalleMenu').modal('hide');
    $('#agradecimientoMenu').modal('show');
}

function actualizarStock(entrada) {
    const platosDeEntrada = {
        'Pollo con papas fritas': 'menu1',
        'Lentejas con huevo': 'menu2',
        'Mix de ensalada': 'menu3',
        'Arroz arverjado con pollo': 'menu4'
    };

    const menuId = platosDeEntrada[entrada];
    const menu = document.getElementById(menuId);
    const cantidadElem = menu.querySelector('.cantidad');
    let cantidad = parseInt(cantidadElem.textContent);

    if (cantidad > 0) {
        cantidad -= 1;
        cantidadElem.textContent = cantidad;

        if (cantidad === 0) {
            menu.style.display = 'none';
        }
    }
}

function obtenerFechaHoraActual() {
    const ahora = new Date();
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return ahora.toLocaleDateString('es-ES', options);
}

document.getElementById('formInicioSesion').addEventListener('submit', function(event) {
    event.preventDefault();
    iniciarSesion();
});

document.getElementById('btnCerrarSesion').addEventListener('click', function() {
    cerrarSesion();
});
