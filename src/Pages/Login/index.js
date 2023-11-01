import React from "react";
import { Formik, Field, Form } from "formik";
import "../Login/style.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const apigetrequest = () => {
    fetch("http://localhost:3000/", {
      method:"GET",
      headers:{
        "Content-Type": "application/json"
      },
    }).then(response => response.json())
    .then((response)=> console.log(response.fkdata))
    .catch((error)=>{console.log("front-başarısız")})

  };



  // .net core için ayarlanmış başarılı login isteği
  // const _login=async (loginModel) =>{
  //   const username = loginModel.userName;
  //   const password = loginModel.userPassword;
    
  //  await fetch('https://localhost:44374/Home/GetToken', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username, password }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       localStorage.setItem('token', data.response.token);
  //       navigate('/debtlist', {replace:true})
       
  //     })
  //     .catch(error => {
  //       console.error('Hata:', error);
  //     });

  //     return <Navigate to="/debtlist" replace />
  // }

  const _login=async (loginModel) =>{
    const username = loginModel.userName;
    const password = loginModel.userPassword;
    
   await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('token', data.response.token);
        navigate('/debtlist', {replace:true})
       
      })
      .catch(error => {
        console.error('Hata:', error);
      });

      return <Navigate to="/debtlist" replace />
  }

  return (
    <div>
      <div>
        {/* <div>
        <button className="btn btn-primary mt-4" onClick={apigetrequest}>Deneme Get isteği için bas</button>
        </div> */}
        <Formik
          initialValues={{ userName: "", userPassword: "" }}
          onSubmit={async (values) => {
           await _login(values);
          
          }}
        >
          <div className="login">
            <div className="form">
              <Form noValidate>
                <span>Login</span>

                <Field
                  type="text"
                  name="userName"
                  placeholder="Adınızı Girin"
                  className="form-control inp_text"
                  id="username"
                />

                <Field
                  name="userPassword"
                  placeholder="Şifrenizi Girin"
                  className="form-control"
                />
                
                <button type="submit">Giriş Yap</button>
                <Link to="/debtlist">
                
                </Link>
                
              </Form>
            </div>
          </div>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';

// function App() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     const basicAuth = `${username}:${password}`;
//     const base64Credentials = btoa(basicAuth);

//     fetch('https://efatura.etrsoft.com/fmi/data/v1/databases/testdb/sessions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//       },
//     })
//       .then(response => {
//         if (response.status === 200) {
//           console.log('Giriş başarılı.');
//           // Giriş başarılıysa, isteğe bağlı olarak kullanıcıyı başka bir sayfaya yönlendirebilirsiniz.
//         } else {
//           console.error('Giriş başarısız.');
//         }
//       })
//       .catch(error => {
//         console.error('Hata:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Basic Auth ile Giriş Yap</h1>
//       <input
//         type="text"
//         placeholder="Kullanıcı Adı"
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Şifre"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Giriş Yap</button>
//     </div>
//   );
// }

// export default App;
