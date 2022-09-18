import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from "react-router-dom"
import { authenticate, isAuthenticated, signin } from '../auth/helper';


const Signin = () => {

    const [values, setValues] = useState({
        name: "",
        email: "test5@test.dev",
        password: "12345",
        error: "",
        success: false,
        loading: false,
        didRedirect: false,
        prevSession: false
    })

    const { name, email, password, error, success, loading, didRedirect, prevSession } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                console.log("DATA", data);
                if (data.token) {
                    //let session_token = data.token;
                    authenticate(data, () => {
                        console.log("TOKEN ADDED");
                        setValues({
                            ...values,
                            didRedirect: true,
                        })
                    })
                } else {
                    setValues({ ...values, loading: false, prevSession: true })
                }
            })
            .catch(err => console.log(err))
    }

    const performRedirect = () => {
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        if (loading) {
            return (
                <div className="alert alert-info">
                    Loading...
                </div>
            )
        } else if (prevSession) {
            return (
                <div className="alert alert-danger">
                    Previous session exists!
                </div>
            )
        }

    }

    const successMessage = () => {
        return (
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className='alert alert-success'
                        style={{ display: success ? "" : "none" }}>
                        New account created successfully. Please
                        <Link to="/signin">login now. </Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className='alert alert-danger'
                        style={{ display: error ? "" : "none" }}>
                        Check all fields again.
                    </div>
                </div>
            </div>
        )
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">

                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email"
                                className='form-control'
                                value={email}
                                onChange={handleChange("email")} />
                        </div>
                        <div className="form-group py-3">
                            <label className="text-light">Password</label>
                            <input type="password"
                                className='form-control'
                                value={password}
                                onChange={handleChange("password")} />
                        </div>
                        <button
                            onClick={onSubmit}
                            className="form-control btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    }


    return (
        <Base title='Welcome to signin page' description='Tshirt Store'>
            {loadingMessage()}
            {signInForm()}
            <p className='text-center '>{JSON.stringify(values)}</p>
            {performRedirect()}
        </Base>
    );
};

export default Signin;