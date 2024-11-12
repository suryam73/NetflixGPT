import React from 'react'

const CheckValidData = (email,password,name) => {

const isValidName = /^[A-ZÀ-ÿ][a-zÀ-ÿ' -]+(\s[A-ZÀ-ÿ][a-zÀ-ÿ' -]+)*$/.test(name);
const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/.test(password)

if(!isValidEmail) return 'Email is not valid';
if(!isValidPassword) return 'Password is not valid'
if(!isValidName) return 'Name is not valid'

if(isValidEmail && isValidPassword && isValidName) return null

}

export default CheckValidData