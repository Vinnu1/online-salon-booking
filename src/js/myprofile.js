//ONLOAD MYPROFILE.HTML
document.addEventListener("DOMContentLoaded",function(){
var Email = document.getElementById("emailUser");
var Password = document.getElementById("passwordUser");
var Name = document.getElementById("nameUser");
var Phone = document.getElementById("phoneUser");
var Address = document.getElementById("addressUser");
var Dob = document.getElementById("dobUser");
var Gender = document.getElementById("genderUser");
const save = document.getElementById("save");
var firestore = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        var uid = user.uid;
        var userRef = firestore.doc("users/"+uid);
        userRef.get().then(function(userdetails){
           Email.value = userdetails.data().email; // would have to change in auth too
           //console.log(user.password);
           //Password.value = userdetails.data().password;
           Name.value = userdetails.data().name;
           Phone.value = userdetails.data().phone;
           Address.value = userdetails.data().address;
            var temp = new Date(userdetails.data().dob);
            var month = ((parseInt(temp.getMonth()) > 8)?parseInt(temp.getMonth())+1:"0"+(temp.getMonth()+1))
            var date = ((parseInt(temp.getDate()) > 9)?parseInt(temp.getDate()):"0"+temp.getDate())
            Dob.value = temp.getFullYear()+"-"+ month +"-"+date;
            console.log(temp)
            Gender.value=userdetails.data().gender;
           //Gender.innerHTML = 
           //document.getElementById(userdetails.data().gender).checked = true;
        });
    }
    else{
        window.location.replace('index.html');
    }
});

save.addEventListener("click",function(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            var uid = user.uid;
            user.updateEmail(Email.value);
            //user.updatePassword(Password.value);
            var userRef = firestore.doc("users/"+uid);
            userRef.update({
                email:Email.value,
                //Password.value = userdetails.data().password;
                name:Name.value,
                phone:Phone.value,
                address:Address.value,
                 dob:new Date(Dob.value).getTime(),
                gender:Gender.value,
            }).then(function(){
                alert("Details Updated!");
               });
        }else{
            alert("To change attributes you need to be logged in.");
            
        }
        });
     
});


Password.addEventListener("click",function(){
    firebase.auth().sendPasswordResetEmail(Email.value).then(function() {
        alert("Email sent for new password");
      }).catch(function(error) {
        // An error happened.
      });
})
});
