import React from 'react'
import axios from 'axios'

const getUSD_idcode = () => {
    const data = JSON.parse(localStorage.getItem('settings'));
    return data.playerID_USD_Unit_per_hundredDiamond;
}
const getUSD_idpassword = () => {
    const data = JSON.parse(localStorage.getItem('settings'));
    return data.gameLogin_USD_Unit_per_hundredDiamond;
}
const getRulesAndConditions = () => {
    const data = JSON.parse(localStorage.getItem('settings'));
    return data.rulesAndConditions;
}
const getTakeNewOrder = () => {
    const data = JSON.parse(localStorage.getItem('settings'));
    return data.takeNewOrder;
}
const getFixedNotification = () => {
    const data = JSON.parse(localStorage.getItem('settings'));
    return data.fixed_notification;
}
const getPopupNotification = () => {
    const data = JSON.parse(localStorage.getItem('settings'));
    return data.popUp_notification;
}

function fetch() {
    axios.post('https://flash-shop-server.herokuapp.com/settings/all', {
        //parameters
    })
        .then((response) => {
            localStorage.setItem("settings", JSON.stringify(response.data.result[0]))
        }, (error) => {
            console.log(error);
        });
}
export { fetch, getUSD_idcode, getUSD_idpassword, getRulesAndConditions, getTakeNewOrder, getFixedNotification, getPopupNotification }