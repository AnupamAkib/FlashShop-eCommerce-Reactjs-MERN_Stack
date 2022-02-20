import axios from "axios";
import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import data from './data.json'

function checkAdmin() {
    let username = localStorage.getItem("u");
    let password = localStorage.getItem("p");

    for (let i = 0; i < data.length; i++) {
        let adminUserName = data[i].user;
        let adminPassword = data[i].pass;
        if (username == adminUserName && password == adminPassword) {
            return true;
        }
    }
    return false;
}
export { checkAdmin }