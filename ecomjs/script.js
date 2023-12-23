$(document).ready(function () {
  //initialize the firebase app
  var config = {
    apiKey: "AIzaSyDDun8lyF6xFnJfAIAiggtRjMzQ9oldCD4",
    authDomain: "crud2019.firebaseapp.com",
    databaseURL: "https://crud2019.firebaseio.com",
    projectId: "crud2019",
    storageBucket: "gs://crud2019.appspot.com",
    messagingSenderId: "225335034709",
    appId: "1:225335034709:web:afbbb01666b457de"

  };
  firebase.initializeApp(config);

  //create firebase references
  var Auth = firebase.auth();
  var dbRef = firebase.database();
  // var contactsRef = dbRef.ref('contacts')
  var usersRef = dbRef.ref('users')
  var auth = null;
  //$('<audio id="chatAudio"><source src="qq.wav" type="audio/ogg"></audio>').appendTo('tbody');
  //Register
  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    $('#registerModal').modal('hide');
    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');
    var data = {
      email: $('#registerEmail').val(), //get the email from Form

      firstName: $('#registerFirstName').val(), // get firstName
      lastName: $('#registerLastName').val(), // get lastName
    };

    var passwords = {
      password: $('#registerPassword').val(), //get the pass from Form
      cPassword: $('#registerConfirmPassword').val(), //get the confirmPass from Form
    }
    if (data.email != '' && passwords.password != '' && passwords.cPassword != '') {
      if (passwords.password == passwords.cPassword) {
        //create the user

        firebase.auth()
          .createUserWithEmailAndPassword(data.email, passwords.password)
          .then(function (user) {
            return user.updateProfile({
              displayName: data.firstName + ' ' + data.lastName
            })
          })
          .then(function (user) {
            //now user is needed to be logged in to save data
            auth = user;
            //now saving the profile data
            usersRef.child(user.uid).set(data)
              .then(function () {
             
              })
            $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))

            $('#messageModal').modal('hide');
          })
          .catch(function (error) {
       
            $('#messageModalLabel').html(spanText('silahkan login cek data anda '
              +error.code, ['danger']
            ))
          });

      } else {
        //password and confirm password didn't match
        $('#messageModalLabel').html(spanText("ERROR: Passwords didn't match", ['danger']))
      }
    }
  });

  //Login
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    $('#loginModal').modal('hide');
    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');

    if ($('#loginEmail').val() != '' && $('#loginPassword').val() != '') {
      //login the user
      var data = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
      };
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function (authData) {
          auth = authData;
          $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
          $('#messageModal').modal('hide');
        })
        .catch(function (error) {

          $('#messageModalLabel').html(spanText('ERROR: ' + error.code, ['danger']))
        });
    }
  });

  $('#logout').on('click', function (e) {
    e.preventDefault();
    firebase.auth().signOut()
  });



  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      auth = user;
      $('body').removeClass('auth-false').addClass('auth-true');
      usersRef.child(user.uid).once('value').then(function (data) {
        var info = data.val();
        
        if (user.photoUrl) {
          //    $('.user-info img').show();
          //    $('.user-info img').attr('src', user.photoUrl);
          $('.user-info .user-name').hide();
        } else if (user.displayName) {
          //      $('.user-info img').hide();
          $('.user-info').append('<span class="user-name">' + user.displayName + '</span>');
        } 
        //else if (info.firstName) {
          //    $('.user-info img').hide();
        //  $('.user-info').append('<span class="user-name">' + info.firstName + '</span>');
    //    }
      });
      //   contactsRef.child(user.uid).on('child_added', onChildAdd);
    } else {
      // No user is signed in.
      $('body').removeClass('auth-true').addClass('auth-false');
      //  auth && contactsRef.child(auth.uid).off('child_added', onChildAdd);
      $('#contacts').html('');
      
      auth = null;
    }
  });
  
});




function spanText(textStr, textClasses) {
 var classNames = textClasses.map(c => 'text-' + c).join(' ');
  return '<span class="' + classNames + '">' + textStr + '</span>';
  
}



