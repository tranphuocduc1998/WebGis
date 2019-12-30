//Thêm Map vào webgis
var map = L.map('map', {
    zoomControl: true, //Điều khiển phóng to thu nhỏ
}).setView([10.980406580855586, 106.67470335960388], 13);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=xmOd1dPIjOuHfYuGhLCI', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>' +
        '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

// map.on('click', function (e) {
//     var poplocation = e.latlng;
//     var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//     console.log(e);
// })
