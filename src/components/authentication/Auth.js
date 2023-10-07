import React, { useRef, useState } from "react";
import './Auth.css'
import CloseIcon from '@mui/icons-material/Close';
import { logIn, register } from '../../Services/firebase';


function Auth(props) {
    const [errorMessages, setErrorMessages] = useState({});
    const [processing, setProcessing] = useState(false);
    const [isRegister, setSignup] = useState(false);
    const loginFormRef = useRef();

    const errors = {
        uname: "invalid username",
        pass: "invalid password",
        passStrength: "Password should be at least 6 characters",
        emailInUse: "Email Already In Use"
    };

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();
        setProcessing(true);
        switch (isRegister) {
            case false:
                var { uname, pass } = document.forms[0];
                // Find user login info
                // const userData = database.find((user) => user.username === uname.value);
                let token = await logIn(uname.value, pass.value);
                if (token.user) {
                    setProcessing(false);
                    props.setIsLogin(true)
                    props.setIsOpen(false)
                }
                else {
                    setProcessing(false);
                    switch (token) {
                        case 'Firebase: Error (auth/wrong-password).':
                            setErrorMessages({ name: "pass", message: errors.pass });
                            break;
                        case 'Firebase: Error (auth/invalid-email).':
                            setErrorMessages({ name: "uname", message: errors.uname });
                            break;
                        default:
                            setErrorMessages({ name: "uname", message: errors.uname });
                    }
                }
                break;
            case true:
                var { name, uname, pass } = document.forms[0];
                let reg_token = await register(name.value, uname.value, pass.value);
                console.log(reg_token);
                if (reg_token.user) {
                    setProcessing(false);
                    props.setIsLogin(true)
                    props.setIsOpen(false)
                }
                else {
                    setProcessing(false);
                    switch (reg_token) {
                        case 'Firebase: Error (auth/email-already-in-use).':
                            setErrorMessages({ name: "emailInUse", message: errors.emailInUse });
                            break;
                        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                            setErrorMessages({ name: "passStrength", message: errors.passStrength });
                            break;
                        default:
                            setErrorMessages({ name: "uname", message: errors.uname });
                    }
                }
                break;
            default:
                setErrorMessages({ name: "uname", message: errors.uname });
        }
    };


    // close form

    const onCloseClick = () => {
        props.setIsOpen(false)
    }

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const toggleForm = (tval) => {
        setSignup(!tval)
    }

    // JSX code for login form
    const renderForm = (
        <div>
            <div id='form-mask'></div>
            <div className="form" ref={loginFormRef}>
                <CloseIcon onClick={onCloseClick} className="close-icon"></CloseIcon>
                <form onSubmit={handleSubmit}>
                    {isRegister ? <div className="input-container">
                        <label>Name </label>
                        <input type="text" name="name" required />
                        {renderErrorMessage("name")}
                    </div> : null}
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required />
                        {isRegister ? renderErrorMessage("emailInUse") : renderErrorMessage("uname")}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required />
                        {isRegister ? renderErrorMessage("passStrength") : renderErrorMessage("pass")}
                    </div>
                    <div className="login-button-container">
                        <input disabled={processing} type="submit" />
                    </div>
                    {isRegister ? null : <div className="login-button-container">
                        <input type='button' onClick={() => toggleForm(isRegister)} value='register' />
                    </div>}
                    {isRegister ? <div className="login-button-container">
                        <input type='button' onClick={() => toggleForm(isRegister)} value="login" />
                    </div> : null}
                </form>
            </div>
        </div>
    );
    return renderForm;
}

export default Auth;
