// plots.js

// Wait for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from CSV file
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            // Create a map object.
            let myMap = L.map("map", {
                center: [45.4642, 9.1900],
                zoom: 5
            });

            // Add a tile layer with English labels only.
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
                language: 'en' // Specify the language for labels
            }).addTo(myMap);

            L.circle([52.36857095042522, 4.900577232906863]).bindPopup(`<h2>Amsterdam</h2>`).addTo(myMap);
            L.circle([38.7233, -9.1371]).bindPopup(`<h2>Lisbon</h2>`).addTo(myMap);
            L.circle([52.5226, 13.401]).bindPopup(`<h2>Berlin</h2>`).addTo(myMap);
            L.circle([41.3871, 2.1703]).bindPopup(`<h2>Barcelona</h2>`).addTo(myMap);
            L.circle([37.98122394428812, 23.734047028545326]).bindPopup(`<h2>Athens</h2>`).addTo(myMap);
            L.circle([51.50658904579564, -0.1265604393151295]).bindPopup(`<h2>London</h2>`).addTo(myMap);
            L.circle([41.8966659495316, 12.48105435763796]).bindPopup(`<h2>Rome</h2>`).addTo(myMap);
            L.circle([48.207775815017676, 16.37129928548204]).bindPopup(`<h2>Vienna</h2>`).addTo(myMap);
            L.circle([48.8566, 2.3522]).bindPopup(`<h2>Paris</h2>`).addTo(myMap);
            L.circle([47.49640911675406, 19.052025412029728]).bindPopup(`<h2>Budapest</h2>`).addTo(myMap);
            
            function onButtonClick() {
                // Loop through the array.
                // Create arrays to store data for scatter plot
                
                data.forEach(function(row) {
                    
                    // conditionals applied from drop-down menu
                    if (row[0] == document.getElementById("city").value && // city
                        row[1] == document.getElementById("rental_period").value && // rental_period
                        row[4] == document.getElementById("room_type").value && // room_type
                        row[7] == document.getElementById("person_capacity").value && // person_capacity
                        row[8] == document.getElementById("host_is_superhost").value) // super-host
                    {
                        L.marker([row[21], row[20]]).bindPopup(`<h2>Rental City: ${row[0]}</h2><h3>Rental Price: &euro;${row[3].toFixed(2)}</h3>`).addTo(myMap);
                        // Create arrays to store data for scatter plot
                        let rentalPrices = [];
                        let distances = [];

                        // Extract rental price and distance data from CSV data
                        data.forEach(row => {
                        if (row[0] == document.getElementById("city").value && // city
                            row[1] == document.getElementById("rental_period").value && // rental_period
                            row[4] == document.getElementById("room_type").value && // room_type
                            row[7] == document.getElementById("person_capacity").value && // person_capacity
                            row[8] == document.getElementById("host_is_superhost").value) // super-host
                          { 
                            rentalPrices.push(row[3]);
                            distances.push(row[15]);}
                        });

                        // Get canvas element to render the scatter plot
                        var ctx = document.getElementById('myChart').getContext('2d');

                        // Create scatter chart
                        let scatterChart = new Chart(ctx, {
                            type: 'scatter',
                            data: {
                                datasets: [{
                                    label: 'Rental Price vs Distance',
                                    data: rentalPrices.map((value, index) => ({ x: value, y: distances[index] })),
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)', // Customize the color of the points
                                }]
                            },
                            options: {
                                 // Set the desired width and height of the chart
                                maintainAspectRatio: false, // Disable aspect ratio for manual width and height control
                                responsive: false, // Disable responsiveness
                                width: 2500,
                                height: 800,
                                scales: {
                                    x: {
                                        type: 'linear',
                                        position: 'bottom',
                                        title: {
                                            display: true,
                                            text: 'Rental Price'
                                        }
                                    },
                                    y: {
                                        type: 'linear',
                                        position: 'left',
                                        title: {
                                            display: true,
                                            text: 'Distance'
                                        }
                                    }
                                }
                            }
                        });
                    }
                myMap.setView(changeMap(document.getElementById("city").value), 10)
                });

            // myMap.setView(changeMap(document.getElementById("city").value), 10)
            } // end of onButtonClick

            function clearMarkers() {
                myMap.eachLayer(function(layer) {
                    if (layer instanceof L.Marker) {
                        myMap.removeLayer(layer);
                    }
                });
            }

            function clearConditionals() {
                // Clear or reset the dropdown menus to their default values
                document.getElementById("city").value = ""; // Replace "" with the default value for city dropdown
                document.getElementById("rental_period").value = ""; // Replace "" with the default value for rental_period dropdown
                document.getElementById("room_type").value = ""; // Replace "" with the default value for room_type dropdown
                document.getElementById("host_is_superhost").value = ""; // Replace "" with the default value for host_is_superhost dropdown
                document.getElementById("person_capacity").value = ""; // Replace "" with the default value for person_capacity dropdown
                myMap.setView(new L.LatLng(45.4642, 9.1900), 5)
                // Remove all markers from the map
                clearMarkers();
            }

            function changeMap(city){
                if (city == 'Amsterdam') {
                    return  (new L.LatLng(52.47357811863962, 5.013054787903982))
                        }
                    else if (city == 'Athens') {
                        return  (new L.LatLng(37.98122394428812, 23.734047028545326))
                        }
                    else if (city == 'Barcelona') {
                        return  (new L.LatLng(41.38713904783096, 2.1703350990459405))
                    }   
                    else if (city == 'Berlin') {
                        return  (new L.LatLng(52.52268813158208, 13.401958119217134))
                    }   
                    else if (city == 'Budapest') {
                        return  (new L.LatLng(47.624155538447845, 18.85045239184864))
                    }   
                    else if (city == 'Lisbon') {
                        return  (new L.LatLng(38.72335413778281, -9.137145621842837))
                    }   
                    else if (city == 'London') {
                        return  (new L.LatLng(51.5072, 0.1276))
                    }   
                    else if (city == 'Paris') {
                        return  (new L.LatLng(48.8566,2.3522))
                    }   
                    else if (city == 'Rome') {
                        return  (new L.LatLng(41.8966659495316, 12.48105435763796))
                    }   
                    else if (city == 'Vienna') {
                        return  (new L.LatLng(48.279458421240086, 16.394877910070342))
                      };
        
                }



            const button = document.querySelector('button');
            button.addEventListener('click', onButtonClick);

            const clearButton = document.getElementById('clearButton');
            clearButton.addEventListener('click', clearConditionals);
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        function removeData(chart) {
            chart.data.labels.pop();
            chart.data.datasets.forEach((data) => {
                data.data.pop();
            });
            chart.update();
        }
});
