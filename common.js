function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
        disableDefaultUI: true,
        zoom:10,
        center: new google.maps.LatLng(41.850033, -87.6500523)
    }
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);

    return {
        directionsService,
        directionsDisplay,
        map
    }
}


function initAutocompletes(classname, callbackPlaceChanged) {
    return [ ...document.getElementsByClassName(classname) ].map(el => {
        const autocomplete = new google.maps.places.Autocomplete(
            el,
            {
            types: ['geocode']
            }
        );
        autocomplete.addListener('place_changed', callbackPlaceChanged);
        el.addEventListener('change',
            (x) => {
                if(x.target.value) {
                    return;
                }
                autocomplete.set('place',null);
            }
        );
        return autocomplete;
    });
}

function renderRoute(map) {
    return function(){
        const routes = autocompletes
            .map(x => x.getPlace())
            .filter(x => x)
            .map(x => { return {'placeId': x.place_id }});

        if(routes.length < 2) {
            return;
        }

        var start = routes.shift();
        var end = routes.pop();

        var request = {
            origin: start,
            destination: end,
            waypoints: routes.map(x => {
                return {
                    location: x,
                    stopover: true
                }
            }),
            travelMode: 'WALKING'
        };

        map.directionsService.route(request, function(result, status) {
            if (status == 'OK') {
                map.directionsDisplay.setDirections(result);
            }
        });
    }
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        document.body.classList.toggle("show-menu");
    }
};