/*

// Menampilkan data dalam bentuk tabel
function tampilData() {

    // Buat referensi database firebase
    var dbRef = firebase.database();
    var statusJsa = dbRef.ref("status-jsa");
      
    
    
    // Dapatkan referensi table
    var table = document.getElementById("tabel-status-jsa").getElementsByTagName('tbody')[0];
        //variabel suara

    // Membuang semua isi table
    $("#tabel-status-jsa").find("tr:gt(0)").remove();
    

    // Memuat Data
    statusJsa.on("child_added", function (data, prevChildKey) {
        var newstatusJsa = data.val();
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

    

        
        cell1.innerHTML = newstatusJsa.id;
        cell2.innerHTML ='<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + newstatusJsa.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><br><br><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + newstatusJsa.id + ')" data-toggle="modal" data-target="#ModalDel" style="margin-left:0px;">Hapus</button>';
        cell3.innerHTML = newstatusJsa.user_jsa;
        cell4.innerHTML = newstatusJsa.nouser_jsa;
        cell5.innerHTML = newstatusJsa.namauser_jsa;
        cell6.innerHTML = newstatusJsa.nocus_jsa;
        cell7.innerHTML = newstatusJsa.koordinat_jsa;
        cell8.innerHTML = newstatusJsa.manual_jsa;
        cell9.innerHTML = newstatusJsa.email;
        
    });

}
*/
// Melakukan proses pencarian data
function CariData() {
  // Ambil isi text pencarian
  var user_jsa_cari = $('#loginEmail').val();

  // Buat referensi database firebase
  var dbRef = firebase.database();
  var statusJsa = dbRef.ref("status-jsa");


  // Ambil data nama_alat sama persis isi text cari
  // var query = statusAlat
  // 				.orderByChild('nama_alat')
  // 				.equalTo(nama_alat_cari)
  // 				.limitToFirst(1);


  // Ambil data nama_alat huruf depan (dan selebihnya) isi text cari dilimit 1 data saja
  // var query = statusAlat
  // 				.orderByChild('nama_alat')
  // 				.startAt(nama_alat_cari)
  // 				.endAt(nama_alat_cari + "\uf8ff")
  // 				.limitToFirst(1);


  // Ambil data nama_alat huruf depan (dan selebihnya) isi text cari
  var query = statusJsa
    .orderByChild('email')
    .equalTo(user_jsa_cari)
    .limitToFirst(1);


  // Dapatkan referensi table
  var table = document.getElementById("tabel-status-jsa").getElementsByTagName('tbody')[0];

  // Membuang semua isi table	
  $("#tabel-status-jsa").find("tr:gt(0)").remove();

  // Memuat Data pencarian

  query.on("child_added", function (snapshot) {

    var childData = snapshot.val();

    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
  //  var cell5 = row.insertCell(4);
    //   var cell6 = row.insertCell(5)
    //  var cell7 = row.insertCell(6);
    //    var cell8 = row.insertCell(7);
    //   var cell9 = row.insertCell(8);

    //   cell1.innerHTML = childData.id;
    cell1.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + childData.id + '),pauseAudio()" data-toggle="modal" data-target="#ModalUpdate" >online</button>';
    cell2.innerHTML = childData.user_jsa;
    cell3.innerHTML = childData.namauser_jsa;
    cell4.innerHTML = '<img id="myPic" height="50" alt="Avatar" style="width:50px;  border-radius: 50%;box-shadow: 10px 10px 5px rgb(7, 7, 7);margin-top: 5px">';
    //   cell6.innerHTML = childData.nocus_jsa;
    //   cell7.innerHTML = childData.koordinat_jsa;
    //    cell8.innerHTML = childData.manual_jsa;
        // cell4.innerHTML = childData.nouser_jsa;
   

    document.getElementById("myPic").src =(childData.poto);
  });

}

// Menampilkan data yang akan di update kedalam modal update
function updateData_Tampil(id) {
  $('#T4').val(id);


  var dbRef_update_tampil = firebase.database();
  var statusJsadenganID = dbRef_update_tampil.ref("status-jsa/" + id);


  statusJsadenganID.on("value", function (snapshot) {
    var childData = snapshot.val();
    $('#t4_user_jsa').val(childData.user_jsa);
    $('#t4_nouser_jsa').val(childData.nouser_jsa);
    $('#t4_namauser_jsa').val(childData.namauser_jsa);
    $('#t4_nocus_jsa').val(childData.nocus_jsa);
    $('#t4_namaclient_jsa').val(childData.namaclient_jsa);
    $('#t4_latclient_jsa').val(childData.latclient_jsa);
    $('#t4_longclient_jsa').val(childData.longclient_jsa);


   $('#myAudio')[0].play(childData.namaclient_jsa);
 
 
 

  });

}



