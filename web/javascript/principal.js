(function() {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBnDguniX29bnW89KSLG17gAq5am4i6E9s",
    authDomain: "itamlabweb.firebaseapp.com",
    databaseURL: "https://itamlabweb.firebaseio.com",
    storageBucket: "itamlabweb.appspot.com",
    messagingSenderId: "345250983225"
  };

  firebase.initializeApp(config);

  //Get elements
  const txtName = document.getElementById('txtName');
  const txtCel = document.getElementById('txtCel');
  const txtEmail = document.getElementById('txtEmail')
  const txtEmailConfirm = document.getElementById('txtEmailConfirm');
  const txtPassword = document.getElementById('txtPassword');
  const txtPasswordConfirm = document.getElementById('txtPasswordConfirm');
  const btnSignUp = document.getElementById('btnSignUp');

  //SIGN UP EVENT
 btnSignUp.addEventListener('click', e => {
   //Get email and password
   //TODO: CHECK 4 REAL EMAILZ
     const email = txtEmail.value;
     const pass = txtPassword.value;
     const auth = firebase.auth();
     
     const Name = txtName.value;
     const Cel = txtCel.value;
     const EmailConfirm = txtEmailConfirm.value;
     const PasswordConfirm = txtPasswordConfirm.value;
     if (Name != "" && Cel != "" && email == EmailConfirm && pass == PasswordConfirm) {
       if (email != "" && pass != "") {
          $("#p2").show();
          $("#btnSignUp").hide();
       //Sign in
       const promise =auth.createUserWithEmailAndPassword(email, pass);
       promise.catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorMessage == "The email address is already in use by another account.") {
          window.location.href = 'index.html';
        }else{
          alert(errorMessage);
          $("#btnSignUp").show();
          $("#p2").hide();
        }
          // ...
      });   
     }else{
       alert("Mising Fields");
     }

     function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;}


     var user = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
     var  firebaseRef = firebase.database().ref(user);
     firebaseRef.child("Name").set(Name);
     firebaseRef.child("Cel").set(Cel);
     firebaseRef.child("EmailConfirm").set(EmailConfirm);
     firebaseRef.child("PasswordConfirm").set(PasswordConfirm);

    }else{
       alert("Mising Fields");
     }
    

 });


  //GET elemnt
  //PARENT VALUE
  const preObject = document.getElementById('object');
  //CHILD VALUE
  const ulList = document.getElementById('list');

  // Create references
  	//ref nos lleva a la raiz de la base y el child crea una clave hija objecto
  const dbRefObject = firebase.database().ref().child('object');//.child(nombre) se refiere nombre de la rama en la base de datos
  const dbRefList = dbRefObject.child('hobbies'); //child camina en la ruta de db
  //Sync object changes 
  dbRefObject.on('value', snap => { //.on =manejador de evento
  	preObject.innerText = JSON.stringify(snap.val(),null, 3);
  });

  //Sync List changes 
  dbRefList.on('child_added', snap => {  	
  	const li = document.createElement('li');
  	li.innerText = snap.val();
  	li.id = snap.key;
  	ulList.appendChild(li);
  });

  dbRefList.on('child_changed', snap => {
  	const liChanged = document.getElementById(snap.key);
  	liChanged.innerText = snap.val();
  });

  dbRefList.on('child_removed', snap => {
  	const liToRemove = document.getElementById(snap.key);
  	liToRemove.remove();
  });

}());

