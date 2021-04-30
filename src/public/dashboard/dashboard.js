/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

function createToken(){
    let tokenRequest = httpGet("createTokenT/" + getCookie('craft_account_access_token'))
    if(tokenRequest.status === 200){
        document.getElementById('generatedToken').innerText = JSON.parse(tokenRequest.responseText).token;
    }else {
        document.getElementById('generatedToken').innerText = 'There was an error generating your token! Try to logout and login again.'
    }
    new bootstrap.Modal(document.getElementById('tokenGenPopup'), {}).show()
}

function logout(){
    eraseCookie("craft_account_access_token");
    window.location.assign("/")
}