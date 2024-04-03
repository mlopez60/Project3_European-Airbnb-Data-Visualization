// Paris Test
fetch('/data')
    .then(response => response.json())
    .then(data => {

        // Create a map object.
        let myMap = L.map("map", {
            center: [48.8566, 2.3522],
            zoom: 12
            });

        // Add a tile layer.
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);
        
        
        function onButtonClick() {

            // Loop through the array.
            data.forEach(function(row) {

                // conditionals applied from drop-down menu
                if (row[0] == document.getElementById("city") && // city
                    row[1] == document.getElementById("rental_period") && // rental_period
                    row[4] == document.getElementById("room_type") && // room_type
                    row[7] == document.getElementById("host_is_superhost") && // person_capacity
                    row[8] == document.getElementById("person_capacity")) // super-host
                {
    
                    L.marker([row[21], row[20]]).bindPopup(`<h2>Rental City: ${row[0]}</h2><h3>Rental Price: $${row[3].toFixed(2)}</h3>`).addTo(myMap)
                    
                }

          })

        } // end of button

        const button = document.querySelector('button');
        button.addEventListener('click', onButtonClick);
        //*/
        
    });// end of data fetch