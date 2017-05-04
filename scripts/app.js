var initMap = function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(11.6,4.94)
    });
    plotMap();
}
window.initMap = initMap;
const WONDERS = [
    {
        NAME: 'Great Wall of China (China)',
        LATITUDE: 40.4319118,
        LONGITUDE: 116.5681862
    },
    {
        NAME: 'Christ the Redeemer Statue (Rio de Janeiro)',
        LATITUDE: -22.951911,
        LONGITUDE: -43.2126759,
    },
    {
        NAME: 'Machu Picchu (Peru)',
        LATITUDE: -13.163136,
        LONGITUDE: -72.5471516
    },
    {
        NAME: 'Chichen Itza (Yucatan Peninsula, Mexico)',
        LATITUDE: 20.6842899,
        LONGITUDE: -88.5699713
    },
    {
        NAME: 'The Roman Colosseum (Rome)',
        LATITUDE: 41.8902142,
        LONGITUDE: 12.4900422
    },
    {
        NAME: 'Taj Majal (Agra, India)',
        LATITUDE: 27.1750199,
        LONGITUDE: 78.0399665
    },
    {
        NAME: 'Petra (Jordan)',
        LATITUDE: 30.328459,
        LONGITUDE: 35.4421735
    }
];

var map;
var allInfoWindows = [];
function getAllMarkers() {
    for(var i=0; i<WONDERS.length;i++) {
        var wonder = WONDERS[i];
        console.log("%d. %s = %f,%f",(i+1),wonder.NAME,wonder.LATITUDE,wonder.LONGITUDE);
        createMarker(wonder);
    }
}
function createMarker(wonder) {
    var infoWindow = new google.maps.InfoWindow({
        content: getInfoWindowContent(wonder),
        position: new google.maps.LatLng(wonder.LATITUDE,wonder.LONGITUDE)
    });
    allInfoWindows.push(infoWindow);

    var latLng = new google.maps.LatLng(wonder.LATITUDE,wonder.LONGITUDE);
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: wonder.NAME,
        animation: google.maps.Animation.DROP
    });
    marker.addListener('click', function() {
        closeAllOpenInfoWindows();
        infoWindow.open(map,marker);
    });

}
function closeAllOpenInfoWindows() {
    for(var i=0;i<allInfoWindows.length;i++) {
        allInfoWindows[i].close();
    }
}

function getInfoWindowContent(place) {
    return place.NAME + ' (' + place.LATITUDE+ ',' + place.LONGITUDE+ ')';
}

function plotMap() {
    getAllMarkers();
}
listWonders();
addResetLink();
function listWonders() {
    var innerCode = "<ol>";
    for(var i=0;i<WONDERS.length;i++) {
        innerCode += getWonderLi(WONDERS[i]);
    }
    innerCode += "</ol>"
    document.getElementById("wonders").innerHTML = innerCode;
}
function getWonderLi(w) {
    return '<li onclick="handleMarkerClick('+w.LATITUDE+','+w.LONGITUDE+')">'+w.NAME+'</li>';
}
function addResetLink() {
    var reset = document.createElement('a');
	reset.setAttribute('onclick','initMap()');
	reset.innerText = ("Reset")
	document.getElementById("wonders").append(reset);
}
function handleMarkerClick(lat,lng) {
    map.panTo(new google.maps.LatLng(lat,lng));
    map.setZoom(16);
}
