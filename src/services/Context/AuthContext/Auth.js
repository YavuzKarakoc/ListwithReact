// import {
//     useState,
//     useEffect,
//     createContext,
//     useContext,
//   } from 'react';
// import Login from '../../../Pages/Login';
  
//   const initAuthContextPropsState = {
//     userToken: undefined,
//     setUserToken: () => {},
//     logout: () => {},
//   };
  
//   const AuthContext = createContext(initAuthContextPropsState);
  
//   const useAuth = () => {
//     return useContext(AuthContext);
//   };
  
//   const AuthProvider = ({ children }) => {
//     const [userToken, setUserToken] = useState();
  
//     const logout = () => {
//         setUserToken(undefined);
//     };
  
//     return (
//       <AuthContext.Provider value={{ userToken, setUserToken, logout }}>
//         {children}
//       </AuthContext.Provider>
//     );
//   };
  
 



//   export { AuthProvider, useAuth };