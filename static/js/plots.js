// example
fetch('/data')
    .then(response => response.json())
    .then(data => {
        const trace = {
            x: data.map(row => row[0]),
            y: data.map(row => row[1]),
            type: 'scatter',
        };
        const layout = {
            title: 'Data from SQLite Database',
            xaxis: {
                title: 'X-axis Label'
            },
            yaxis: {
                title: 'Y-axis Label'
            }
        };
        Plotly.newPlot('chart', [trace], layout);
    });