// Melakukan proses update data
function updateData_Proses() {


  var id_update_proses = $('#T4').val();
  var user_jsa_update_proses = $('#t4_user_jsa').val();
  var nouser_jsa_update_proses = $('#t4_nouser_jsa').val();
  var namauser_jsa_update_proses = $('#t4_namauser_jsa').val();
  var nocus_jsa_update_proses = $('#t4_nocus_jsa').val();
  var namaclient_jsa_update_proses = $('#t4_namaclient_jsa').val();
  var latclient_jsa_update_proses = $('#t4_latclient_jsa').val();
  var longclient_jsa_update_proses = $('#t4_longclient_jsa').val();


  var dbRef_update_proses = firebase.database();
  var update_statusJsa = dbRef_update_proses.ref("status-jsa/" + id_update_proses);


  update_statusJsa.update({
    "user_jsa": user_jsa_update_proses,
    "nouser_jsa": nouser_jsa_update_proses,
    "namauser_jsa": namauser_jsa_update_proses,
    "nocus_jsa": nocus_jsa_update_proses,
    "namaclient_jsa": namaclient_jsa_update_proses,
    "latclient_jsa": latclient_jsa_update_proses,
    "longclient_jsa": longclient_jsa_update_proses,






  });
  $('#ModalUpdate');



}

// Mengambil id terakhir dan membahkan dengan 1 dan memasukkan kedalam text id di modal tambah
function ambilDataTerakhir() {

  $('#t4_user_jsa_add').val("");
  $('#t4_nouser_jsa_add').val("");
  $('#t4_namauser_jsa_add').val("");
  $('#t4_nocus_jsa_add').val("");
  $('#t4_namaclient_jsa_add').val("");
  $('#t4_latclient_jsa_add').val("");
  $('#t4_longclient_jsa_add').val("");




  var dbRef_ambilDataTerakhir = firebase.database();
  var cariAkhir = dbRef_ambilDataTerakhir.ref("status-jsa");
  cariAkhir.limitToLast(1).on('child_added', function (dataAkhir) {
    var snap = dataAkhir.val();
    var id_record_terakhir = snap.id + 1;
    document.getElementById("T4_add").value = id_record_terakhir;
  });

}

// Melakukan proses penambahan data
function addData_Proses() {
  var id_add_proses = $('#T4_add').val();
  var user_jsa_add_proses = $('#t4_user_jsa_add').val();
  var nouser_jsa_add_proses = $('#t4_nouser_jsa_add').val();
  var namauser_jsa_add_proses = $('#t4_namauser_jsa_add').val();
  var nocus_jsa_add_proses = $('#t4_nocus_jsa_add').val();
  //   var namaclient_jsa_add_proses =$('#t4_namaclient_jsa_add').val();
  //   var nocus_jsa_add_proses = $('#t4_nocus_jsa_add').val();
  //   var latclient_jsa_add_proses =$('#t4_latclient_jsa_add').val();
  //   var longclient_jsa_add_proses =$('#t4_longclient_jsa_add').val();
  var email_add_proses = $('#registerEmail').val();
  var poto_add_proses = $('#myText').val();

  var dbRef_add_proses = firebase.database();

  // Isikan data kedalam firebase
  var statusJsa = dbRef_add_proses.ref("status-jsa/" + id_add_proses);

  statusJsa.set({
    id: parseInt(id_add_proses),
    user_jsa: user_jsa_add_proses,
    nouser_jsa: nouser_jsa_add_proses,
    namauser_jsa: namauser_jsa_add_proses,
    //		namaclient_jsa: namaclient_jsa_add_proses,
    //		nocus_jsa: nocus_jsa_add_proses,
    //			latclient_jsa: latclient_jsa_add_proses,
    //		longclient_jsa: longclient_jsa_add_proses,
    email: email_add_proses,
    poto: poto_add_proses,


  });

  $('#ModalAdd').modal('hide');

}

// Melakukan proses delete data yang telah dikonfirmasi sebelumnya
function delData_Proses() {
  var id_add_proses = $('#T4_del').val();
  var dbRef_delete = firebase.database();
  var statusJsa = dbRef_delete.ref("status-jsa/" + id_add_proses);
  statusJsa.remove();
  $('#ModalDel').modal('hide');



}

// Memasukkan id ke textbox di modal konfirmasi delete
function deleteData_Tampil(id) {
  $('#T4_del').val(id);

}


