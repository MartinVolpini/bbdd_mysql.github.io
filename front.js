"use strict";

const conteiner       = document.querySelector(".tecno-bd");
const btn__addUser    = document.getElementById("form--btn_id");

//funcion crea la bbdd en el DOM

let addobj = (arg0, arg1, arg2 ,arg3) => {  
       
    let div = document.createElement("DIV"); div.classList.add("row-bd"); 
    
    let id = document.createElement("DIV"); let id_cont = document.createTextNode(arg0); 
    id.appendChild(id_cont); id.classList.add("id");
    let text1 = document.createElement("DIV"); let text1_cont = document.createTextNode(arg1);
    text1.appendChild(text1_cont); text1.classList.add("bd_nombre");
    let text2 = document.createElement("DIV"); let text2_cont = document.createTextNode(arg2);
    text2.appendChild(text2_cont); text2.classList.add("bd_apellido");
    let email = document.createElement("DIV"); let email_cont = document.createTextNode(arg3);
    email.appendChild(email_cont); email.classList.add("bd_email");

    let btn_delete = document.createElement("IMG"); btn_delete.classList.add("btn_delete");
    btn_delete.src = "./img/tacho-3.png"; btn_delete.setAttribute("title","ELIMINAR USUARIO");
    let btn_editar = document.createElement("IMG"); btn_editar.classList.add("btn_editar");
    btn_editar.src = "./img/candado-cerrado.png"; btn_editar.setAttribute("title","EDITAR USUARIO")
    
    let btns = document.createElement("DIV"); btns.classList.add("btn_content");
    btns.appendChild(btn_delete); btns.appendChild(btn_editar);

    id.classList.add("item-bd"); text1.classList.add("item-bd");
    text2.classList.add("item-bd"); email.classList.add("item-bd");
    btns.classList.add("item-bd");

    //console.log(typeof div, text1.data)
    div.appendChild(id); div.appendChild(text1); div.appendChild(text2); 
    div.appendChild(email); div.appendChild(btns);

    /*  -----------  -----------   ---------ELIMINAR USUARIOS DE LA BASE-------------   ---------  ------------ -----------*/
    btn_delete.addEventListener("click",(e)=>{
        e.preventDefault()
        let id00  = e.currentTarget.parentElement; let id = id00.parentElement.children[0].textContent ;
        console.log("btn alcanzado"); console.log(id,typeof id); 
        let usuario = `https://bbddmysqlgithubio-production.up.railway.app/${id}`;
        
        fetch(usuario, { method: "DELETE" })
            .then(res=>res.text()) 
            .then(res=>{
                console.log(res)
                location.reload();
            })
    })

    /*---------------        ---------------EDITAR USUARIO   --------------         ------------    - */
    let interruptor = 0;  
    btn_editar.addEventListener("click",(e)=>{
        e.preventDefault();                                         
        let _nombre00 = e.currentTarget.parentElement;   let _nombre = _nombre00.parentElement.children[1];
        let _apellido00 = e.currentTarget.parentElement; let _apellido = _apellido00.parentElement.children[2];
        let _email00 = e.currentTarget.parentElement;    let _email = _email00.parentElement.children[3]; 
        //console.log(_nombre, _apellido, _email);
        if( interruptor == 0 ){                                     //console.log(interruptor)
            btn_editar.src = "./img/candado-abierto.png";
            interruptor++;
            _nombre.setAttribute("contenteditable",true);
            _apellido.setAttribute("contenteditable",true);
            _email.setAttribute("contenteditable",true);    
            //console.log(interruptor)
        }
        else if(interruptor == 1 ) {
            _nombre.setAttribute("contenteditable",false);
            _apellido.setAttribute("contenteditable",false);
            _email.setAttribute("contenteditable",false);
            setTimeout(() => { btn_editar.src = "./img/candado-listo.png"; },280)
            setTimeout(() => { btn_editar.src = "./img/candado-cerrado.png"; }, 3000);
            
            interruptor = 0;
            _nombre   = _nombre.textContent ; 
            _apellido = _apellido.textContent ;
            _email    = _email.textContent ;
            
            let id00  = e.currentTarget.parentElement; let id = id00.parentElement.children[0].textContent ;
            //console.log( id, _nombre, _apellido, _email)
            fetch(`https://bbddmysqlgithubio-production.up.railway.app/${id}`, { 
                method: "PUT", 
                body: JSON.stringify({
                        "_nombre": `${_nombre}`,
                        "_apellido": `${_apellido}`,
                        "_email": `${_email}`
                }),
                headers: {"Content-Type":"application/json"}
             })
            .then(res=>res.text()) 
            .then(res=>{
                console.log(res)
                //location.reload();
            })
        
        } 
        

    });
    
    /*  -----------  -----------   ----------------------   ---------  ------------ -----------*/
    return conteiner.appendChild(div);
}
/*  -----------  -----------   ---------LLAMO Y CARGO LOS DATOS DE TODA LA BASE-------------         ------------ -----------*/

    fetch(`https://bbddmysqlgithubio-production.up.railway.app/`) //`http://localhost:${app.get('port')}/`
    .then(res => res.json())
    .then(res => { for(let i = 0; i < res.length; i++){ addobj(res[i].id, res[i].nombre, res[i].apellido, res[i].email); } })

/*  -----------  -----------   ---------AGREGAR  USUARIOS A LA BASE-------------         ------------ -----------*/

btn__addUser.addEventListener("click",(e)=>{
    e.preventDefault()
    let _nombre = document.getElementById("form--name");
    let _apellido = document.getElementById("form--lastname");
    let _email = document.getElementById("form--email");
    
    let options = {
        method: "POST", 
        body: JSON.stringify({
            "_nombre": `${_nombre.value}`,
            "_apellido": `${_apellido.value}`,
            "_email": `${_email.value}`
        }),
        headers: {"Content-Type":"application/json"}
    }
    // console.log("btn alcanzado", options.body);
        
    fetch(`https://bbddmysqlgithubio-production.up.railway.app/add`, options)
        .then(res=>res.json()) 
        .then(res=>{
            console.log(res)
            //location.href('./index.html')
            location.reload()
        }) 
        
})





