var btn = $('div.main a.btn');
var long;
var lat;
var destLat; 
var destLng;

function displayVars(d,l){
  //console.log (long + " " + lat + " " + destLat +  " " + destLng);
  console.log("works");
  alert(d+ " " +l);
  
}

btn.click(function(elem) {
 
    
    var RefugeAPI = "https://www.refugerestrooms.org/api/v1/restrooms/by_location.json?page=10&per_page=20&offset=100&ada=1&unisex=1";


    if (navigator.geolocation) {
        // Can use geolocation, proceed with getting the location
     navigator.geolocation.getCurrentPosition(savePosition, positionError);

    } else {
        // Can't use geolocation, we should tell the user
        $('div.main').prepend('<p class="error">Your browser doesn\'t support geolocation. Try upgrading to a newer browser like <a href="https://chrome.google.com/" target="_blank">Google Chrome</a></p>');
    }
    function savePosition(position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
      
        $.getJSON(RefugeAPI, {
                lat: lat,
                lng: long,
            })
            .done(function(data) {
        
          //alert("end of function");
         // displayVars(data[i].latitude, data[i].longitude);
                //console.log(data);
                //console.log(data[0].city);
                for (var i = 0; i < data.length; i++) {

                    var section = document.createElement("section")
                    section.innerHTML = 'City: ' + data[i].city + "<br>" + ' Street:' + data[i].street  + 'Lat:' + data[i].latitude + 'Lng:' + data[i].longitude +"<p>";
                    document.getElementById('output').appendChild(section);
         

                }//end of loop
          destLat =  data[0].latitude;
          destLng =data[0].longitude;
                 
       //displayVars(data[i].latitude, data[i].longitude);
          displayVars(destLat, destLng);
            });//end done function
        var longitude = $('#longitude');
        var latitude = $('#latitude');
        longitude.text(long);
        latitude.text(lat);
      

    }


    function positionError() {
        $('div.main').prepend('<p class="error"><strong>Sorry!</strong> There was an error getting your location.</p>');
    }
});