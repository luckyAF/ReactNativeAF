'use strict'

const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';
const LOGGED_ERROR = 'LOGGED_ERROR';
const LOGGED_DOING = 'LOGGED_DOING';

function logIn(id: string, pwd: string) {
    return dispatch({
        type: LOGGED_OUT,
        data: {
            id: id,
            pwd:pwd,
        }  
    });
}

function logOut() { 
    return dispatch({
      type: LOGGED_OUT,
    });
}

module.exports = {};