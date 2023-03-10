import axios from "axios";
import logo from "./logo.svg";
// import "./App.css";
import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import Sidebar from "./components/sidebar";
import routes from './routes/routes';
import { Routes, Route } from 'react-router-dom';

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);
  // return (
  //   <ChakraProvider>
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         {message}
  //       </header>
  //     </div>
  //   </ChakraProvider>
    
  // );
  return(
    <>
      <Routes key={'route'}>
        {routes.map((val, key) => {
          return <Route exact path={val.path} element={val.element} key={key} />;
        })}
      </Routes>
    </>
  )
}

export default App;
