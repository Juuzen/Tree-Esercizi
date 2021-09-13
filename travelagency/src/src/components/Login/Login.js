import React, { useState, useEffect } from 'react'
import { sha512 } from 'js-sha512'
import { useHistory } from 'react-router-dom'
export default function Login() {

    const history = useHistory()
    //rappresentano la mail e la password che l'utente inserisce dal form di login 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //rappresentano la mail e la password dell'utente ADMIN in storage
    const [registerdEmail, setRegEmail] = useState('')
    const [registerdPassword, setRegPass] = useState('')

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        if (email === '' || email === undefined) {
            e.preventDefault()
        } else if (password === '' || password === undefined) {
            e.preventDefault()
        } else if (email === registerdEmail && sha512(password) === registerdPassword) {
            //login OK 
            window.localStorage.setItem('sessionToken', JSON.stringify(registerdPassword))
            history.push("/dashboard")

        } else {
            alert('Credenziali errate')
        }
    }

    useEffect(() => {
        if (window.localStorage.getItem('user')) {
            let registeredUser = JSON.parse(window.localStorage.getItem('user'))
            setRegEmail(registeredUser.email)
            setRegPass(registeredUser.password)
        }
    }, [])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input onChange={(e) => changeEmail(e)} type="email" className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input onChange={(e) => changePassword(e)} type="password" className="form-control"></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Accedi</button>
                    </form>
                </div>
            </div>
        </div>
    )
}