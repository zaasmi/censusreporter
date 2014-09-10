function initialize_geocomplete() {
  // Create the autocomplete object, restricting the search
  // to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('geography-select')),
      { types: ['geocode'],
        componentRestrictions: {country: 'us'}
});
  // When the user selects an address from the dropdown,
  // populate the address fields in the form.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    if (autocomplete.getPlace() && autocomplete.getPlace().geometry) {
        var place = autocomplete.getPlace(), 
            loc = autocomplete.getPlace().geometry.location;
        var url  = '/locate/?lat=' + loc.lat() + '&lon=' + loc.lng() + '&address=' + place.formatted_address;
        for (var i = 0; i < place.types.length; i++) {
            url = url + "&type=" + place.types[i];
        }
        window.location = url;
    } else {
        console.log("There isn't a place/geometry.")        
    }
  });
}

initialize_geocomplete()