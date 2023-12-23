//--selektor rtc-->


	function geoRtc() {

const rtcstatus = document.querySelector('#rtcstatus');
const rtcLink = document.querySelector('#rtc-link');

rtcLink.href = '';
rtcLink.textContent = '';

function success(position) {
  const nomer  = $('#T4').val();
 


  status.textContent = '';
 rtcLink.href = `https://appr.tc/r/${nomer}`;
rtcLink.textContent = `kamera${nomer} `;

}

function error() {
  status.textContent = 'Unable to retrieve your location';
}

if (!navigator.geolocation) {
  status.textContent = 'Geolocation is not supported by your browser';
} else {
  status.textContent = 'Locating…';
  navigator.geolocation.getCurrentPosition(success, error);

}

}



