function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


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

var data;
for (let i = 0; i < 1; i++) {
    $.ajax({
        dataType: "json",
        url: '/static/images/log/'+str(i)+'.json',
        data: data,
        success: success
    });
    // readTextFile('/static/images/log/'+str(i)+'.json', function(text){
    //     data = JSON.parse(text);
    //     console.log(data);
    // });
    var imageUrl = '/static/images/'+str(i)+'.png',
        imageBounds = data;
    L.imageOverlay(imageUrl, imageBounds, opacity = 0.5).addTo(map);
}

