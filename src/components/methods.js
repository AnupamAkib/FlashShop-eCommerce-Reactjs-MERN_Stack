import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function msg(m, color, closeTime) {
    if (color == 'green') {
        toast.success(m, { position: toast.POSITION.BOTTOM_CENTER, autoClose: closeTime })
    }
    else if (color == 'red') {
        toast.error(m, { position: toast.POSITION.BOTTOM_CENTER, autoClose: closeTime })
    }
    else {
        toast.info(m, { position: toast.POSITION.BOTTOM_CENTER, autoClose: closeTime })
    }
}

function number(s) {
    let bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    s = String(s);
    let res = "";
    for (let i = 0; i < s.length; i++) {
        res += bn[parseInt(s[i])];
    }
    return res;
}

function todaysDateTime() {
    const d = new Date();
    const year = d.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();

    let t = day + " " + month + " " + year + ", " + hour + ":" + minute;
    return t;
}

export { number, msg, todaysDateTime };