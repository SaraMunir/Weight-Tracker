var today = new Date();
console.log(today);


let userData = localStorage.getItem("myUser");
    userData = JSON.parse(userData);
console.log(userData.userName);
const userName = userData.userName;
const userId= userData.userId
$(document).ready( async function(){
    
    //printing current date
    currentDate = moment(today).format('MMMM Do YYYY');
    currentDay = moment(today).format('dddd'); ;
    console.log('currentDate is',currentDate);
    $('#currentDate').html(currentDay +', ' + currentDate);
    
    updateChart(userId);
    
})
async function updateChart(userId){
    
    var something = {
        animationEnabled: true,
        title:{
            text: "Weight graph"
        },
        axisX:{
            valueFormatString: "DD MMM"
        },
        axisY: {
            title: "Weight Range",
            includeZero: false,
            scaleBreaks: {
            autoCalculate: true
            }
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "line",
            name: "sara",
            xValueFormatString: "DD MMM",
            color: "#aa2d55",
            axisYIndex: 0,
            showInLegend: true,
            dataPoints: [
            ]
        },
        {
            type: "line",
            name: "Order",
            color: "orange",
            axisYIndex: 0,
            showInLegend: true,
            dataPoints: [
                { x: new Date(2020, 02, 13), y: 515.8 },
                { x: new Date(2020, 02, 14), y: 518.6 },
                { x: new Date(2020, 02, 15), y: 534.6 },
                { x: new Date(2020, 02, 16), y: 537.7 },
                { x: new Date(2020, 02, 17), y: 524.7 },
                { x: new Date(2020, 02, 18), y: 535.9 },
                { x: new Date(2020, 02, 19), y: 528.8 },
                { x: new Date(2020, 02, 20), y: 538.1 },
                { x: new Date(2020, 02, 21), y: 538.1 },
                { x: new Date(2020, 02, 22), y: 538.1 },
                { x: new Date(2020, 02, 23), y: 538.1 },
                { x: new Date(2020, 02, 24), y: 542.4 }
            ]
        }]
    };
        var chart = new CanvasJS.Chart("chartContainer", something);
    
        console.log(something.data[0].dataPoints);
        var dataWeights = something.data[0].dataPoints;
        var dataAdding = something.data;
        dataAdding.push({
            type: "line",
            name: "samira",
            color: "green",
            axisYIndex: 0,
            showInLegend: true,
            dataPoints: [
                { x: new Date(2020, 02, 13), y: 415.8 },
                { x: new Date(2020, 02, 14), y: 318.6 },
                { x: new Date(2020, 02, 15), y: 434.6 },
                { x: new Date(2020, 02, 16), y: 437.7 },
                { x: new Date(2020, 02, 17), y: 424.7 },
                { x: new Date(2020, 02, 18), y: 435.9 },
                { x: new Date(2020, 02, 19), y: 428.8 },
                { x: new Date(2020, 02, 20), y: 438.1 },
                { x: new Date(2020, 02, 21), y: 438.1 },
                { x: new Date(2020, 02, 22), y: 438.1 },
                { x: new Date(2020, 02, 23), y: 438.1 },
                { x: new Date(2020, 02, 24), y: 442.4 }
            ]
        });
        // const weightList = [450, 550, 600, 300, 600, 489, 245, 1200]
        const highestMarker = {
            indexLabel: "\u2191 highest",
            markerColor: "#aa2d55", 
            markerType: "triangle"
        }
        const lowestMarker = {
            indexLabel: "\u2193 lowest",
            markerColor: "DarkSlateGrey", 
            markerType: "cross"
        }

        const weightList = [
            // { x: new Date(2020, 2, 01), y: 610 },
            // { x: new Date(2020, 2, 18), y: 612 },
            // { x: new Date(2020, 2, 19), y: 609 },
            // { x: new Date(2020, 2, 20), y: 611.5},
            // { x: new Date(2020, 2, 21), y: 610.5},
            // { x: new Date(2020, 2, 22), y: 608 },
            // { x: new Date(2020, 2, 23), y: 611 },
            // { x: new Date(), y: 555}
        ];
        const getWeightsData = await $.get(`/api/getWeightsData/${userId}`);
        console.log('users weights are: ',getWeightsData);
        getWeightsData.forEach((weights) => {

            // var x = moment(weights.date).format('L');
            // console.log('x', x)
            // var res = x.split("/");
            // console.log('res', res)
            // var year = res[2];
            // var month = res[0];
            // var day = res[1];
            // console.log(`Y: ${year}, M: ${month}, D:${day}`)
            // var datesSS = new Date(year, month, day)
            // console.log('datesSS', datesSS)

            var dates = new Date(weights.date)
            const weightObj = { x: dates, y: weights.weight};
            weightList.push(weightObj)
        } )
        console.log('new weightList is: ',weightList);
        const array1 = [];
        weightList.forEach( function(weights){
            console.log('weights y is: ', weights.y);
            dataWeights.push(weights);
            // array1.push(weights.y);
            
        })
        // console.log(Math.max(...array1));
        // heighestWeight = Math.max(...array1);
    
    
        // dontknow.push(weightList1[0])
    
        // dontknow.forEach(function(y){
        //     console.log(y)
        // })
    
    chart.render();

};
function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}

function showForm(){
    console.log('something?')
    $( "#formInput" ).slideDown( 500 );
    // $('html, body').animate({
        //   scrollTop: $("#dietCard").offset().top
        // }, 1500);
}
async function logWgtBtn(){
    let userData = localStorage.getItem("myUser");
        userData = JSON.parse(userData);
    console.log(userData.userName);
    const userName = userData.userName;
    const userId= userData.userId
    const loggedWeight = $( "#myWeight" ).val();
    console.log('the logged day ', today);
    
    const date = today.toJSON().slice(0, 19).replace('T', ' ');
    const userInfo = {
        userName: userName,
        userId: userId,
        weight: loggedWeight,
        date: date
    }
    console.log('loggedWeight is',userInfo);
    const postWeight = await $.post( '/api/postWeight', userInfo );
    
    alert(`${postWeight.message}`)
    $("#myWeight").empty()
    $( "#formInput" ).hide();
    updateChart(userId);

}
function closeMenu(){
    $( ".menu" ).hide( 500 );
}
function showMenu(){
    $( ".menu" ).show( 500 );
}
function logOut(){
    localStorage.clear();
    location.href = '/login.html';
}

var x = 0;
function leftDay(){
    x+=1;
    console.log("y and x is ",y, x)

    // var date = new Date();
    today.setDate(today.getDate() - x);

    // $('#currentDate').empty();
    console.log('prev is ',today)
    currentDay = moment(today).format('dddd'); 
    currentDate = moment(today).format('MMMM Do YYYY');
    console.log('something',currentDay)
    $('#currentDate').html(currentDate);
    $('#dayName').html(currentDay);
    
    y=0;
    x=0;

}
var y = 0;

function rightDay(){
    var currentDay = new Date();
    if(today < currentDay){
        y+=1;
        console.log("y and x is ",y, x)
        
        today.setDate(today.getDate() + y);
        console.log('prev is ',today)
        currentDay = moment(today).format('dddd'); 
        currentDate = moment(today).format('MMMM Do YYYY');
        console.log('something',currentDay)
        $('#currentDate').html(currentDate);
        $('#dayName').html(currentDay);
        y=0;
        x=0;
    }
}