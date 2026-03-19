const appContent = document.getElementById('app-content');

// Navegación SPA
function cargarModulo(modulo) {
    if (modulo === 'unidades') {
        appContent.innerHTML = `
            <h2>Unidades de Medida</h2>
            <input type="text" id="nombreUnidad" placeholder="Ej. Kilogramos">
            <button onclick="guardarUnidad()">Guardar</button>
            <table>
                <thead><tr><th>ID</th><th>Nombre</th></tr></thead>
                <tbody id="tablaUnidades"></tbody>
            </table>
        `;
        listarUnidades(); // Carga los datos desde tu BD en Aiven
    } else {
        mostrarMensaje(`El módulo ${modulo} está listo para conectarse igual que Unidades.`);
    }
}

function mostrarMensaje(msg) {
    appContent.innerHTML = `<h2>${msg}</h2>`;
}

// Interacción con el Backend (Fetch API)
async function listarUnidades() {
    const res = await fetch('/api/catalogos/unidades');
    const data = await res.json();
    const tbody = document.getElementById('tablaUnidades');
    tbody.innerHTML = '';
    data.forEach(u => {
        tbody.innerHTML += `<tr><td>${u.id}</td><td>${u.nombre}</td></tr>`;
    });
}

async function guardarUnidad() {
    const nombre = document.getElementById('nombreUnidad').value;
    if (!nombre) return alert('Escribe un nombre');

    await fetch('/api/catalogos/unidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
    });
    
    document.getElementById('nombreUnidad').value = '';
    listarUnidades(); // Actualiza la tabla automáticamente
}