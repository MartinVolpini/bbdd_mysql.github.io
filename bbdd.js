const mysql2   = require("mysql2");

const conexion = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Caloan890///890',
    database: 'dexter',
    //port: 3306
});

conexion.connect((error)=>{
    if(error) { 
        console.log("No se a podido conectar con la bd".red)
        throw error;
    }
    else { console.log("Conexion a la bd exitosa".green) }
 })

 module.exports = conexion;