import React from "react";
import { Formik, Field, Form } from "formik";
import "../Login/style.css";
import {Link} from "react-router-dom"


const Login = () => {

    let username=""
    let password=""
  const login = (loginModel) => {
    console.log(loginModel);
    const credentials = `${loginModel.userName}:${loginModel.userPassword}`;

    const base64Credentials = btoa(credentials);

    const requestBody = JSON.stringify({ username, password });

    fetch('https://efatura.etrsoft.com/fmi/data/v1/databases/testdb/sessions', {
        method: 'POST', // POST veya diğer HTTP yöntemleri
        headers: {
          'Authorization': `Basic ${base64Credentials}`,
          'Content-Type': 'application/json', 
        },
        body: {},
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ response: data });
        })
        .catch(error => {
          console.error('Hata:', error);
        });
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={{ userName: "", userPassword: "" }}
          onSubmit={async (values) => {
            login(values);
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
                <Link to="/debtlist">
                <button type="submit">Giriş Yap</button>
                </Link>
                <strong>Direkt butona basabilirsiniz</strong>
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
