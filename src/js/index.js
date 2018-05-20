document.addEventListener("DOMContentLoaded",function(){
// START

// FIREBASE INITIALIZATION -- START 
var config = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId"
  };
  firebase.initializeApp(config);

  //firestore
  
  var firestore = firebase.firestore();

// FIREBASE INITIALIZATION -- STOP

//VARIABLES
//const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const loginChange = document.getElementById("loginChange");
const signupChange = document.getElementById("signupChange");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const form = document.getElementById("loginSignupForm");
const username = document.getElementById("username");
const userDetails = document.getElementById("userDetails");
const fbLogo = document.getElementById("fblogo");
const instaLogo = document.getElementById("instalogo");
const twitterLogo = document.getElementById("twitterlogo");
const youtubeLogo = document.getElementById("youtubelogo");
//var loginClass = loginBox.classList;
var signupClass = signupBox.classList;
var loginBtn = loginButton.classList;
var signupBtn = signupButton.classList;




//CHECK USER LOGGED IN OR NOT
function isLoggedIn(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            var uid = user.uid;
            console.log(uid);
            var userRef = firestore.doc("users/"+uid);
            userRef.get().then(function(userdetails){
               username.innerHTML = userdetails.data().name.split(' ')[0];
            });
            loggedIn();
        }
    });
}
isLoggedIn();


//LOGIN SIGNUP TOGGLE -- START   

    
loginChange.addEventListener("click",function(){
    //loginBox.classList.remove('d-none');
    //loginBox.classList.add('d-none');
    if(loginBtn.contains("d-none")){
        //loginClass.remove("d-none");
        loginBtn.remove("d-none");
        signupClass.add("d-none");  
        signupBtn.add("d-none");     
    }
})

signupChange.addEventListener("click",function(){
    if(signupClass.contains("d-none")){
        signupClass.remove("d-none");
        signupBtn.remove("d-none");
        //loginClass.add("d-none");
        loginBtn.add("d-none");
    }
})

//LOGIN SIGNUP TOGGLE -- STOP



  //SIGNUP -- START
  signupButton.addEventListener('click',function(){
  //get credentials
  var email= document.querySelector('#email').value;
  console.log(email);
  var pass= document.querySelector('#password').value;
  //create users
  firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(){
    console.log('Registration Successful');
    firebase.auth().onAuthStateChanged(function(user){

//fetch user uid and email   
if(user){  
console.log(user);
var uid = user.uid;
var Email = user.email;
var docRef = firestore.doc("users/"+uid);
console.log("auth changed");

    var Name = document.querySelector('#name').value;
    var Phone = document.querySelector('#phone').value;
    var Address = document.querySelector('#address').value;
    var dob = document.querySelector('#dob').value;
    var Gender = document.getElementById('gender');
    //alert(Gender.value);
    var Dob = new Date(dob).getTime(); 
    console.log("DOB:"+Dob);
    //window.location = 'snipped_write.html';
    docRef.set({
              name : Name,
              dob: Dob,
              address: Address,
              gender: Gender.value,
              phone: Phone,
              email: email,
              previous_order: [],
              registered_date: new Date().getTime()
          }).then(function(){
              alert("Registered!");
              form.reset();
              $('#loginModal').modal('hide');
          }).catch(function(){
              console.log("Got an error in adding additional details:", error);
          });
}
    });

  }).catch(function(error){
    alert('Error Code:'+error.code+'\nError Message:'+error.message);
  })
  
})
// SIGNUP - THE END

// LOGIN
loginButton.addEventListener("click",function(){
    var email = document.getElementById("email").value;
    
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        console.log("In login");
        //username.innerHTML = user.name;
        //console.log(user);
        var uid = user.uid;
        console.log(uid);
        var userRef = firestore.doc("users/"+uid);
        userRef.get().then(function(userdetails){
           username.innerHTML = userdetails.data().name.split(' ')[0];
        

        });
        //alert("Successfully Logged In");
        form.reset();
        $('#loginModal').modal('hide');
        loggedIn();
    }).catch(function(error){
        console.log(error);
    })
})

//When Logged IN
function loggedIn(){
    login.classList.add("d-none");
    logout.classList.remove("d-none");
    userDetails.classList.remove("d-none");
}

//When Logout Clicked
logout.addEventListener("click",function(){
    firebase.auth().signOut().then(function(){
        // Sign-out successful.
        alert("LoggedOut!");
        login.classList.remove("d-none");
        logout.classList.add("d-none");
        userDetails.classList.add("d-none");
      }).catch(function(error){
        // An error happened.
        alert("Error:"+error);
      });
});

//date for copyright
    document.getElementById('date').innerHTML = new Date().getFullYear();

//image hover functions
fbLogo.addEventListener("mouseover",()=>{
    fbLogo.setAttribute("src","img/social/facebookff.png")
});
fbLogo.addEventListener("mouseout",()=>{
    fbLogo.setAttribute("src","img/social/facebookbb.png")
});
instaLogo.addEventListener("mouseover",()=>{
    instaLogo.setAttribute("src","img/social/instagramff.png")
});
instaLogo.addEventListener("mouseout",()=>{
    instaLogo.setAttribute("src","img/social/instagrambb.jpg")
});
twitterLogo.addEventListener("mouseover",()=>{
    twitterLogo.setAttribute("src","img/social/twitterff.png")
});
twitterLogo.addEventListener("mouseout",()=>{
    twitterLogo.setAttribute("src","img/social/twitterbb.png")
});
youtubeLogo.addEventListener("mouseover",()=>{
    youtubeLogo.setAttribute("src","img/social/youtubeff.png")
});
youtubeLogo.addEventListener("mouseout",()=>{
    youtubeLogo.setAttribute("src","img/social/youtubebb.png")
});
    //END
})