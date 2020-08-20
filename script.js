function createCanvas(canvasID, width, height) {
    var canvas = document.createElement("canvas");
    canvas.id = canvasID;
    canvas.width = width;
    canvas.height = height;
    console.log(canvas)
    document.body.insertBefore(canvas, document.getElementById("canvasDiv"));
}

function createChart() {
    try {
        var oldChart = document.getElementById("chartx");
        oldChart.remove()
    } catch(e) {;
        console.log(e)
    }

    var country = document.getElementById("country").value;
    var country2 = document.getElementById("country2").value;

    fetch("https://pomber.github.io/covid19/timeseries.json")
        .then((response) => response.json())
        .then((data) => {
            createCanvas("chartx", 400, 600);

            var ctx = document.getElementById("chartx").getContext('2d');
            var datesData = [];
            var casesData = [];

            for (var i = 0; i < data[country].length; i++) {
                datesData.push(data[country][i].date);
                casesData.push(data[country][i].confirmed);
            }

            var casesData2 = [];

            for (var j = 0; j < data[country2].length; j++) {
                casesData2.push(data[country2][j].confirmed);
            }

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: datesData,
                    datasets: [{
                        data: casesData,
                        label: country + " Cases",
                        borderColor: "#4af0e5",
                        fill: false
                    },
                    {
                        data: casesData2,
                        label: country2 + " Cases",
                        borderColor: "#ff0000",
                        fill: false
                    }
                ]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })

            console.log(datesData);
            console.log(casesData);
        });
}
