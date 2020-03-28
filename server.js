const express = require('express');
const orm = require('./orm');
const PORT = process.env.PORT || 8080;
const app = express();

//used for bcryption of password 
// const bcrypt = require ("bcrypt");
// const saltRounds = 10;
const bcrypt = require ("bcrypt");
const saltRounds = 10;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.post("/api/registration", async function(req, res){
    console.log(req.body);
    
    bcrypt.hash(req.body.user_password, saltRounds, function(err, hash){
    console.log(hash);
    orm.registrationSql({
        my_name:req.body.my_name,
        userName:req.body.userName,
        user_password:hash
    }).then ( function(data){
        console.log(hash);
        if (data){
        res.send({
            message: "Success!!!"
        })
        }
    });
    })
})




app.post("/api/postWeight", async function(req, res){
    console.log(req.body);
    const postWeight = await orm.postUsersWeight(req.body);
    res.send({message: "Weight has been successfully logged in!!"});
});


app.get("/api/getWeightsData/:id", async function(req, res){
        console.log( `[/api/getWeightsData/] recieved: `, req.params.id );
        const usersWeight = await orm.getUserWeight(req.params.id);
        console.log(usersWeight)
        res.send(usersWeight);
    
    });

//checks the validation of user - if they exist in db or not
app.post("/api/checkuser", async function(req, res){
    console.log(req.body)
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    const userData = await orm.loginUser(userEmail, userPassword);
    console.log(userData)
    
    if(!userData){
    res.send( { error: 'Sorry unknown user or wrong password' } );
    }
    res.send(userData);
});


app.post("/api/getWeightforThatDay", async function(req, res){
        // console.log( `[/api/getWeightsData/] recieved: `, req.params.id );
        const usersWeightThatDay = await orm.getUserWeightThatDay((req.body));
        console.log('in server file the received weight is ',usersWeightThatDay)
        // res.send(usersWeightThatDay);

        if(!usersWeightThatDay){
            res.send( { weight: '' } );
            }
            res.send(usersWeightThatDay);
                
    });








app.listen(PORT, function () {
    console.log(`[fitness_app] RUNNING, http://localhost:${PORT}`);
    });