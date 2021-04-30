/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
const baseUrl = "http://localhost:8080/api/";
function httpGet(add_url){
    let x = new XMLHttpRequest();
    x.open("GET", baseUrl + add_url, false);
    x.send(null);
    return x;
}