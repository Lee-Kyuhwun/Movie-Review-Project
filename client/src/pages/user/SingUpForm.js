import $ from "jquery";
import {useRef} from"react";
import axios from "axios";
import port from "./../../data/port.json";
import { useState } from "react";
import {useCookies}from "react-cookie";


const SignUpForm = ({signUpData, onChangeSignUpData,setSingUpData}) => {
    const emailRef = useRef();
    const [errorMessage,setErrorMessage]=useState("");
    const onClickSignUpButton=()=>{
        if(signUpData.email===""){
            alert("이메일을 입력해주세요.");
            emailRef.current.focus();
            return;
        }
        
        if(signUpData.password===""){
            alert("비밀번호을 입력해주세요.");
            $("#password").focus();
            return;
        }
        if(signUpData.password===""){
            alert("비밀번호확인을 입력해주세요.");
            $("#rePassword").focus();
            return;
        }
        if(signUpData.password===""){
            alert("이름을 입력해주세요.");
            $("#name").focus();
            return;
        }

        if(signUpData.password !== signUpData.rePassword){
            alert("비밀번호와 비밀번호확인이 같지않습니다.");
           setSingUpData({
            ...signUpData,
            password:"",
            rePassword:""
           });
            $("password").focus("");
            return;
        }
       
       sendSignUpData().then(res=>{
            console.log(res.data);
            alert(res.data.result);
            window.location.reload();
        }).catch(e=>{
            console.log(e);
            setErrorMessage(e.response.data.error);
        });
    }
    
    const sendSignUpData = async() =>{
        return await axios.post(port.url+"/user/signUp",signUpData);
    }

    

    return (
        <div className="album">
            <div className="container">

                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" >Email address</label>
                        <input
                            type="email"
                            value={signUpData.email}
                            onChange={onChangeSignUpData}
                            ref={emailRef}
                            className="form-control"
                            id="email"
                            name="email"
                            aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwrod" className="form-label">Password</label>
                        <input type="password" value={signUpData.password}  onChange={onChangeSignUpData} className="form-control" id="password" name="password"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">RePassword</label>
                        <input type="password" 
                        className="form-control" value={signUpData.rePassword}    onChange={onChangeSignUpData} id="rePassword" name="rePassword"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="input" value={signUpData.name}  onChange={onChangeSignUpData}  className="form-control" id="Name" name="name"/>
                    </div>
                    <div className="mb-3">
                        <p className="text-danger">
                            {errorMessage}
                        </p>
                    </div>
                    <button type="button" onClick={onClickSignUpButton} className="btn btn-primary">회원가입</button>
                </form>

            </div>
        </div>

    )

}

export default SignUpForm;