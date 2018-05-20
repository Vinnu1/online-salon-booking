document.addEventListener("DOMContentLoaded",function(){
    var details = document.getElementById("details");
    var detailsButton = document.getElementById("detailsButton");
    var contact = document.getElementById("contact");
    var contactButton = document.getElementById("contactButton");
    var sendButton = document.getElementById("sendButton");

    detailsButton.addEventListener("click",function(){
        if(details.classList.contains("d-none")){
            details.classList.remove("d-none"); 
            contact.classList.add("d-none");  
        }
    });

    
    contactButton.addEventListener("click",function(){
        if(contact.classList.contains("d-none")){
            contact.classList.remove("d-none");   
            details.classList.add("d-none");
        }
    })
    
    sendButton.addEventListener("click",function(){
        alert("Currently not going anywhere");
    })

})