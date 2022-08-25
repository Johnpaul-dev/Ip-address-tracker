const userInput = document.getElementById("user-input");
const button = document.getElementById("input-img");
const userIpAddress = document.getElementById("ip-address");
const userlocation = document.getElementById("location");
const timezone = document.getElementById("usertimezone");
const isp = document.getElementById("userisp");
let map = document.getElementById("map");
let ipAddressInput = 0;
let domain = "";
let longitude = 0;
let latitude = 0;
map = L.map('map') // int map

// get user location
const getLocation = () =>{
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_uAM2D764aZAm6BAYY2nWqzA85ZJU9&ipAddress=${ipAddressInput}&domain=${domain}`)
    .then(res => res.json())
    .then((data => {
       userIpAddress.textContent = data.ip
       userlocation.textContent = data.location.region
       timezone.textContent = data.location.timezone
       isp.textContent = data.isp
       longitude = data.location.lng
       latitude = data.location.lat
        // add user coordinate to the map
        map.setView([latitude, longitude], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
        }).addTo(map);
        L.marker([latitude, longitude]).addTo(map)
    }
))

}
window.addEventListener('load', () => {
    getLocation() 
});

button.addEventListener("click", () => {
    if(isNaN(userInput.value)){
       domain = userInput.value
    } else {
        ipAddressInput = userInput.value
    }
    getLocation();  
})