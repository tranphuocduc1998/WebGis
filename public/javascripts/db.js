var overlayersMaps = {};
var layerscontrol = L.control.layers(null, overlayersMaps).addTo(map);

var loadGeoJSON = function (params) {
    var myStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    };
    return L.geoJSON(params, {
        style: function (feature) {
            switch (feature.geometry.type) {
                case 'MultiLineString':
                    return { color: "#0066ff" };
                case 'MultiPolygon':
                    return { color: "#00ccff" };
                default:
                    break;
            }
        },
    }).bindPopup(function (layer) {
        switch (layer.feature.geometry.type) {
            case 'MultiLineString':
                return layer.feature.properties.tenduong;
            case 'MultiPolygon':
                return layer.feature.properties.tenphuong;
            default:
                break;
        }
    });
};

var loadGeoJSONStudents = function (params) {
    return L.geoJSON(params, {
        pointToLayer: function (geoJsonPoint, latlng) {
            switch (geoJsonPoint.properties.gender) {
                case 'Nam':
                    return L.marker(latlng, {
                        icon: smiley_happyIcon,
                    }).on('mousemove', function (e) {
                        e.target.setIcon(maleIcon);
                    }).on('mouseout', function (e) {
                        e.target.setIcon(smiley_happyIcon);
                    });
                    break;
                case 'Nữ':
                    return L.marker(latlng, {
                        icon: smiley_happyIcon,
                    }).on('mousemove', function (e) {
                        e.target.setIcon(femaleIcon);
                    }).on('mouseout', function (e) {
                        e.target.setIcon(smiley_happyIcon);
                    });
                    break;

                default:
                    return L.marker(latlng, {
                        icon: smiley_happyIcon,
                    }).on('mousemove', function (e) {
                        e.target.setIcon(publishIcon);
                    }).on('mouseout', function (e) {
                        e.target.setIcon(smiley_happyIcon);
                    });
                    break;
            }
        }
    }).bindPopup(function (layer) {
        const date = new Date(layer.feature.properties.birthday);
        const datenow = new Date(Date.now());
        const html = `<div class="row">
                        <div class="col-md-12">
                            <h5 class="mb-3">Tên sinh viên: </h5>
                            <p>${layer.feature.properties.displayname}</p>
                            <h5 class="mb-3">Ngày sinh: </h5>
                            <p>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>
                            <h5 class="mb-3">Tuổi: </h5>
                            <p>${datenow.getFullYear() - date.getFullYear()}</p>
                            <h5 class="mb-3">Tọa độ nơi ở (geometry):</h5>
                            <p style="word-break: break-all;">${layer.feature.geometry.coordinates}</p>
                        </div>
                    </div >`;
        return html;
    });
};

// axios.get('/api/point').then(doc => {
//     loadGeoJSON(doc.data);
// });

//Get khu vực thủ dầu một
axios.get('/api/area').then(doc => {
    var item = [];
    item.push(loadGeoJSON(doc.data));
    var lg_PolygonTDM = L.layerGroup(item).addTo(map);
    controlLayers('Khu vực Thủ Dầu Một', lg_PolygonTDM);
});

//Get đường Thủ dầu một
axios.get('/api/line').then(doc => {
    let item = [];
    item.push(loadGeoJSON(doc.data));
    var lg_PolylineTDM = L.layerGroup(item).addTo(map);
    controlLayers('Đường Thủ Dầu Một', lg_PolylineTDM);
});

//Get địa điểm sinh viên
axios.get('/api/students').then(doc => {
    let item = [];
    item.push(loadGeoJSONStudents(doc.data));
    var lg_point = L.layerGroup(item).addTo(map);
    controlLayers('Địa điểm Sinh viên', lg_point);

    L.control.search({
        layer: L.layerGroup(item),
        initial: false,
        propertyName: 'displayname' // Specify which property is searched into.
    }).addTo(map);
});




function controlLayers(Key, params) {
    map.removeControl(layerscontrol);
    overlayersMaps[Key] = params;
    layerscontrol = L.control.layers(null, overlayersMaps).addTo(map);
}