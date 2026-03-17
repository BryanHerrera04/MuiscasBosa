// Esperar a que la página cargue completamente
document.addEventListener('DOMContentLoaded', function() {

    // Inicializar el mapa centrado en Bosa, Bogotá
    // Coordenadas aproximadas: 4.617, -74.200
    var map = L.map('mapa-bosa').setView([4.617, -74.200], 14);

    // Capa de mapa base (OpenStreetMap)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Añadir un marcador en un punto de interés (ej. Centro de Bosa)
    L.marker([4.617, -74.200]).addTo(map)
        .bindPopup('Territorio Muisca de Bosa.<br> <strong>Centro Urbano de la Comunidad.</strong>')
        .openPopup();

    // Opcional: Dibujar un polígono aproximado del resguardo (si tienes las coordenadas)
    // var polygon = L.polygon([
    //     [4.615, -74.215],
    //     [4.630, -74.205],
    //     [4.610, -74.190]
    // // ... más coordenadas
    // ]).addTo(map);

});