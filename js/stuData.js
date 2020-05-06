var userEmail
window.onload = function() {
    var url = window.location.href;	
    userEmail = url.split("#")[1];
    console.log(userEmail)
    document.getElementById('user_account').innerHTML = url.split("#")[1];
    document.cookie = "username=" + userEmail
    this.userProfile()
    this.openPage('Home', document.getElementsByClassName('page')[0], 'red')
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

//----------------------------------------------------------------------------------------
//user record page
//----------------------------------------------------------------------------------------
function userRecord(){
    var account = document.getElementById('user_account').innerHTML
    
    /*fetch(`https://140.136.150.95:3000/user/record`,{
		method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({account})
	})*/
}


//----------------------------------------------------------------------------------------
//coach change page
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
/*
var url = window.location.href;
var account = url.split("#")[1];
var total_student = 0;
var classNo = 1;
console.log(account);
~async function() {
	await fetch('https://140.136.150.95:3000/coachStu',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({classNo})
	}).then(res =>{
		return res.json()
	}).then(data =>{
		console.log(data);
		total_student = data.result.length
		for(var i = 0 ; i < total_student ; i++)
		{	
			if(account == data.result[i].account) 
			{	
				document.getElementById('ShowData').innerHTML += '<br><br><div id = "text">' +  data.result[i].account + '</div><br>' ;
				document.getElementById('ShowData').innerHTML += '</td>';
				document.getElementById('ShowData').innerHTML += '<td>';
				document.getElementById('ShowData').innerHTML += '<div id = "class">' + 'class : ' + data.result[i].class + '</div>';
				document.getElementById('ShowData').innerHTML += '<div id = "body_weight">' + 'body weight : ' + data.result[i].weight + '</li>' + '</div>';
				document.getElementById('ShowData').innerHTML += '<div id = "height">' + 'height : ' + data.result[i].height + '</div>';
                steps(data.result[i].userId);
				heart(data.result[i].userId);
				distance(data.result[i].userId);
                kcal(data.result[i].userId);
			}
		}
	})
}();
var userId;
function steps(userId) {
	fetch('http://140.136.150.95:3000/coachStu/stuFitbit',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({userId})
		}).then(res =>{
			return res.json()
		}).then(data =>{
			console.log(data);
			document.getElementById('ShowData').innerHTML +='<div id = "step_count">' + 'Step count : ' + data.result[1].steps + '</div>';
		})
}
function heart(userId) {
	fetch('http://140.136.150.95:3000/coachStu/stuFitbit',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({userId})
	}).then(res =>{
		return res.json()
	}).then(data =>{
		console.log(data);
		document.getElementById('ShowData').innerHTML += '<div id = "Heartbeat">' + 'Heartbeat : ' + data.result[1].heart + '</div>';
	})
}
function distance(userId) {
	fetch('http://140.136.150.95:3000/coachStu/stuFitbit',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({userId})
	}).then(res =>{
		return res.json()
	}).then(data =>{
		console.log(data);
		document.getElementById('ShowData').innerHTML += '<div id = "Distance">' + 'Distance : ' + data.result[1].km + ' KM'  + '</div>';
	})
}
function kcal(userId) {
	fetch('http://140.136.150.95:3000/coachStu/stuFitbit',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({userId})
	}).then(res =>{
		return res.json()
	}).then(data =>{
		console.log(data);
		document.getElementById('ShowData').innerHTML += '<div id = "Calories">' + 'Calories : ' + data.result[1].kcal + '</div>';
	})
}
*/




