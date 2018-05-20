document.addEventListener("DOMContentLoaded",function(){
let hair = document.getElementById("hair");
let beauty = document.getElementById("beauty");
let spa = document.getElementById("spa");
let handfeet = document.getElementById("handfeet");
let body = document.getElementById("body");
let makeup = document.getElementById("makeup");
let serviceTitle = document.getElementById("serviceTitle");
let selectContainer = document.getElementById("selectContainer");
let goButton = document.getElementById("goButton");
let salon_results = document.getElementById("salon_results");

let firestore = firebase.firestore();

hair.addEventListener('click',function(){
    serviceTitle.value = "Hair";
    clearModal();
    getArea('Hair');
    $('#serviceModal').modal('show');
});
beauty.addEventListener('click',function(){
    serviceTitle.value = "Beauty";
    clearModal();
    getArea('Beauty');
    $('#serviceModal').modal('show');
});
spa.addEventListener('click',function(){
    serviceTitle.value = "Spa";
    clearModal();
    getArea('Spa');
    $('#serviceModal').modal('show');
});
handfeet.addEventListener('click',function(){
    serviceTitle.value = "Hand & Feet";
    clearModal();
    getArea('Handfeet');
    $('#serviceModal').modal('show');
});
body.addEventListener('click',function(){
    serviceTitle.value = "Body";
    clearModal();
    getArea('Body');
    $('#serviceModal').modal('show');
});
makeup.addEventListener('click',function(){
    serviceTitle.value = "MakeUp";
    clearModal();
    getArea('Makeup');
    $('#serviceModal').modal('show');
});

function getArea(cat){
            let same_area = [];
            let category = cat;
            let salonRef = firestore.collection("salons");
            salonRef.get().then(function(salons){
                salons.forEach(function(salon){
                    //console.log(salon.id,"=>",salon.data());
                    salonRef.doc(salon.id).collection("services").get().then(function(service_doc){
                        service_doc.forEach(function(serviceDoc){
                            if(serviceDoc.data().category == category){
                                
                                salon.data().areas.forEach(function(element){
                                    if(same_area.includes(element)){
                                        return;
                                    }
                                    same_area.push(element);
                                    let option = document.createElement("option");
                                    option.innerHTML = element;
                                    option.value = element;
                                    selectContainer.appendChild(option);
                                });
                                
                            }
                        });
                    });
                });
}).catch(function(error){
    console.log(error);
});
}

function clearModal(){
    selectContainer.innerHTML = "";
    salon_results.innerHTML = "";
}

goButton.addEventListener("click",function(){
    salon_results.innerHTML = "";
    let area = selectContainer.value;
            let salonRef = firestore.collection("salons");
            salonRef.get().then(function(salons){
                salons.forEach(function(salon){
                    console.log(salon.data().name);
                    if(salon.data().areas){ 
                    if(salon.data().areas.includes(area)){

                        let salon_result = document.createElement("a");
                                    salon_result.innerHTML = salon.data().name;
                                    salon_result.href = "salons.html?salon="+salon.id;
                                    salon_result.classList.add("d-block","text-dark");
                                    salon_results.appendChild(salon_result);
                    }
                }
                
});

});

});

});
