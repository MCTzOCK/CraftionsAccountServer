/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
if(getCookie("craft_account_access_token") !== null){
    let token = getCookie("craft_account_access_token");
    let loginRequest = httpGet("getData/" + token + "/name");
    if(loginRequest.status === 200){
        window.location.assign('dashboard/index.html')
    }else {
        eraseCookie("craft_account_access_token")
    }
}