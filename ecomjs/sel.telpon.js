//-selektor telpon-->


function geoPon() {
	
	const ponstatus = document.querySelector('#ponstatus');
	const ponLink = document.querySelector('#pon-link');
	
	ponLink.href = '';
	ponLink.textContent = '';
	
	function success(position) {
	  const nomer  = $('#t4_nocus_jsa').val();
	 
	
	
	  status.textContent = '';
	 ponLink.href = `tel:${nomer}`;
	ponLink.textContent = `telepon ${nomer} `;

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
	

	
