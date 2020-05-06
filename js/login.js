//----------------------------------------------------------------------------------------
//user login
//----------------------------------------------------------------------------------------
function userlogin(){
  var account = document.getElementById('user_account').value
  var password = document.getElementById('user_password').value
  fetch(`https://140.136.150.95:3000/userlogin`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({account, password})
  }).then(res =>{
    return res.json()
  }).then(data =>{
    if(data.exist == 'true'){
      console.log('login success')
      window.location.href = 'userlogin.html#' + data.account
    }
    else{
      console.log('fail!!')
      document.getElementById('message').innerHTML = "Fail!"
    }
  })
}

//----------------------------------------------------------------------------------------
//user register
//----------------------------------------------------------------------------------------
function userregister(){
  window.location.href = 'register.html'
}

//----------------------------------------------------------------------------------------
//coach login
//----------------------------------------------------------------------------------------
function coachlogin(){
  var account = document.getElementById('coach_account').value
  var password = document.getElementById('coach_password').value
  fetch(`https://140.136.150.95:3000/coachlogin`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({account, password})
  }).then(res =>{
    return res.json()
  }).then(data =>{
    if(data.exist == 'true'){
      console.log('login success')
      window.location.href = './coachlogin.html#' + data.account
    }
    else{
      console.log('fail!!')
      document.getElementById('message').innerHTML = "Fail!"
    }
  })
}

//----------------------------------------------------------------------------------------
//coach register
//----------------------------------------------------------------------------------------
function coachregister(){
  window.location.href = 'coachRegister.html'
}

//----------------------------------------------------------------------------------------
//switch student login or coach login
//----------------------------------------------------------------------------------------
function switchToCoach(){
  document.getElementById('stu-container').style.display = "none";
  document.getElementById('coach-container').style.display = "block";
  document.getElementById('switchToCoach').style.backgroundColor = '#adadad';
  document.getElementById('switchToStu').style.backgroundColor = 'white';
}
function switchToStu(){
  document.getElementById('coach-container').style.display = "none";
  document.getElementById('stu-container').style.display = "block";
  document.getElementById('switchToStu').style.backgroundColor = '#adadad';
  document.getElementById('switchToCoach').style.backgroundColor = 'white';
}