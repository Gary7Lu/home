//----------------------------------------------------------------------------------------
//initial
//----------------------------------------------------------------------------------------
var userEmail
var userId, access_token, refresh_token, scope

window.onload = function() {
	var url = window.location.href;	
	if(url.indexOf('code')!=-1){
		//if google login
		if(url.indexOf('google')!=-1){
			var code = url.split("#")[1].split("=")[1].split("&")[0];
			console.log(code)
			~async function(){
				await fetch(`https://140.136.150.95:3000/login/google`,{
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
				this.userProfile()
				this.openPage('Home', document.getElementsByClassName('page')[0], 'red')
			}();
		}
		//if fitbit login
		else{
			userEmail = getCookie('username')
			var code = url.split("#")[0].split("=")[1];
			console.log(code)
			const options = {
			    method: 'POST',
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({code, userEmail})
			}
			fetch('https://140.136.150.95:3000/user/fitbit', options).then(res=>{
			    return res.json()
			}).then(data=>{
			    console.log(data)
			    userId = data.userId;
			    access_token = data.access_token;
			    refresh_token = data.refresh_token;
			    
				document.getElementById('user_account').innerHTML = userEmail;
			    userSteps(userId,access_token);
			    userDistance(userId,access_token);
			    userCalories(userId,access_token);
				userHeart(userId,access_token);
			})
			document.getElementById('fitbit_login').style.display = "none";
  			document.getElementById('fitbit_data').style.display = "block";
			  this.openPage('Home', document.getElementsByClassName('page')[2], 'blue')
		}
	}
	else{
		userEmail = url.split("#")[1];
		console.log(userEmail)
		document.getElementById('user_account').innerHTML = url.split("#")[1];
		document.cookie = "username=" + userEmail
		this.userProfile()
		this.openPage('Home', document.getElementsByClassName('page')[0], 'red')
		
	}
};


function getCookie(cookieName) {
  var name = cookieName + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}

//----------------------------------------------------------------------------------------
//user profile page
//----------------------------------------------------------------------------------------
//get profile
function userProfile(){
	var account = document.getElementById('user_account').innerHTML
	fetch(`https://140.136.150.95:3000/user/profile`,{
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
		document.getElementById('user_height').innerHTML = data.result[0].height
		document.getElementById('user_weight').innerHTML = data.result[0].weight
		document.getElementById('user_class').innerHTML = data.result[0].class
	})
}
//modify profile
function modifyProfile() {
	document.getElementById('profile').style.display = "none";
  	document.getElementById('profile_modify').style.display = "block";
}
function modifyProfileFinish(){
	document.getElementById('profile').style.display = "block";
  	document.getElementById('profile_modify').style.display = "none";
  	var name = document.getElementById('modify_user_name').value
	var classNo = document.getElementById('modify_user_class').value
	if(name =='') name = null;
	if(classNo =='') classNo = null;
	~async function(){
		await fetch(`https://140.136.150.95:3000/user/profile/modify`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({userEmail, name, classNo})
		})
		userProfile();
	}();
}


//----------------------------------------------------------------------------------------
//user record page
//----------------------------------------------------------------------------------------
function userRecord(){
	var date = document.getElementById('date').value
	var height = document.getElementById('height').value
	var weight = document.getElementById('weight').value
	var breakfast = document.getElementById('user_breakfast').value
	var lunch = document.getElementById('user_lunch').value
	var dinner = document.getElementById('user_dinner').value
	var additional = document.getElementById('user_additional').value
	if(height =='') height = null;
	if(weight =='') weight = null;
	if(breakfast =='') breakfast = null;
	if(lunch =='') lunch = null;
	if(dinner =='') dinner = null;
	if(additional =='') additional = null;
	fetch(`https://140.136.150.95:3000/user/record`,{
		method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	     },
    	body: JSON.stringify({userEmail, date, height, weight, breakfast, lunch, dinner, additional})
	})
}

//----------------------------------------------------------------------------------------
//user fitbit page
//----------------------------------------------------------------------------------------
//get user steps
function userSteps(userId, access_token){
  fetch(`https://140.136.150.95:3000/user/fitbit/steps`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, access_token})
  }).then(res =>{
    return res.json()
  }).then(data =>{
    console.log(data)
    document.getElementById('steps').innerHTML = data.data
  }) 
}
//get user distance
function userDistance(userId, access_token){
  fetch(`https://140.136.150.95:3000/user/fitbit/distance`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, access_token})
  }).then(res =>{
    return res.json()
  }).then(data =>{
    console.log(data)
    document.getElementById('distance').innerHTML = data.data
  }) 
}
//get user calories
function userCalories(userId, access_token){
  fetch(`https://140.136.150.95:3000/user/fitbit/calories`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, access_token})
  }).then(res =>{
    return res.json()
  }).then(data =>{
    console.log(data)
    document.getElementById('kcal').innerHTML = data.data
  }) 
}
//get user heart
function userHeart(userId, access_token){
  fetch(`https://140.136.150.95:3000/user/fitbit/heart`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, access_token})
  }).then(res =>{
    return res.json()
  }).then(data =>{
    console.log(data)
    document.getElementById('heart').innerHTML = data.data
  }) 
}


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