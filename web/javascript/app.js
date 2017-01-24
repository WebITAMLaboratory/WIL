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

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  btnLogin.addEventListener('click', e=> {
  	//Get email and password
  	const email = txtEmail.value;
  	const pass = txtPassword.value;
  	const auth = firebase.auth();
  	//Sign in
  	const promise =auth.signInWithEmailAndPassword(email, pass);
  	promise.catch(e => console.log(e.message));
  })

}());

//Comprobar si esta conectado

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();
  } else {
    // No user is signed in.
    alert("Youuuuuuuuuuuuuu");
  }
});

//Signup event
btnSignUp.addEventListener('click', e => {
	//Get email and password
	//TODO: CHECK 4 REAL EMAILZ
  	const email = txtEmail.value;
  	const pass = txtPassword.value;
  	const auth = firebase.auth();
  	//Sign in
  	const promise =auth.createUserWithEmailAndPassword(email, pass);
  	promise.catch(e => console.log(e.message));
})

	btnLogout.addEventListener('click', e=>{
		firebase.auth().signOut();
	})

//realtime Listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		console.log(firebaseUser);
		btnLogout.classList.remove('hide');
	}else
	console.log('not log in')
	btnLogout.classList.add('hide');
});