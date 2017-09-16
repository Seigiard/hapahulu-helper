function setImage(id) {
    var el = document.getElementById(id);
    return function(event){
        el.style.backgroundImage = 'url('+event.target.value+')';
    }
}

const map = initMap();
const autocompletes = initAutocompletes('autocomplete', renderRoute(map));

document.getElementById('image1').addEventListener('change', setImage('collageImage1'));
document.getElementById('image2').addEventListener('change', setImage('collageImage2'));