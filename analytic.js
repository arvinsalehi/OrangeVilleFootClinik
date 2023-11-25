
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Actuals',
            data: [40, 60, 70, 168, 120, 130, 110, 115, 130, 140, 150, 160],
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            borderColor: 'green',
            borderWidth: 2,
            fill: false
        }, {
            label: 'Forecast',
            data: [50, 65, 80, 100, 120, 140, 110, 120, 135, 145, 155, 165],
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderColor: 'blue',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
