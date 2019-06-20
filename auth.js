import axios from 'axios';

// ! constanty pro práci metod
//#region Constanty
const localtoken = 'token';
const localexpire = 'token_expire';

const settings = require('../../settings.json');
const tokenexp = settings.tokenexpiration;
//#endregion

// ! eventy a pomocné metody pro ně
//#region Eventy
// pomocná funkce která se spustí při lognutí
let eventLog = () => {
    console.log('logged')
}

// event na logout
let eventLogOut = () => {
    console.log('logout');
}

// funkce co se spustí při successu isAuthenticatedRefresh
let eventRefreshSucc = () => {
    console.log("refreshed");
}

// funkce co se spustí při failu isAuthenticatedRefresh
let eventRefreshFail = () => {
    console.error("epic fail");
}

let eventFail = () => {
    console.error("epic fail");
}

// zapisování do event log
// auth.logged([funkce co se má stát po lognutí])
export let logged = (fce) => {
    eventLog = fce;
}

export let loggedOut = (fce) => {
    eventLogOut = fce;
}

// zapisování metod do eventu spojených s isAuthenticatedRefresh
export let refreshed = (success, fail) => {
    eventRefreshSucc = success;
    eventRefreshFail = fail;
}

export let authError = (fce) => {
    eventFail = fce;

}
//#endregion

// ! zbytek metod
// TODO : password reset, password change, start
//#region Funkce
// funkce pro přihlašování uživatele
export const logIn = (username, password, server) => {
        axios.post(`${server}/rest-auth/login/`, {username:username, password:password})
            .then(res => {
                writeToken(res.data.key, settings.tokenexpiration);
                //localStorage.setItem(localtoken, res.data.key);
                expireCheckMin(tokenexp);
                eventLog();
            })
            .catch(err => {
                console.error(err);
                eventFail(err);
            });
}

// registrace
export const register = (
    username,
    email, 
    password1,
    password2,
    server) => {
        axios.post(`${server}/rest-auth/registration/`,{
                username:username,
                email:email,
                password1:password1,
                password2:password2
            })
            .then(res => {
                localStorage.setItem(localtoken, res.data.key);
                eventLog();
                expireCheckMin(tokenexp);
            })
            .catch(err => {
                console.error(err);
                eventFail(err);
            });
        
    
}

// nooooo..... log out
export const logOut = (server) => {
    clearToken();
    eventLogOut();
}

// vymaže token potom co vyprší jeho platnost
// čas je v sekundách
export const expireCheck = (time) => {
    console.log("expire started ",time);
    let interval = setInterval(function(){
        refreshed(()=>{
            console.log("refresed");
            writeToken(getTokenClear(), new Date().getTime() + settings.tokenexpiration * 1000 * 60);
        },
        ()=>{
            console.log("clear");
            clearToken();
            clearInterval(interval);
        })
        isAuthenticatedRefresh()
    }, time * 1000)
}

export const expireCheckMin = (time) => {
    console.log("expire started min ",time);
    expireCheck(time * 60);
}

// jestli je uživatel přihlášen
export const isAuthenticated = () => {
    const token = localStorage.getItem(localtoken);
    if (token === null || token === null) return false;
    return true;
}

// jestli je přihlášen + check i na serveru
// 
export const isAuthenticatedRefresh = () => {
    console.log(settings.server_address);
    console.log("refresh started");
    if (!isAuthenticated()){
        eventRefreshFail();
        return;
    }
    axios.get(`${settings.server_address}/rest-auth/user/`, {headers: { "Authorization": getToken() }})
        .then(res => eventRefreshSucc())
        .catch(err => eventRefreshFail());
}

// startnutí appky
export const start = (server) => {
    let token = getTokenClear();
    if (token === undefined || token === null) return false;
    refreshed(()=>{
        const expire = getExpire();
        const timenow = new Date().getTime();
        if (expire <= timenow){
            clearToken();
        }
        else{
            expireCheck((expire - timenow)/1000);
        }
    },()=>{clearToken()});
    isAuthenticatedRefresh(server);

}

// dostat token aby se nemuselo líst do localStorage
export const getToken = () => {
    return `Token ${localStorage.getItem(localtoken)}`;
}

export const getTokenClear = () => {
    return localStorage.getItem(localtoken);
}

export const writeToken = (key, time) => {
    localStorage.setItem(localtoken, key);
    localStorage.setItem(localexpire, new Date().getTime() + time * 1000 * 60);
}

export const clearToken = () => {
    localStorage.removeItem(localtoken);
    localStorage.removeItem(localexpire);
}

export const getExpire = () => {
    return localStorage.getItem(localexpire);
}
//#endregion