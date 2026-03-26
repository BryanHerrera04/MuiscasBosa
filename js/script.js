/**
 * Ie Muysca - Plan de Vida
 * Scripts para el Resguardo Indígena Muysca de Fonquetá y Cerca de Piedra
 */

// ============================================
// ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE CARGADO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar todas las funciones
    initMap();
    initGallery();
    initSmoothScroll();
    initNavbarScroll();
    
});

// ============================================
// MAPA INTERACTIVO CON LEAFLET
// ============================================
function initMap() {
    // Verificar que el elemento del mapa exista
    const mapContainer = document.getElementById('mapa-resguardo');
    if (!mapContainer) {
        console.log('Elemento del mapa no encontrado');
        return;
    }
    
    console.log('Inicializando mapa...');
    
    // Coordenadas del Resguardo en Chía (área de Fonquetá y Cerca de Piedra)
    // Basado en las coordenadas del documento: 4°51' N, 74°05' W
    const centerLat = 4.855;
    const centerLng = -74.085;
    
    // Inicializar el mapa
    const map = L.map('mapa-resguardo').setView([centerLat, centerLng], 13);
    
    // Capa de mapa base (OpenStreetMap estándar - más confiable)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Marcador principal en el área del Resguardo
    const marker = L.marker([centerLat, centerLng]).addTo(map);
    marker.bindPopup(`
        <strong>🏔️ Resguardo Indígena Muysca</strong><br>
        Fonquetá y Cerca de Piedra<br>
        <strong>Chía, Cundinamarca</strong><br>
        <em>200 hectáreas de territorio ancestral</em><br>
        <hr>
        📍 Altitud: 2,570 - 2,900 msnm<br>
        🌿 Sectores: Los Lavaderos, La Arenera, Pueblo Nuevo, La Pichonera
    `).openPopup();
    
    // Polígono que representa el área aproximada del Resguardo
    // Basado en la ubicación de los cerros mencionados en el documento
    const polygonCoords = [
        [4.885, -74.075],  // Norte - Cerca a Tiquiza
        [4.886, -74.073],
        [4.887, -74.070],
        [4.888, -74.068],  // Cerro de la Cruz
        [4.855, -74.075],
        [4.852, -74.072],
        [4.848, -74.070],
        [4.835, -74.085],
        [4.825, -74.095],
        [4.820, -74.100],
        [4.830, -74.105],

        [4.845, -74.102],    
        [4.849, -74.098],
        [4.852, -74.098],
        [4.880, -74.087],
        [4.885, -74.075]   // Cierre
    ];
    
    const polygon = L.polygon(polygonCoords, {
        color: '#9e5a3a',
        weight: 3,
        fillColor: '#2d5a2c',
        fillOpacity: 0.25,
        smoothFactor: 1
    }).addTo(map);
    
    polygon.bindPopup(`
        <strong>🌄 Territorio del Resguardo</strong><br>
        <strong>Sectores:</strong><br>
        • Los Lavaderos<br>
        • La Arenera<br>
        • Pueblo Nuevo<br>
        • La Pichonera<br>
        <hr>
        <strong>Cerros tutelares:</strong><br>
        • Pico del Águila (El Picacho)<br>
        • Cerro de la Cruz<br>
        • Cerro La Chiguata
    `);
    
    // Agregar marcadores para los cerros tutelares
    const cerros = [
        { nombre: "Pico del Águila (El Picacho)", lat: 4.848, lng: -74.072, altitud: "~2,900 msnm", desc: "Cerro tutelar principal, casa del espíritu del viento" },
        { nombre: "Cerro de la Cruz", lat: 4.862, lng: -74.082, altitud: "~2,895 msnm", desc: "Lugar de peregrinación y caminatas espirituales" },
        { nombre: "Cerro La Chiguata", lat: 4.855, lng: -74.092, altitud: "~2,850 msnm", desc: "Nacimiento de aguas y lugar sagrado" }
    ];
    
    // Icono personalizado para los cerros
    const mountainIcon = L.divIcon({
        html: '⛰️',
        iconSize: [25, 25],
        className: 'mountain-marker'
    });
    
    cerros.forEach(cerro => {
        const marker = L.marker([cerro.lat, cerro.lng], { icon: mountainIcon }).addTo(map);
        marker.bindPopup(`
            <strong>${cerro.nombre}</strong><br>
            📍 Altitud: ${cerro.altitud}<br>
            🌿 ${cerro.desc}
        `);
    });
    
    // Agregar marcador para el punto de agua El Zanjón
    const zanjonMarker = L.marker([4.860, -74.080]).addTo(map);
    zanjonMarker.bindPopup(`
        <strong>💧 Quebrada El Zanjón</strong><br>
        Nacimiento de agua permanente en Pueblo Nuevo<br>
        <em>Fuente hídrica de gran importancia espiritual y comunitaria</em>
    `);
    
    console.log('Mapa inicializado correctamente');
}

