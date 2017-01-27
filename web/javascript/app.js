(function(){
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBnDguniX29bnW89KSLG17gAq5am4i6E9s",
    authDomain: "itamlabweb.firebaseapp.com",
    databaseURL: "https://itamlabweb.firebaseio.com",
    storageBucket: "itamlabweb.appspot.com",
    messagingSenderId: "345250983225"
  };

  firebase.initializeApp(config);

}());

//Comprobar si esta conectado

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();

    var dialog = document.querySelector('#loginDialog');
     if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.close(); 

  } else {
    // No user is signed in.

    $(".login-cover").show();

     var dialog = document.querySelector('#loginDialog');
     if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    $("#loginProgress").hide();
    $("#loginBtn").show();    
  }
});

/*LOGIN PROCESS*/

$("#loginBtn").click(
    function(){
      var email = $("#loginEmail").val();
      var password= $("#loginPassword").val();
      if (email != "" && password != "") {
        $("#loginProgress").show();
        $("#loginBtn").hide();

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
          $("#loginError").show().text(error.message);
          $("#loginProgress").hide();
          $("#loginBtn").show();
        });

      }
    }

  )


/*lOG OUT PROCESS*/

$("#signOutBtn").click(
    function(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.

      }, function(error) {
        // An error happened.
        alert(error.message);
      });
    }
  )
