    let navToggle = document.querySelector(".custom_menu-btn");
  
    let interruptor = true;
    navToggle.addEventListener("click",()=>{

        

        let nav = document.querySelector(".navbar-nav")
        let items = document.querySelectorAll(".nav-item")

        if(interruptor == true ) { 
            nav.style.visibility =  "visible";
            nav.style.height =  "16rem";
            
            items.forEach(element => {
                element.style.display = "block"
            });
            
            document.querySelector("header").style.marginBottom = "16rem"
            document.querySelector("header").style.transition = "0.38s"
            interruptor = false;
            
        } 
        else if(interruptor == false )  { 
            
          
           
            nav.style.height =  "0rem";
            nav.style.visibility =  "hidden";
            document.querySelector("header").style.marginBottom = "0rem"
            interruptor = true;
            
            items.forEach(element => {
                element.style.display = "none"
            });
            
        }
        
        console.log( interruptor)
    })