// ============================================
// GALERÍA DINÁMICA
// ============================================
function initGallery() {
    const galleryContainer = document.getElementById('galeria-contenedor');
    if (!galleryContainer) return;
    
    // Datos de la galería basados en el documento Plan de Vida
    const galleryImages = [
        {
            title: "Casa de Gobierno - Eduardo Fajardo",
            description: "Centro de encuentro comunitario y espacio de toma de decisiones",
            image: "assets/img/CasaGobierno.png",
            alt: "Casa de Gobierno del Resguardo Muysca"
        },
        {
            title: "Cerro Pico del Águila",
            description: "Cerro tutelar principal, casa del espíritu del viento",
            image: "assets/img/CerroPicoAguila.png",
            alt: "Cerro Pico del Águila"
        },
        {
            title: "Círculo de Palabra",
            description: "Espacio de diálogo y transmisión de saberes ancestrales",
            image: "assets/img/CirculoPalabras.png",
            alt: "Círculo de Palabra"
        },
        {
            title: "Iglesia de La Valvanera",
            description: "Construida en 1937 con participación de la comunidad",
            image: "assets/img/IglesiaValvanera.png",
            alt: "Iglesia de La Valvanera"
        },
        {
            title: "Quebrada El Zanjón",
            description: "Nacimiento de agua permanente en Pueblo Nuevo",
            image: "assets/img/QuebradaZanjon.png",
            alt: "Quebrada El Zanjón"
        },
        {
            title: "Cementerio Ancestral",
            description: "Lugar sagrado de conexión con los antepasados",
            image: "assets/img/CementerioMayor.png",
            alt: "Cementerio Ancestral"
        },
        {
            title: "Templo de la Luna",
            description: "Bohío de la mujer - Espacio de sanación y encuentro",
            image: "assets/img/TemploLuna.png",
            alt: "Templo de la Luna"
        },
        {
            title: "Valle de los Frailejones",
            description: "Más de 300 ejemplares de frailejón en el territorio",
            image: "assets/img/ValleFrailejones.png",
            alt: "Valle de los Frailejones"
        },
        {
            title: "Tejido Tradicional",
            description: "Arte del tejido en fique - Pensamiento e identidad",
            image: "assets/img/TejidoTradicional.png",
            alt: "Tejido Tradicional"
        }
    ];
    
    // Generar las tarjetas de galería con imágenes
    galleryImages.forEach(img => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        
        col.innerHTML = `
            <div class="gallery-card" onclick="openModalImage('${img.title}', '${img.description}', '${img.image}')">
                <div class="gallery-image-container">
                    <img src="${img.image}" alt="${img.alt}" class="gallery-img" 
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 300\'%3E%3Crect width=\'400\' height=\'300\' fill=\'%239e5a3a\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' fill=\'white\' font-size=\'14\' dy=\'.3em\'%3E${img.title}%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="gallery-info">
                    <h5>${img.title}</h5>
                    <p class="small text-muted">${img.description.substring(0, 100)}${img.description.length > 100 ? '...' : ''}</p>
                    <span class="badge" style="background: var(--clay-red); color: white;">Ver más</span>
                </div>
            </div>
        `;
        
        galleryContainer.appendChild(col);
    });
    
    // Agregar estilos para la galería con imágenes
    const style = document.createElement('style');
    style.textContent = `
        .gallery-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .gallery-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        .gallery-image-container {
            height: 220px;
            overflow: hidden;
            background: #f0ebe3;
        }
        .gallery-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        .gallery-card:hover .gallery-img {
            transform: scale(1.05);
        }
        .gallery-info {
            padding: 1.25rem;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .gallery-info h5 {
            font-family: 'Playfair Display', serif;
            color: #3b2a1f;
            margin-bottom: 0.75rem;
            font-size: 1.1rem;
            font-weight: 700;
        }
        .gallery-info p {
            flex: 1;
            margin-bottom: 1rem;
            font-size: 0.85rem;
            line-height: 1.5;
        }
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
        }
        .modal-content-custom {
            background: white;
            border-radius: 20px;
            max-width: 90%;
            width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalFadeIn 0.3s ease;
            cursor: default;
        }
        .modal-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }
        .modal-body-custom {
            padding: 1.5rem;
            text-align: center;
        }
        .modal-body-custom h3 {
            font-family: 'Playfair Display', serif;
            color: #2d5a2c;
            margin-bottom: 1rem;
        }
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        @media (max-width: 768px) {
            .modal-content-custom {
                width: 95%;
            }
            .modal-image {
                height: 200px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Función global para el modal con imagen
window.openModalImage = function(title, description, imageUrl) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.onclick = function(e) { 
        if (e.target === modal) this.remove(); 
    };
    
    modal.innerHTML = `
        <div class="modal-content-custom" onclick="event.stopPropagation()">
            <img src="${imageUrl}" alt="${title}" class="modal-image" 
                 onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 300\'%3E%3Crect width=\'400\' height=\'300\' fill=\'%239e5a3a\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' fill=\'white\' font-size=\'14\' dy=\'.3em\'%3EImagen no disponible%3C/text%3E%3C/svg%3E'">
            <div class="modal-body-custom">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="btn btn-muysca mt-2" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times me-2"></i>Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
};


// ============================================
// SCROLL SUAVE PARA LOS ENLACES
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(59, 42, 31, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'rgba(59, 42, 31, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ============================================
// ANIMACIÓN AL HACER SCROLL
// ============================================
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Inicializar animaciones de scroll después de un pequeño retraso
setTimeout(initScrollAnimation, 500);