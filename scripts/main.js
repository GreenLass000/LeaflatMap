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

    // Validar que lat y lng sean números y estén dentro de los rangos válidos
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
