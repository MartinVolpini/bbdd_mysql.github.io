const mysql2   = require("mysql2");

const conexion = mysql2.createConnection({
    //host: 'localhost',
    //user: 'root',
    //password: 'Caloan890///890',
    //database: 'dextercloud-00',
    //port: 3306
    database: 'dextercloud-00',
    user: '4ha2g0g6lssyl3hm59r6',
    host: 'aws-sa-east-1.connect.psdb.cloud',
    password: 'pscale_pw_TBg4vxOrNBg9P1H5g53JAV1BGabcOTQorQBuFvekTHh',
	ssl: { rejectUnauthorized: false }
});



conexion.connect((error)=>{
    if(error) { 
        console.log("No se a podido conectar con la bd".red)
        throw error;
    }
    else { console.log("Conexion a la bd exitosa".green) }
 })

 module.exports = conexion;