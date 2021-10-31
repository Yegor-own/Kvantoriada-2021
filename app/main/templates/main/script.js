let map = L.map('map', {
    minZoom: 2,
    maxZoom:18,
    pane: 'tilePane'
}).setView([56.8519000, 60.6122000], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

map.addControl( new L.Control.Compass() );

L.control.scale().addTo(map);

let icon = L.icon({
    iconUrl: "/static/marker.png",
    iconSize: [5, 5],
})

let loc = []
let marker
let polygon

map.on('click', function(e) {
    loc.push([e.latlng['lat'], e.latlng['lng']])
    if (polygon) map.removeLayer(polygon)
    marker = new L.Marker(e.latlng, {icon: icon}).addTo(map)
    polygon = L.polygon(loc, {
        color: 'red',
        fillColor: '#f03',
    }).addTo(map);
    console.log(loc);
})

var imageUrl = '/static/img_3.png',
    imageBounds = [[56.867029, 60.700769], [56.863884, 60.706230]];

L.imageOverlay(imageUrl, imageBounds, opacity = 0.5).addTo(map);