const express = require("express");
const cors    = require("cors");
// const bodyparser  = require("body-parser")
const mysql2   = require("mysql2");
const colors  = require("colors");
const conexion = require("./bbdd");
const app = express();

                                //VAR GLOBAL 
app.set('port',  3000)
                        
                                //middleware
app.use(cors());
//app.use(bodyparser.urlencoded({extended:false}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


/*---------------        ------------ MUESTRO TODA LA TABLA------------         ------------------- */

app.get('/', (req,res)=>{                                                     

    // const conexion = mysql2.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Caloan890///890',
    //     database: 'dexter',
    //     //port: 3306
    // });

    // conexion.connect((error)=>{
    //     if(error) { 
    //         console.log("No se a podido conectar con la bd".red)
    //         throw error;
    //     }
    //     else { console.log("Conexion a la bd exitosa".green) }  
    //  })
//PASE LA CONEXION A LA BACE EN UN DOC APARTE Y LO IMPORTE. es importante q dejes la conexion abierta, sino no funciona.

    conexion.query('SELECT * from empleados', function (error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: '.blue, results);
        res.json( results );
      });
   
    //conexion.end();
})

 /*---------------        ------------ MUESTRO PARTE DE LA TABLA------------         ------------------- */
// app.get('/:id', (req,res)=>{                                                      
    
//     const conexion = mysql2.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'Caloan890///890',
//         database: 'dexter',
//         //port: 3306
//     }); 
//     conexion.connect();
         
//     let empleado_id = req.params.id || 6; let busca_apellido = "merlo";
//     //console.log(req.params.id)

//     let consulta = [`update empleados set apellido = "${busca_apellido}" where id = ${empleado_id};`,
//                     `SELECT * from empleados where id = ${empleado_id}`
//                 ]
//     conexion.query(consulta[1], (error, results, fields) =>{
//         if (error) throw error;
//         //console.log( results );     //set sql_safe_updates=0;
//         res.json( results );
//     })
    
//     conexion.end();
    
// })

 /*---------------        ------------ CARGO EMPLEADO------------         ------------------- */
 app.post('/add', (req, res)=>{                                                      
    // const conexion = mysql2.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Caloan890///890',
    //     database: 'dexter',
    //     //port: 3306
    // }); 
    //  conexion.connect();
//PASE LA CONEXION A LA BACE EN UN DOC APARTE Y LO IMPORTE. es importante q dejes la conexion abierta, sino no funciona.
//SI QUERES PONER LA CONECCION EN CADA BLOQUE DE CODIGO DESPUES CERRALA. CASO CONTRARO DEJALA ABIERTA.
 
    let _valor1 = req.body._nombre; let _valor2 = req.body._apellido; 
    let _valor3 = req.body._email;

    //console.log( _valor1.red, _valor2.red, _valor3.red )

    let consulta = [`INSERT INTO empleados (nombre,apellido,email) VALUES("${_valor1}","${_valor2}","${_valor3}");`]

    conexion.query(consulta[0], (error, results, fields) =>{
        if (error) throw error;
        //console.log( results );     //set sql_safe_updates=0;
        res.json( results );
    })
    
    //conexion.end();
    
})

/*---------------        ------------ ELIMINO EMPLEADO------------         ------------------- */
app.delete('/:id', (req, res, next)=>{
    // const conexion = mysql2.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Caloan890///890',
    //     database: 'dexter',
    //     //port: 3306
    // }); 
    // conexion.connect();

    //console.log(req.params.id)
    
    let consulta = [`delete from empleados where id = ${req.params.id};`];

    conexion.query( consulta[0], (error, results, fields)=>{
        if (error) throw error;
        //console.log( results );     
        res.json( results );
    } )
    // next(); 
    // conexion.end(); res.end()
})
/*---------------        ------------ MODIFICO EMPLEADO------------         ------------------- */
app.put('/:id', (req, res, next)=>{
    // const conexion = mysql2.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Caloan890///890',
    //     database: 'dexter',
    //     //port: 3306
    // }); 
    // conexion.connect();

    //console.log(req.params.id.blue)
    let consulta = [                                                    
        `update empleados set nombre = "${req.body._nombre}", apellido = "${req.body._apellido}", email = "${req.body._email}"
        where id = ${req.params.id};`
                ]
    conexion.query(consulta[0], (error, results, fields) =>{
        if (error) throw error;
        console.log( results );     //set sql_safe_updates=0;
        res.json( results );
    })
    
    // conexion.end();
})

app.listen(app.get('port'), () => { console.log(`EXPRESS puerto ${app.get('port')}`.yellow) })