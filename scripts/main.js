const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMAqvlq_HquZX_CM9qqXbCZ1FyyRalZ6wx_I3GjcDq74KlDzIG-R7eDXzXGwZY8PZ0ZprAlqE3QfDB/pubhtml';
const map = L.map('map').setView([0, 0], 2);

// Añade un mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch(sheetUrl)
    .then(response => response.text())
    .then(csv => {
        const rows = csv.split('\n').slice(1);
        rows.forEach(row => {
            const [
                nombre,
                virgen,
                exvotos,
                desde,
                hasta,
                ciudad,
                latitud,
                longitud,
                imagen
            ] = row.split(',');

            if (latitud && longitud) {
                const marker = L.marker([parseFloat(latitud), parseFloat(longitud)]).addTo(map);
                marker.bindPopup(`
                    <h3>${nombre}</h3>
                    <p><strong>Virgen:</strong> ${virgen}</p>
                    <p><strong>Nº Exvotos:</strong> ${exvotos}</p>
                    <p><strong>Desde:</strong> ${desde} <strong>Hasta:</strong> ${hasta}</p>
                    <p><strong>Ciudad:</strong> ${ciudad}</p>
                    <img src="images/${imagen}" alt="${nombre}" style="width:100%;max-width:200px;" />
                `);
            }
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));
