$(document).ready( async function(){
    let userData = localStorage.getItem("myUser");
    userData = JSON.parse(userData);
    console.log(userData.userName);
    const userName = userData.userName;
    const userId= userData.userId
    //printing current date

    printChart(userId);

})
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
        console.log('day: ', day)
        console.log('date: ', date)
        console.log('weight: ', weight)
        console.log('datePosted: ', datePosted)
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
