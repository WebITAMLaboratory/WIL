(function() {
   
const config = {
    apiKey: "AIzaSyBnDguniX29bnW89KSLG17gAq5am4i6E9s",
    authDomain: "itamlabweb.firebaseapp.com",
    databaseURL: "https://itamlabweb.firebaseio.com",
    storageBucket: "itamlabweb.appspot.com",
    messagingSenderId: "345250983225"
  };

  firebase.initializeApp(config);

    //Get elements
  const txtCompanName = document.getElementById('txtCompanName');
  const txtCompanEmail = document.getElementById('txtCompanEmail');
  const txtRepre = document.getElementById('txtRepre');
  const txtNomProy = document.getElementById('txtNomProy');
  const btnPush = document.getElementById('btnPush');
  // GET ELEMENT upload
  const uploader = document.getElementById('uploader');
  const fileButton = document.getElementById('fileButton');

  //SIGN UP EVENT
 btnPush.addEventListener('click', e => {
     const CompaniEmail = txtCompanName.value;
     const CompaniName = txtCompanEmail.value;
     const NomProy = txtNomProy.value;      
     const Repre = txtRepre.value;     
     if (CompaniEmail != "" && CompaniName != "" && Repre != "" && NomProy != "") {
          $("#p3").show();
          $("#btnPush").hide();

      function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;}

     var proyect = "PROYECT: ";
     var id = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
     var code = proyect.concat(id);
     var  firebaseRef = firebase.database().ref(code);
     firebaseRef.child("Name").set(CompaniName);
     firebaseRef.child("CompaniName").set(CompaniName);
     firebaseRef.child("Nombre proyecto").set(NomProy);
     firebaseRef.child("Representacion").set(Repre);

     var storage = firebase.storage();
      //LISTEN FILE FOR THE SELECTION
     fileButton.addEventListener('change', function(e){
        //Get FILE
        var file = e.target.files[0];

        //CREATE A STORAGE REF
        var storageRef =firebase.storage().ref('pdf_docs' + file.name);

        //UPLOAD FILE
        var task = storageRef.put(file);

        //UPDATE PROGRESS BAR
        task.on('state_changed',

         function progress(snapshot){
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = percentage;
        },
          function error(err){
          },

          function complete(){
          }
        );
      });
     alert("Successful Push");

    }else{
       alert("Mising Fields ");
       $("#p3").show();
       $("#btnPush").show();
     }
 });


}());

