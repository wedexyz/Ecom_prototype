    
var firebaseConfig = {
    apiKey: "AIzaSyBHwWg-S4fPatp3dlypnQjlsHs-kZj8kcE",
    authDomain: "user-49128.firebaseapp.com",
    databaseURL: "https://user-49128.firebaseio.com",
    projectId: "user-49128",
    storageBucket: "user-49128.appspot.com",
    messagingSenderId: "929689628939",
    appId: "1:929689628939:web:e5d23de838f0acbd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  function renderTable(){
    var order =firebase.database().ref("order/");
    order.on("child_added",function(data){
      var orderValue = data.val();
      document.getElementById("table").innerHTML+=`
    
       
     
        <tr>
            <td id="btnBuy">${orderValue.id}</td>
        </tr> 
        <tr>
        <td>Nama</td>  
        <td>: ${orderValue.nama}</td>
        </tr>
        <tr>
        <td>Alamat</td>  
        <td>: ${orderValue.alamat}</td>
        </tr>
        <tr>
        <td>No telepon</td> 
        <td>: ${orderValue.telpon}</td>
        </tr>
        <tr>
       <td>no reg order</td>  
        <td>: ${orderValue.order}</td>
        </tr>
        <tr>
     <td>total pesananan</td>  
        <td>: ${orderValue.total}</td>
        </tr>
        
      `;
    
    
    });
};
