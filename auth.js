import axios from 'axios';

// ! constanty pro práci metod
//#region Constanty
const localtoken = 'token';
const localexpire = 'token_expire';

const settings = require('../settings.json');
const tokenexp = settings.tokenexpiration;
const isdebug = settings.debug;
//#endregion

// handle nastavení debugu
//#region Debug handle
var writelog = console.log;
var writeerr = console.error;

console.log = function(log){
    if (isdebug){
        writelog(log);
    }
}

console.error = function(error){
    if (isdebug){
        writeerr(error);
    }
}
//#endregion

// ! zbytek metod
// TODO : password reset, password change
//#region Funkce
// funkce pro přihlašování uživatele
export const logIn = (username, password, server, success, fail) => {
        axios.post(`${server}/rest-auth/login/`, {username:username, password:password})
            .then(res => {
                writeToken(res.data.key, settings.tokenexpiration);
                expireCheckMin(tokenexp);
                success();
            })
            .catch(err => {
                console.error(err);
                fail(err);
            });
}

// registrace
export const register = (
    username,
    email, 
    password1,
    password2,
    server,
    success,
    fail) => {
        axios.post(`${server}/rest-auth/registration/`,{
                username:username,
                email:email,
                password1:password1,
                password2:password2
            })
            .then(res => {
                localStorage.setItem(localtoken, res.data.key);
                success();
                expireCheckMin(tokenexp);
            })
            .catch(err => {
                console.error(err);
                fail(err);
            });
        
    
}

// nooooo..... log out
export const logOut = (server, success) => {
    clearToken();
    success();
}

// vymaže token potom co vyprší jeho platnost
// čas je v sekundách
export const expireCheck = (time) => {
    console.log("expire started ",time);
    isAuthenticatedRefresh(()=>{
        console.log("refresed");
        writeToken(getTokenClear(), new Date().getTime() + settings.tokenexpiration * 1000 * 60);
        setTimeout(expireCheck, settings.tokenexpiration * 1000 * 60)
        },
        ()=>{
            console.log("clear");
            clearToken();});
}

// expire check ale v minutách
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
export const isAuthenticatedRefresh = (success, fail) => {
    console.log(settings.server_address);
    console.log("refresh started");
    if (!isAuthenticated()){
        fail();
        return;
    }
    axios.get(`${settings.server_address}/rest-auth/user/`, {headers: { "Authorization": getToken() }})
        .then(res => success())
        .catch(err => fail());
}

// startnutí appky
export const start = (server) => {
    let token = getTokenClear();
    if (token === undefined || token === null) return false;
    isAuthenticatedRefresh(server, 
        ()=>{
            const expire = getExpire();
            const timenow = new Date().getTime();
            if (expire <= timenow){
                clearToken();
            }
            else{
                expireCheck((expire - timenow)/1000);
            }
        },
        ()=>{clearToken()});

}

// tvar tokenu pro header
export const getToken = () => {
    return `Token ${localStorage.getItem(localtoken)}`;
}

// dostat token aby se nemuselo líst do localStorage
export const getTokenClear = () => {
    return localStorage.getItem(localtoken);
}

// zapsání tokenu
export const writeToken = (key, time) => {
    localStorage.setItem(localtoken, key);
    localStorage.setItem(localexpire, new Date().getTime() + time * 1000 * 60);
}

// vymazaní tokenů
export const clearToken = () => {
    localStorage.removeItem(localtoken);
    localStorage.removeItem(localexpire);
}

// získání expire z localstorage
export const getExpire = () => {
    return localStorage.getItem(localexpire);
}

// loadnutí usera ze serveru
export const getUser = (server, success, fail) => {
    if (!isAuthenticated()) return false;

    axios.get(`${server}/rest-auth/user/`, {headers: { "Authorization": getToken() }})
        .then(res => {
            console.log(res.data);
            success(res.data);
        })
        .catch(err =>{
            console.error(err);
            fail(err);
        });
}

// změna hesla
export const changePassword = (password1, password2, server, success, fail) => {
    axios.post(`${server}/rest-auth/password/change/`, 
                {
                    headers : { "Authorization": getToken() },
                    data : {
                        password1:password1,
                        password2:password2
                    }
                })
                .then(res => console.log(res));
}

// dotaz na server pro odeslání hesla pro reset hesla
export const sendPasswordReset = () => {

}

// samotný reset
export const resetPassword = () => {

}

// změna informací o userovi
export const updateUser = (
    pk,
    username,
    email,
    password,
    first_name,
    last_name,
    server,
    success,
    fail) => {
    axios.put(`${server}/rest-auth/user/update/${pk}/`,
            {
                username:username,
                email:email,
                password:password,
                first_name:first_name,
                last_name:last_name
            },
            {headers : { "Authorization": getToken() }})
            .then(res => {
                console.log(res.data);
                success();
            })
            .catch(err => {
                console.error(err);
                fail(err);
            });
}
//#endregion