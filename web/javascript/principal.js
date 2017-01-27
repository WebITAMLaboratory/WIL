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

