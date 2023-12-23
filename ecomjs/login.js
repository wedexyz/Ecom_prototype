var x= document.getElementById("email");
var p= document.getElementById("password");
document.getElementById("form").addEventListener("submit",(ee)=>{
    ee.preventDefault();
    console.log(x.value);
    console.log(p.value);
    if(x.value=="admin@gmail.com"&& p.value=="qwerty"){
        swal.fire({
            title:'selamat datang',
            html:'akses berhasil',
            type:'success'
        });
        setTimeout(()=>{
        loadPage();
        },3000);
    }else{
        swal.fire({
            title:'salah password',
            html:'akses diterima',
            type:'error'
        });
        }
function loadPage(){
    window.location.href="admin.html";
        }
        });