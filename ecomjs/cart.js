
   
// Your web app's Firebase configuration
var firebaseConfig = {		
    
  databaseURL: "https://crud2019.firebaseio.com",
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//global
var products=JSON.parse(localStorage.getItem('cart'));
var cartItems=[];
var cart_n = document.getElementById('cart_n');
var table= document.getElementById("table");
var total= 0;


//deklarasi html
function tableHTML(i){
return`

<tr>
<th scope="col">${i+1}.${products[i].name}</th>
<video style ="width:90px; margin: 5px" src="${products[i].url}" ></video>

<td>${products[i].price}.000</td>

          
</tr>        
`;
}
// membeli
function buy(){

var d = new Date();
var t = d.getTime();
var counter=t;
counter+=1;
let db=firebase.database().ref("order/"+counter)

let itemdb={
id:counter,
order:counter-895,
products,
'nama':document.getElementById('nama').value,
'alamat':document.getElementById('alamat').value,
'telpon':document.getElementById('telpon').value,
total:total*1000

}
db.set(itemdb);

swal.fire({
position:'center',
type:'success',
title:'Pesanan siap dikirim!',
text:`
pesananmu : ${itemdb.order}.......
Nama      : ${itemdb.nama} .......
Alamat    : ${itemdb.alamat}......
Total     : Rp.${itemdb.total}....
`,
footer: '<a href="index.html">Klik Untuk Kembali </a>',
showConfirmButton:false,
timer:3000000
})
clean();
}


//pembersihan data
function clean(){
localStorage.clear();
for (let index = 0; index <products.length; index++){
table.innerHTML+=tableHTML(index);
total=total+parseInt(products[index].price);
}
total= 000;
table.innerHTML=`
<tr>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>       
`;
cart_n.innerHTML='';
document.getElementById("btnBuy").style.display="none";
document.getElementById("btnClean").style.display="none";
document.getElementById("nama").style.display="none";
document.getElementById("alamat").style.display="none";
}

//menjalankan
function render(){
for (let index = 0; index <products.length; index++) {
table.innerHTML+=tableHTML(index);
total=total+parseInt(products[index].price);    
}
table.innerHTML+=`<tr>
  <th scope="col"></th>
<th scope="col">Total:Rp${total}.000</th>
</tr> 


<button id="btnBuy"  onclick="on()">Lanjutkan pesananmu</button>

<tr>

</tr>
<th scope="col"></th>
</tr>
<th scope="col"></th>


<tr>

<th scope="col"></th>

<th scope="col">

</th>

<th scope="col"> 

</th>

</tr> 

`;
products=JSON.parse(localStorage.getItem("cart"));

console.log(localStorage.getItem("cart"));

// Create a new post reference with an auto-generated id




cart_n.innerHTML=`[${products.length}]`;

}



function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}
