function submit(){
	var account = document.getElementById('user_account').value
  	var password = document.getElementById('user_password').value
	var name = document.getElementById('user_name').value
	var height = document.getElementById('user_height').value
	var weight = document.getElementById('user_weight').value
	var classNo = document.getElementById('user_class').value
	console.log(account)
	console.log(password)
	if(height =='') height = null;
	if(weight =='') weight = null;
	if(classNo =='') classNo = null;

	fetch(`https://140.136.150.95:3000/user/register`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({account, password, name, height, weight, classNo})
  }).then(res =>{
    return res.json()
  }).then(data =>{
	console.log(data)
	if(data.exist=='true') alert('user exist')
    window.location.href = 'userlogin.html#' + data.account
  })
}