//const isProductPage = document.querySelector('.product') ? true : false;
var cookieName = 'recently_viewed_product';

function setCookie(cname, cvalue) {
    let expires = "expires= Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkCookie() {
    let cookie = getCookie(cookieName);
    if (cookie != "") {
        return true;
    } else {
       return false;
    }
}

//if(isProductPage) {
    var productJson = JSON.parse(document.querySelector('[data-product-json]').innerHTML);
    var ProductHandle = productJson.handle;
    var maxItems = document.body.getAttribute('data-recently-view-items');
    var cookieProducts = [];

    if (checkCookie()) {
        cookieProducts = JSON.parse(getCookie(cookieName));

        for (var i = cookieProducts.length; i--;) {
            if (cookieProducts[i] === ProductHandle) {
                cookieProducts.splice(i, 1);
                break;
            }
        }
        if (cookieProducts.length == maxItems) cookieProducts.shift();
    }

    cookieProducts.push(ProductHandle);
    setCookie(cookieName, JSON.stringify(cookieProducts));
//}

