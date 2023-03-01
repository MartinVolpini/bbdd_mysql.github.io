
const express = require("express");
const cors    = require("cors");
// const bodyparser  = require("body-parser")
const mysql2   = require("mysql2");
const colors  = require("colors");
const conexion = require("../bbdd");
const app = express();

                                //VAR GLOBAL 
app.set('PORT',  3000)
                        
                                //middleware
app.use(cors());
//app.use(bodyparser.urlencoded({extended:false}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


/*---------------        ------------ MUESTRO TODA LA TABLA------------         ------------------- */

app.get('/', (req,res)=>{                                                     

    conexion.query('SELECT * from empleados', function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: '.blue, results);
        res.json( results );
      });
   
})


 /*---------------        -----BUSCO Y MUESTRO PARTE DE LA TABLA------------         ------------------- */
app.post('/buscar', (req,res)=>{                                                      
    
    conexion.connect();

    let _valor1 = req.body._nombre; let _valor2 = req.body._apellido; 
    let _valor3 = req.body._email;

    let a = 0; let b = 0; let c = 0;
    _valor1.length == 0 ? a = a + 1 : "";
    _valor2.length == 0 ? b = b + 1 : "";
    _valor3.length == 0 ? c = c + 1 : "";

    console.log(req.body, a, b, c)

    let consulta = [
        `select * from empleados 
        where nombre like "%${req.body._nombre}%" 
        and apellido like "%${req.body._apellido}%" 
        and email like "%${req.body._email}%";`,
                    `SELECT * from empleados where id = ${req.body._email}`
                ]
    conexion.query(consulta[0], (error, results, fields) =>{
        if (error) throw error;
        console.log( "Resultado:".blue, results[0]);     
        //set sql_safe_updates=0;
        res.json( results );
    })
    
    conexion.end();
    
})

 /*---------------        ------------ CARGO EMPLEADO------------         ------------------- */
 app.post('/add', (req, res)=>{                                                      
 
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
    //     //PORT: 3306
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

app.listen(app.get('PORT'), () => { console.log(`EXPRESS puerto ${app.get('PORT')}`.yellow) })
