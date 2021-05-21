function setCookie(cname , cvalue, exdays) {

    try {
        if(exdays != ''){
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        else{

            var d = new Date();
            d.setTime(d.getTime() + (365*24*60*60*1000));
            var expires = "expires=" + d.toGMTString();

            alert(expires)
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }  

        var obj = {
            name:cname,
            value:cvalue
        }

        return obj

    } catch (error) {
        return error
    }
        
}

function getCookie(cname) {


    try {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "undefined";

    } catch (error) {
        return error;
    }
}

function removeCookie(cname) {
    try {
        document.cookie = cname +  "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return 'success'
    } catch (error) {
        return error;
    }

} 

function deleteAllCookies() { 

    try{
        var allCookies = document.cookie.split(';'); 
    
        for (var i = 0; i < allCookies.length; i++) 
            document.cookie = allCookies[i] + "=;expires=" 
            + new Date(0).toUTCString(); 

        return 'success'
    
    } catch (error) {
        return error;
    }

} 

function getCookiesObject() {
    try {
        var pairs = document.cookie.split(";");
        var cookies = {};
        for (var i=0; i<pairs.length; i++){
          var pair = pairs[i].split("=");
          cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
        }
        return cookies;
    } catch (error) {
        return error;
    }

} 


var Cookie = {
    set : function(name, value, ex) { 
        
        return setCookie(name, value, ex) 
    },
    get : function(name) { 
        
        return getCookie(name) 
    },
    delete : function(name) { 
        
        return removeCookie(name) 
    },
    clear : function(name) { 
        
        return deleteAllCookies(name) 
    },
    obj : function(name) { 
        
        return getCookiesObject() 
    }

}