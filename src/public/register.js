/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

function register(){
    let userName = document.getElementById('l-uname-i').value;
    let password = document.getElementById('l-pwd-i').value;
    let passwordC = document.getElementById('l-pwd-i-c').value;
    if(password !== passwordC || password.length < 10){
        if(password !== passwordC){
            document.getElementById('error_msg').innerText = 'The passwords does not match.'
        }else  if(password.length < 10){
            document.getElementById('error_msg').innerText = 'The passwords is not long enough. (> 10)'
        }
        new bootstrap.Toast(document.getElementById('error_alert'), {}).show();
    }else {
        let registerRequest = httpGet("createUser/" + userName + "/" + CryptoJS.MD5(password).toString())
        if(registerRequest.status === 200){
            let tokenRequest = httpGet("createToken/" + userName + "/" + CryptoJS.MD5(password).toString());
            if(tokenRequest.status === 200){
                setCookie('craft_account_access_token', JSON.parse(tokenRequest.responseText).token, 64);
                window.location.assign('dashboard/index.html')
            }else {
                document.getElementById('error_msg').innerText = 'Something went wrong. Please contact MCTzOCK#0047 on Discord. Additional information: ' + tokenRequest.responseText;
            }
        }else {
            document.getElementById('error_msg').innerText = 'The username is already in use.';
            new bootstrap.Toast(document.getElementById('error_alert'), {}).show();
        }
    }
}