
// definisi global
var products=[];
var cartItems=[];
var cart_n = document.getElementById('cart_n');

// divisi
var p_wisata = document.getElementById("wisata");
var p_produk = document.getElementById("produk");
var p_penginapan = document.getElementById("penginapan");


//informasi
var GOMBENGSARI=[
  {name:'Puncak Asmoro',price:85},
  {name:'Edukasi tani Kopi',price:90},
  {name:'Wahana Air terjun'  ,price:50}
];

var PRODUK=[
  {name:'Kopi Arabica',price:85},
  {name:'Kopi Excelsa',price:90},
  {name:'Kopi Nonogi' ,price:50}
];

var PENGINAPAN=[
  {name:'Peno Homestay',price:85},
 
];



//input Data wisata

function produk_wisata(con){
  let URL =`img/gombengsari/gombengsari${con}.PNG`;
  // let URL =`img/banyuwangi/banyuwangi${con}.mp4`;
   let btn =`btnBanyuwangi${con}`;
   return `
   <div class="col-4" style="padding:2px">
        <div  id="by"class="card xs-3 " >

         <button id="${btn}" type="button" onclick="cart('${GOMBENGSARI[con-1].name}','${GOMBENGSARI[con-1].price}','${URL}','${con}','${btn}')"class="btnIcons"><i style='font-size:25px;color:#0ca8a3' class='fa fa-heart'></i></button>  
         <div class="card-body"  style="padding:0px">
 
                 <img  alt="Card video cap" class="card-img-top" style="height:12rem;padding:5px" src="${URL}" onclick="onClick(this)" >

                 <button  class="btnCarts  "style="margin-top:10px;margin:auto" type="button" onclick="cart('${GOMBENGSARI[con-1].name}','${GOMBENGSARI[con-1].price}','${URL}',' ${con}','${btn}')"><a href="cart.html" style="color:inherit;"><i class="text-warning fas fa-shopping-cart"style="font-size:5px ,">Pesan</a></i></button>
                 
                 <h3 class="card-text"style="margin-left:10px;margin-bottom:1px;font-size:15px;">${GOMBENGSARI[con-1].name}</h3>
                 <h3 class="card-text"style="margin-left:10px;margin-bottom:1px;font-size:15px;color:#d2850d">Rp ${GOMBENGSARI[con-1].price}.000</h3>                
        </div>
                <small class="text" style="background-color:rgb(18, 177, 18);color:white;font-size:15px">Diskon 10%</small> 
           </div>
         </div>
       </div>
     </div> 
   `
 }

function produk_jual(con){
  let URL =`img/kopi/kopi${con}.PNG`;
  // let URL =`img/banyuwangi/banyuwangi${con}.mp4`;
   let btn =`btnBanyuwangi${con}`;
   return`<div class="col-4" style="padding:5px">
          <div  id="by"class="card xs-4 " >

         <button id="${btn}" type="button" onclick="cart('${PRODUK[con-1].name}','${PRODUK[con-1].price}','${URL}','${con}','${btn}')" class="btnIcons">
         <i style='font-size:25px;color:#0ca8a3' class='fa fa-heart'></i></button>  

                <div class="card-body"  style="padding:0px">
 
                <img  alt="Card video cap" class="card-img-top" style="height:12rem;padding:5px" src="${URL}" onclick="onClick(this)" >

                <button  class="btnCarts  "style="margin-top:10px;margin:auto" type="button" onclick="cart('${PRODUK[con-1].name}','${PRODUK[con-1].price}','${URL}',' ${con}','${btn}')"><a href="cart.html" style="color:inherit;"><i class="text-warning fas fa-shopping-cart"style="font-size:5px ,">Pesan</a></i></button>
                
                <h3 class="card-text"style="margin-left:10px;margin-bottom:1px;font-size:15px;">${PRODUK[con-1].name}</h3>
                <h3 class="card-text"style="margin-left:10px;margin-bottom:1px;font-size:15px;color:#d2850d">Rp ${PRODUK[con-1].price}.000</h3>
                </div>

                <small class="text" style="background-color:rgb(18, 177, 18);color:white;font-size:15px">Diskon 10%</small>
 
           </div>
         </div>
       </div>
     </div> 
   `
 }

 function produk_inap(con){
  let URL =`img/peno/peno${con}.PNG`;
  let btn =`btnIjen${con}`;
  return `
  <div class="col-12" style="padding:5px">
        <div  id="by"class="card xs-4 " >
        <button id="${btn}" type="button" onclick="cart('${PENGINAPAN[con-1].name}','${PENGINAPAN[con-1].price}','${URL}','${con}','${btn}')"class="btnIcon"><i style='font-size:30px;color:#0ca8a3' class='	fa fa-heart'></i></button>
                <img class="card-img-top"style="height:17rem;padding:10px" src="${URL}" alt="">
                <div class="card-body"  style="padding:0px">
                <h3 class="card-text"style="margin-left:20px;margin-bottom:5px;font-size:15px">${PENGINAPAN[con-1].name}</h3>
                <h3 class="card-text"style="margin-left:20px;margin-bottom:5px;font-size:15px;color:#d2850d">Harga: Rp${PENGINAPAN[con-1].price}.000</h1>
                <div class=" justify-content-between align-items-center">
                
                <div class="">
                <button id="${btn}" type="button" onclick="cart('${PENGINAPAN[con-1].name}','${PENGINAPAN[con-1].price}','${URL}','${con}','${btn}')"class="btnCart  "><a href="cart.html" style="color:inherit;"><i class="text-warning fas fa-shopping-cart"style="font-size:20px ">Pesan</a></i></button>

                                 
            </div>
                <small class="text"style="background-color:rgb(18, 177, 18);color:white;font-size:15px">Spesial</small>
          </div>
        </div>
      </div>
    </div>
    
  `
}

//script sweet allert
function animation(){
  var toast= swal.fire({
    toast:false,
    position: 'top-end',
    type: 'success',
    title: 'Berhasil Ditambahkan',
    showConfirmButton: false,
    timer: 1500

  });
}
const d = new Date();
let time = d.getTime();
//fungsi cart
function cart(name,price,url,con,btncart){
  var item ={
    waktu :d.getTime(),
    name:name,
    price:price,
   // url:url
  }
  cartItems.push(item);
  let storage=JSON.parse(localStorage.getItem("cart"));
  if(storage==null){
    products.push(item);
    localStorage.setItem("cart",JSON.stringify(products));
  }
  else{
    products= JSON.parse(localStorage.getItem("cart"));
    products.push(item);
    localStorage.setItem("cart",JSON.stringify(products));
  }
  products= JSON.parse(localStorage.getItem("cart"));
  cart_n.innerHTML=`[${products.length}]`;
  document.getElementById(btncart).style.display="none";
  animation();
  
}


//menjalankan
function render(){
  for (let index = 1; index <=3; index++) {
    p_wisata.innerHTML+=`${produk_wisata(index)}`;
  }
  for (let index = 1; index <=3; index++) {
    p_produk.innerHTML+=`${produk_jual(index)}`;
  }
  for (let index = 1; index <=2; index++) {
    p_penginapan.innerHTML+=`${produk_inap(index)}`;
  }




  if (localStorage.getItem("cart")==null) {
    
  } 
  else {
    products=JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`[${products.length}]`;
  }
  
}
// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";

}
