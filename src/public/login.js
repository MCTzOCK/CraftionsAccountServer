/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
function login(){
    let userName = document.getElementById('l-uname-i').value;
    let password = document.getElementById('l-pwd-i').value;
    password = CryptoJS.MD5(password).toString();
    let loginRequest = httpGet("login/" + userName + "/" + password);
    if(loginRequest.status === 200){
        let tokenRequest = httpGet("createToken/" + userName + "/" + password)
        if(tokenRequest.status === 200){
            let token = JSON.parse(tokenRequest.responseText).token;
            setCookie("craft_account_access_token", token, 64)
            window.location.assign('dashboard/index.html')
        }else {
            new bootstrap.Toast(document.getElementById('error_alert'), {}).show();
        }
    }else {
        new bootstrap.Toast(document.getElementById('error_alert'), {}).show();
    }
}