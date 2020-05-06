//----------------------------------------------------------------------------------------
//initial
//----------------------------------------------------------------------------------------
var userEmail, classNo

window.onload = function() {
    var url = window.location.href;	
    //if google login
	if(url.indexOf('code')!=-1){
		if(url.indexOf('google')!=-1){
			var code = url.split("#")[1].split("=")[1].split("&")[0];
			console.log(code)
			fetch(`https://140.136.150.95:3000/login/google`,{
			    method: 'POST',
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({code})
			}).then(res =>{
				return res.json()
			}).then(data =>{
				console.log(data)
				userEmail = data.userEmail
				document.getElementById('user_account').innerHTML = userEmail;
				document.cookie = "username=" + userEmail
			})
        }
	}
	else{
		userEmail = url.split("#")[1];
		console.log(userEmail)
		document.getElementById('user_account').innerHTML = url.split("#")[1];
        document.cookie = "username=" + userEmail
    }
    this.coachProfile()
	this.openPage('Home', document.getElementsByClassName('page')[0], 'red')
};

//----------------------------------------------------------------------------------------
//profile page
//----------------------------------------------------------------------------------------
function coachProfile(){
	var account = document.getElementById('user_account').innerHTML
	fetch(`https://140.136.150.95:3000/coach/profile`,{
		method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({account})
	}).then(res =>{
		return res.json()
	}).then(data =>{
		console.log(data)
		document.getElementById('user_name').innerHTML = data.result[0].name
        document.getElementById('user_class').innerHTML = data.result[0].classNo
        classNo = data.result[0].classNo
	})
}

//----------------------------------------------------------------------------------------
//get all student use coach class
//----------------------------------------------------------------------------------------
function getStuList(){
	fetch('https://140.136.150.95:3000/coach/stuList',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({classNo})
	}).then(res =>{
		return res.json()
	}).then(data =>{
		console.log(data)
		total_student = data.result.length
        console.log(data.result.length)
        document.getElementById('StuLink').innerHTML = ""
		for(var i = 0 ; i < total_student ; i++)
		{
			document.getElementById('StuLink').innerHTML += '<a href = "' + 'stuData.html#' + data.result[i].account + '">' + data.result[i].account +  '</a><br/>'
		}
	})
};


//----------------------------------------------------------------------------------------
//user change page
//----------------------------------------------------------------------------------------
function openPage(pageName,elmnt,color) {
	var i, tabcontent, page;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	page = document.getElementsByClassName("page");
	for (i = 0; i < page.length; i++) {
		page[i].style.backgroundColor = "";
    }
	document.getElementById(pageName).style.display = "block";
	elmnt.style.backgroundColor = color;
}