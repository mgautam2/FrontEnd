class HandleCookies {
    setCookie(c_name,value,exdays){ 
        let exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        let c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }

    getCookie(c_name) {
        let c_value = document.cookie;
        let c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) { 
            c_value = null;
        } else {   
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {  
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start,c_end));
        }
        return c_value;
    }

    checkCookie() {
        let ret = false;
        let c = this.getCookie("visited");
        console.log(document.cookie);
        if (c === "yes") {
            ret = true;
        } 
        this.setCookie("visited", "yes", 365);
        return ret;
    }
}

export const handleCookies = new HandleCookies();