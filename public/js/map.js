let accessToken = mapToken;
mapboxgl.accessToken = accessToken;

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 12 
});

const marker = new mapboxgl.Marker({color: "red"})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(new mapboxgl.Popup()
  .setHTML(`<h4>${listing.title}</h4><p>Exact location provided after booking.</p>`))
  .addTo(map);
