import React, { useState, useEffect } from "react";
import logo from './components/images/LOGO.jpg';

import "./App.css";
import Empleados from "./components/Empleados";
import Reservas from "./components/Reservas";
import Promos from "./components/Promos";
import Customer from "./components/Customers";
import Orders from "./components/Orders";
function App() {
  return (
    <div className="App">
      <h1>BBControl Analytics Engine</h1>
      <img src={logo} alt="Logo" height="250"/>
      <Empleados></Empleados>
      <Reservas></Reservas>
      <Promos></Promos>
      <Customer></Customer>
      <Orders></Orders>
    </div>
  );
}

export default App;
