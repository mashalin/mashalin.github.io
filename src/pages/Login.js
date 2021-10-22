import React, { useContext } from "react";
import MyButton from "../Components/UI/button/MyButton";
import MyInput from "../Components/UI/input/MyInput";
import { AuthContext } from "../context";

function Login() {

    const { setIsAuth} = useContext(AuthContext);

    const login = e => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }

    return(
        <div>
           <h2 className='login-title'>Войдите чтобы продолжить</h2>
           <form onSubmit={login}>
              <div className="login-inputs">
              <MyInput type="text" placeholder='Введите логин' />
               <MyInput type="password" placeholder='Введите пароль' />
              </div>
               <MyButton>Войти</MyButton>
           </form>
        </div>
    );
}

export default Login;