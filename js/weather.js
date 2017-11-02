//var xhr=new XMLHttpRequest();

//AIzaSyAKukIgWJd2Gk5OgyKJJMw32h6KRnzvJtk 

//xhr.open("get","https://www.where-am-i.net");
// https://api.darksky.net/forecast/e195f394d8c4e2cc9cd1e68eee4ed156/49.8407,24.0305");

//var url="https://api.darksky.net/forecast/e195f394d8c4e2cc9cd1e68eee4ed156/49.8407,24.0305";
//var r = createCORSRequest('GET', url);
// r.send();

// $.getJSON(r, function(forecast) {
// 	console.log(forecast);
// });

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		var lat = position.coords.latitude;
		var long = position.coords.longitude;

		var myRequest=new XMLHttpRequest();
		myRequest.open("get","https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyAKukIgWJd2Gk5OgyKJJMw32h6KRnzvJtk&sensor=true");
		myRequest.onload=function() {
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(lat, long);
			geocoder.geocode({'latLng': latlng}, function(results, status) {

				if (status==google.maps.GeocoderStatus.OK) {
					if (results[1]) {
						for (var i=0; i<results[0].address_components.length; i++) {
							for (var b=0;b<results[0].address_components[i].types.length;b++) {
								if (results[0].address_components[i].types[b] == "locality") {
									city= results[0].address_components[i];
									break;
								}
							}
						}

						$("#showData").html("Погода у моєму місті: "+ city.long_name);

					} else {
						alert("No results found");
					}
				} else {
					alert("Geocoder failed due to: " + status);
				}
			});
		};
		myRequest.send();

	});
}
