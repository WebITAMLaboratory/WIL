(function() {
   
btnSignUp.addEventListener('click', e => {
  const txtName = document.getElementById('txtName');
  const txtMail = document.getElementById('txtMail');
  const txtProcedencia = document.getElementById('txtProcedencia')
   //TODO: CHECK 4 REAL EMAILZ
     const name = txtName.value;
     const mail = txtMail.value;
     const procedencia = txtProcedencia.value;     
     if (name != "" && mail != "" && procedencia="") {
       if (/@itam.mx\s*$/.test(email)) {
          $("#p2").show();
          $("#btnSignUp").hide();     

       function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;}


     var user = randomString(10, '0123456789');
     var  firebaseRef = firebase.database().ref(user);
     firebaseRef.child("Name").set(name);
     firebaseRef.child("mial").set(mail);
     firebaseRef.child("EmailConfirm").set(procedencia);
     alert("Successful Push");

     }else{
      if (/@itam.mx\s*$/.test(email) == false) {
        alert("Only @itam.mx domains");
      }else{
       alert("Mising Fields");
      }
     }
    }else{
       alert("Mising Fields or email/password error");
     }
 });

   var storage = firebase.storage();
  // GET ELEMENT
  const uploader = document.getElementById('uploader');
  const fileButton = document.getElementById('fileButton');

  //LISTEN FILE FOR THE SELECTION
  fileButton.addEventListener('change', function(e){
    //Get FILE
    var file = e.target.files[0];

    //cREATE A STORAGE REF
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



}());

