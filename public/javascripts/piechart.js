var numOfyes = 0;
var numOfno = 0;
async function GetNumOfYesAndNo() {
    var response = await fetch('/numOfyes');
    if (response.ok) {
        var data = await response.json();
        numOfyes = parseInt(data);
        console.log('Number of Yes:' + numOfyes);
    } else {
        console.log(response.status + " " + response.statusCode);
    }

    var response = await fetch('/numOfno');
    if (response.ok) {
        var data = await response.json();
        numOfno = parseInt(data);
        console.log('Number of No:' + numOfno);
    } else {
        console.log(response.status + " " + response.statusCode);
    }
}
function pieChart() {
    GetNumOfYesAndNo().then(r => {
        piedata = {
            labels: [
                'Yes',
                'No',
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                ],
                hoverOffset: 2
            }]
        };
        piedata.datasets[0].data[0] = numOfyes;
        piedata.datasets[0].data[1] = numOfno;
        const config = {
            type: 'doughnut',
            data: piedata,
        };
        var pieChart = new Chart(
            document.getElementById('pieChart'),
            config
        );
    });
}
