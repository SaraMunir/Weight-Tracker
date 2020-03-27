const mysql = require("mysql");

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

var db;
if(process.env.JAWSDB_URL){
    db = new Database(process.env.JAWSDB_URL);
    console.log('jaws db is connected');
}else{
        db = new Database({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "1234", //change 
        database: "weight_tracker"
    });
};


async function registrationSql(myPost){
    console.log(myPost);
    const postUserLogin = await db.query( 
        "INSERT INTO login_credential(my_name,username,user_password) VALUES(?,?,?)",
        [ myPost.my_name, myPost.userName, myPost.user_password]);

    const storeUsersName = await db.query("INSERT INTO personal_info(my_name, username) VALUES(?,?)", [myPost.my_name, myPost.userName]);
    return postUserLogin, storeUsersName;
}

async function loginUser( email, password ) {
    let userFetch = await db.query('SELECT * FROM login_credential WHERE username=?', [ email ] );
    userFetch = JSON.stringify(userFetch); 
    userFetch = JSON.parse(userFetch); 
    console.log( `[loadUser] email='${email}' userFetch:`, userFetch );

    if( !userFetch ) {
        return false;
    }
    return userFetch[0]
}


async function postUsersWeight(myPost){
    console.log(myPost);
    const postUserWeight = await db.query( 
        "INSERT INTO weights_data(weight, myId, date) VALUES(?,?,?);",
        [ myPost.weight, myPost.userId, myPost.date]);
    return postUserWeight;
}


async function  getUserWeight( userId ){
    const userWeight = await db.query( 
        "SELECT * FROM weights_data WHERE myId = ? ORDER BY date ASC;",
        [ userId ] );
        // console.log(` in orm the of userWeight ` + userWeight);
    return userWeight;
}


module.exports = {
    registrationSql,
    loginUser,
    postUsersWeight,
    getUserWeight
}