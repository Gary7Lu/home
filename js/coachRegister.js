function submit(){
	var account = document.getElementById('user_account').value
  	var password = document.getElementById('user_password').value
	var name = document.getElementById('user_name').value
	var classNo = document.getElementById('user_class').value
	console.log(account)
    if(classNo =='') classNo = null;
    
    fetch(`https://140.136.150.95:3000/coach/register`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({account, password, name, classNo})
    }).then(res =>{
        return res.json()
    }).then(data =>{
        if(data.exist == 'true'){
        console.log('account exist')
        document.getElementById('message').innerHTML = "account exist"
        }
        else{
        console.log('register success')
        window.location.href = 'coachlogin.html#' + data.account
        }
    })
}