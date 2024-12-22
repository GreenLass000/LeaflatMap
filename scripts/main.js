fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTMAqvlq_HquZX_CM9qqXbCZ1FyyRalZ6wx_I3GjcDq74KlDzIG-R7eDXzXGwZY8PZ0ZprAlqE3QfDB/pub?gid=0&single=true&output=csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1);

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

            const lat = parseFloat(latitud);
            const lng = parseFloat(longitud);

            if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                const marker = L.marker([lat, lng]).addTo(map);
                marker.bindPopup(`
                    <h3>${nombre}</h3>
                    <p><strong>Virgen:</strong> ${virgen}</p>
                    <p><strong>Nº Exvotos:</strong> ${exvotos}</p>
                    <p><strong>Desde:</strong> ${desde} <strong>Hasta:</strong> ${hasta}</p>
                    <p><strong>Ciudad:</strong> ${ciudad}</p>
                    <img src="images/${imagen}" alt="${nombre}" style="width:100%;max-width:200px;" />
                `);
            } else {
                console.warn(`Coordenadas inválidas para: ${nombre}`);
            }
        });
    })
    .catch(error => console.error('Error al cargar el CSV:', error));
