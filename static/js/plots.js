// Paris Test
fetch('/data')
    .then(response => response.json())
    .then(data => {

/*
        data.forEach(function(data) {
            if (data[0] == "Paris") {

                console.log(data)

            }
        })
*/
        ///*
        // Create a map object.
        let myMap = L.map("map", {
            center: [48.8566, 2.3522],
            zoom: 11
        });
        
        // Add a tile layer.
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);
        
        // Loop through the array.
        data.forEach(function(row) {
            if (row[0] == "Paris" && 
                row[1] == "weekday" && 
                row[4] == "Private room" && 
                row[7] > 2 && 
                row[8] == "t") {

                L.marker([row[21], row[20]]).bindPopup(`<h2>Rental City: ${row[0]}</h2><h3>Rental Price: $${row[3].toFixed(2)}</h3>`).addTo(myMap)
                
            }

        });
        //*/
        
    });// end of data fetch