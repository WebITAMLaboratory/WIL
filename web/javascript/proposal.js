(function() {
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

