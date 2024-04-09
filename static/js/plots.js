// Define scatterChart & barChart variables outside of the event listener functions to make it accessible globally
let scatterChart;
let barChart;

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

            L.circle([52.36857095042522, 4.900577232906863], { radius: 10000 }).bindPopup(`<h2>Amsterdam</h2>`).addTo(myMap);
            L.circle([38.7233, -9.1371], { radius: 10000 }).bindPopup(`<h2>Lisbon</h2>`).addTo(myMap);
            L.circle([52.5226, 13.401], { radius: 10000 }).bindPopup(`<h2>Berlin</h2>`).addTo(myMap);
            L.circle([41.3871, 2.1703], { radius: 10000 }).bindPopup(`<h2>Barcelona</h2>`).addTo(myMap);
            L.circle([37.98122394428812, 23.734047028545326], { radius: 10000 }).bindPopup(`<h2>Athens</h2>`).addTo(myMap);
            L.circle([51.50658904579564, -0.1265604393151295], { radius: 10000 }).bindPopup(`<h2>London</h2>`).addTo(myMap);
            L.circle([41.8966659495316, 12.48105435763796], { radius: 10000 }).bindPopup(`<h2>Rome</h2>`).addTo(myMap);
            L.circle([48.207775815017676, 16.37129928548204], { radius: 10000 }).bindPopup(`<h2>Vienna</h2>`).addTo(myMap);
            L.circle([48.8566, 2.3522], { radius: 10000 }).bindPopup(`<h2>Paris</h2>`).addTo(myMap);
            L.circle([47.49640911675406, 19.052025412029728], { radius: 10000 }).bindPopup(`<h2>Budapest</h2>`).addTo(myMap);
            L.circle([52.36857095042522, 4.900577232906863], {color: 'red'}).bindPopup(`<h2>Amsterdam</h2>`).addTo(myMap);
            L.circle([38.7233, -9.1371], {color: 'red'}).bindPopup(`<h2>Lisbon</h2>`).addTo(myMap);
            L.circle([52.5226, 13.401], {color: 'red'}).bindPopup(`<h2>Berlin</h2>`).addTo(myMap);
            L.circle([41.3871, 2.1703], {color: 'red'}).bindPopup(`<h2>Barcelona</h2>`).addTo(myMap);
            L.circle([37.98122394428812, 23.734047028545326], {color: 'red'}).bindPopup(`<h2>Athens</h2>`).addTo(myMap);
            L.circle([51.50658904579564, -0.1265604393151295], {color: 'red'}).bindPopup(`<h2>London</h2>`).addTo(myMap);
            L.circle([41.8966659495316, 12.48105435763796], {color: 'red'}).bindPopup(`<h2>Rome</h2>`).addTo(myMap);
            L.circle([48.207775815017676, 16.37129928548204], {color: 'red'}).bindPopup(`<h2>Vienna</h2>`).addTo(myMap);
            L.circle([48.8566, 2.3522], {color: 'red'}).bindPopup(`<h2>Paris</h2>`).addTo(myMap);
            L.circle([47.49640911675406, 19.052025412029728], {color: 'red'}).bindPopup(`<h2>Budapest</h2>`).addTo(myMap);

            // Predefine the bins for the x-axis
            const binLabels = ['75 - 80', '81 - 85', '86 - 90', '91 - 93', '94 - 96', '97 - 99', '100'];

            // Create bar chart - Rental Price vs Guest Rating
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            ctx2.canvas.width = 500;
            ctx2.canvas.height = 300;
            barChart = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: binLabels, // Specify the bin labels for the x-axis
                    datasets: [{
                        label: 'Guest Satisfaction Ratings',
                        data: new Array(binLabels.length).fill(0), // Initialize counts for each bin
                        backgroundColor: 'rgba(0, 0, 128, 0.8)', // Customize the color of the bars, old color -> (255, 99, 132, 0.5)
                    }] 
                },
                options: {
                    // Set the desired width and height of the chart
                    maintainAspectRatio: false, // Disable aspect ratio for manual width and height control
                    responsive: false, // Disable responsiveness
                    scales: {
                        x: {
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Guest Rating Bins'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Count'
                            }
                        }
                    }
                }
            });


            // Create scatter plot chart - Rental Price vs Distance to City Center
            var ctx = document.getElementById('myChart').getContext('2d');
            ctx.canvas.width = 500;
            ctx.canvas.height = 300;
            scatterChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Rental Price vs Distance to City Center',
                        data: [], // Initially empty data
                        backgroundColor: 'rgba(0, 0, 128, 0.8)', // Customize the color of the points
                    }]
                },
                options: {
                    // Set the desired width and height of the chart
                    maintainAspectRatio: false, // Disable aspect ratio for manual width and height control
                    responsive: false, // Disable responsiveness
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Distance (meters)'
                            }
                        },
                        y: {
                            type: 'linear',
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Rental Prices (for two nights)'
                            }
                        }
                    }
                }
            });
            

            function onButtonClick() {
                // Clear previous graph data
                scatterChart.data.datasets[0].data = [];
                barChart.data.datasets[0].data = [];

                // Define the bins and their ranges
                const bins = [
                    { range: [75, 80], count: 0 },
                    { range: [81, 85], count: 0 },
                    { range: [86, 90], count: 0 },
                    { range: [91, 93], count: 0 },
                    { range: [94, 96], count: 0 },
                    { range: [97, 99], count: 0 },
                    { range: [100, 100], count: 0 }
                ];

                data.forEach(function(row) {

                    // conditionals applied from drop-down menu
                    if (row[0] == document.getElementById("city").value && // city
                        row[1] == document.getElementById("rental_period").value && // rental_period
                        row[4] == document.getElementById("room_type").value && // room_type
                        row[7] == document.getElementById("person_capacity").value && // person_capacity
                        row[8] == document.getElementById("host_is_superhost").value) // super-host
                    {
                        L.marker([row[21], row[20]]).bindPopup(`<h2>Rental City: ${row[0]}</h2><h3>Rental Price: &euro;${row[3].toFixed(2)}</h3>`).addTo(myMap);
                        // Add data to scatter plot
                        scatterChart.data.datasets[0].data.push({ x: row[15], y: row[3] });
                        
                        // Categorize the score into the appropriate bin
                        var score = row[12]; // Assuming row[12] contains the guest satisfaction score
                        for (var bin of bins) {
                            if (score >= bin.range[0] && score <= bin.range[1]) {
                                bin.count++; // Increment the count for the bin
                                break; // Break the loop once the score is categorized
                            }
                        }
                    }
                });

                // Extract counts from the bins and push them to the bar chart dataset
                var counts = bins.map(bin => bin.count);
                console.log("Counts:", counts);

                barChart.data.datasets[0].data = counts;

                scatterChart.update(); // Update the scatter plot
                barChart.update();
                myMap.setView(changeMap(document.getElementById("city").value), 12)
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
                // Clear scatter plot data
                scatterChart.data.datasets[0].data = [];
                scatterChart.update(); // Update the scatter plot
                // Clear bar chart data
                barChart.data.datasets[0].data = [];
                barChart.update(); // Update the scatter plot
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

            const button = document.querySelector('#button');
            button.addEventListener('click', onButtonClick);

            const clearButton = document.getElementById('clearButton');
            clearButton.addEventListener('click', clearConditionals);
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
