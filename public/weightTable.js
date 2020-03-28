var days = [];
let myDatesArray= [];
let userData = localStorage.getItem("myUser");
    userData = JSON.parse(userData);
    console.log(userData.userName);
    const userName = userData.userName;
    const userId= userData.userId
$(document).ready( async function(){

    //printing current date

    printCalendar()

    printChart(userId);
    var today = new Date();
    console.log(today);
    today= moment(today).format('l');
    var todayArray = today.split("/");
    const currentYear = todayArray[2];
    var currentMonth = todayArray[0]
    currentMonth = parseInt(currentMonth)
    // console.log('currentYear', currentYear);
    // console.log('currentMonth', currentMonth);
    //trying to get all the dates 
        // var data = [20, 18, 15, 10, 9];
        // var found = data.find(function(element) {
        // return element < 12;
        // });

})

function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
        }
    return days;
    }
async function printCalendar(){
    getDaysInMonth(2, 2020);
    console.log('days: ', days)
    $('.monthDays').html('')
    days.forEach( async function(dates){
        const dayNums = moment(dates).format('L');
        var dayNum = dayNums.split("/");
        const dayName = moment(dates).format('llll')
        var dayNameS = dayName.split(", ");

        var weightDateObj = {
            date: dayNums, 
            userId: userId
        }

        const getWeightforThatDay= await $.post(`/api/getWeightforThatDay`, weightDateObj);
        console.log('isit here? ', getWeightforThatDay)
        var weight = getWeightforThatDay.weight

        // const dayName = moment(dates).format('dddd');
        // console.log( `dayNum: ${dayNum[1]} and dayName: ${dayName}`)
        if (weight == ""){

            $('.monthDays').append(
                `
                <div class="daysBox">
                    <div class="d-flex justify-content-around">
                        <h3 class ="dateFont">${dayNum[1]}</h3>
                        <h6>${dayNameS[0]}</h6>
                    </div>
                </div>
                `
            )
        }
        else {
            $('.monthDays').append(
                `
                <div class="daysBox">
                    <div class="d-flex justify-content-around">
                        <h3 class ="dateFont">${dayNum[1]}</h3>
                        <h6>${dayNameS[0]}</h6>
                    </div>
                    <p>${weight}</p>
                </div>
                `
            )
        }
        // const dates1 = dates.toJSON().slice(0, 19).replace('T', ' ');
        // let dateObj = {
        //     dayNum : dayNums, 
        //     dayName : dayNameS[0], 
        //     weight : weight, 
        //     dateId: dates1
        // }
        // myDatesArray.push(dateObj);
    })
    // console.log('myDatesArray is : ', myDatesArray)
}
async function printChart(userId){
    const getWeightsData = await $.get(`/api/getWeightsData/${userId}`);
    console.log('getWeightsData: ', getWeightsData)
    getWeightsData.forEach((weights) => {
        // id: 15
        // weight: 175
        // date: "2020-03-15 04:40:28"
        // createdAt: "2020-03-26T04:42:17.000Z"
        // myId: 1
        let weight = weights.weight;
        let datePosted = weights.date;
        let day = moment(datePosted).format('dddd');
        let date = moment(datePosted).format('l');;
        // console.log('day: ', day)
        // console.log('date: ', date)
        // console.log('weight: ', weight)
        // console.log('datePosted: ', datePosted)
    })
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
