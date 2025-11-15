let accessToken = mapToken;
mapboxgl.accessToken = accessToken;


const markerEl = document.createElement("div");
markerEl.className = "airbnb-marker";

markerEl.innerHTML = `
    <div class="pulse-circle"></div>
    <div class="marker-icon">
        <i class="fa-solid fa-house"></i>
    </div>
`;

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 12 
});

new mapboxgl.Marker(markerEl)
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 30 })
        .setHTML(`
            <div class="popup-content">
                <h4>${listing.title}</h4>
                <span class="popup-sub">${listing.location}</span><br>
                <span class="popup-note">Exact location provided after booking.</span>
            </div>
        `)
    )
    .addTo(map);