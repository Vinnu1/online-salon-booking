document.addEventListener("DOMContentLoaded",function(){
    

    let url = window.location.href;
let para = url.split('=');
let salon_id = para[1];

//DOM
let salon_name = document.getElementById('salon_name');
let salon_address = document.getElementById('salon_address');
let salon_number = document.getElementById('salon_number');
let salon_services = document.getElementById('salon_services');
let salon_title = document.getElementById('salon_title');

let firestore = firebase.firestore();

let salonRef = firestore.collection("salons").doc(salon_id);
salonRef.get().then(function(salon){
    salon_name.innerHTML = salon.data().name;
    salon_title.innerHTML = salon.data().name;
    salon_address.innerHTML = salon.data().address;
    salon_number.innerHTML = "Mobile: " + salon.data().number;
});
salonRef.collection("services").get().then(function(service_doc){
    service_doc.forEach((serviceDoc) => {
        console.log(serviceDoc.data());
        let Div = document.createElement('div');
        Div.classList.add("form-check");
        let input = document.createElement("input");
        //input.classList.add("form-check-input");
        input.type = "checkbox";        
        input.name = serviceDoc.data().name;
        input.value = serviceDoc.data().salon_cost;
        let label = document.createElement("label");
        //label.classList.add("form-check-label");
        label.innerHTML = "&nbsp;&nbsp;" + serviceDoc.data().name + ": Rs." + serviceDoc.data().salon_cost;
        Div.appendChild(input);
        Div.appendChild(label);
        salon_services.appendChild(Div);
    });
});

let order = document.getElementById("order");
    let all_services = document.getElementById("all_services");
    let all_cost = document.getElementById("all_cost");
    let cashBtn = document.getElementById("cashBtn");
    let onlineBtn = document.getElementById("onlineBtn");
    let total_cost = 0;
    let selected_service = [];
    order.addEventListener("click",function(){
            firebase.auth().onAuthStateChanged(function(user){
            
            if(user){
                    
        total_cost = 0;
        selected_service = [];
        $("input[type=checkbox]:checked").each(function(){
            total_cost += parseInt($(this).val());
            selected_service.push($(this).attr("name"));
        });
        all_cost.innerHTML = total_cost;
        all_services.innerHTML = selected_service.reduce((acc,curr)=>{
            if(acc == ""){
                return curr;
            }
            else{
            return acc + "," + curr;
            }
        },"");
        $("#orderModal").modal("show");
            }
            else{
                alert("Please login to place order");
            }
        });
        
});
   cashBtn.addEventListener('click',function(){placeOrder("cash");});
   onlineBtn.addEventListener('click',function(){placeOrder("online");});

   function placeOrder(mode){
            firebase.auth().onAuthStateChanged(function(user){
            
                if(user){
                    
                    let order_no = new Date().getTime().toString(16);
                    let userRef = firestore.doc("users/"+user.uid);
                    userRef.get().then((d)=>{let order = d.data().previous_order;
                        if(mode==="cash"){
                    if(order[0]==null)
                        order[0] = order_no;
                    else
                        order.push(order_no);
                    console.log(order);
                    userRef.update({
                        previous_order: order
                    });
                        let printDiv = document.createElement("div");
                        console.log(order_no,all_services.innerHTML,all_cost.innerHTML)
                        printDiv.innerHTML = `<h1>${salon_name.innerHTML}</h1><h2>Order Placed: ID ${order_no}<h3>Services:</h3>${all_services.innerHTML}<h3>Total Cost:</h3>${all_cost.innerHTML}
                        <h4>Payment Mode: Cash</h4><p>Please visit the salon anytime within working hours: 11 am - 10 pm</p><br>&copy;&nbsp;Online Salon`;
                        w=window.open();
                        w.document.write(printDiv.innerHTML);
                        w.print();
                        w.close();

                }
                if(mode==="online"){
                    //alert("Online Payment");
                    userRef.get().then((info)=>{
                        let Data = [];
                        console.log(info.data());
                        Data.push(info.data().name);
                        Data.push(info.data().email);
                        Data.push(info.data().phone);
                        Data.push(all_services.innerHTML);
                        Data.push(all_cost.innerHTML);
                    $.ajax({type:'POST', url: "https://still-forest-89345.herokuapp.com/salon/request.php", data:{data:Data},
                    success: function (data) {
                        if(data == "success"){
                            if(order[0]==null)
                        order[0] = order_no;
                    else
                        order.push(order_no);
                    console.log(order);
                    userRef.update({
                        previous_order: order
                    });
                        let printDiv = document.createElement("div");
                        console.log(order_no,all_services.innerHTML,all_cost.innerHTML)
                        printDiv.innerHTML = `<h1>${salon_name.innerHTML}</h1><h2>Order Placed: ID ${order_no}<h3>Services:</h3>${all_services.innerHTML}<h3>Total Cost:</h3>Rs. ${all_cost.innerHTML}
                        <h4>Payment Mode: Online</h4><p>(check sms, email)</p><br><p>Please visit the salon anytime within working hours: 11 am - 10 pm</p><br>&copy;&nbsp;Online Salon`;
                        w=window.open();
                        w.document.write(printDiv.innerHTML);
                        w.print();
                        w.close();
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                
                
                })
                        
                    });
                }
                    
                });
            }
                else{
                    alert("Login to place order");
                }

        });
   }


});