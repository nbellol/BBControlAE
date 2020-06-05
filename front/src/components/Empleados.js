import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";


const Empleados = (props) => {
  const [nombres, setNombres] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [ganacias, setGanacias] = useState([]);
  const [activos, setActivos] = useState([]);

  useEffect(() => {
    fetch("./nombresEmpleados")
      .then((res) => res.json())
      .then((res) => {
        setNombres(res);
      });
    fetch("./orderesEmpleados")
      .then((res) => res.json())
      .then((res) => {
        setOrdenes(res);
      });
    fetch("./gananciasEmpleados")
      .then((res) => res.json())
      .then((res) => {
        setGanacias(res);
      });
    fetch("./empleadosActivos")
      .then((res) => res.json())
      .then((res) => {
        setActivos(res);
      });
  }, []);
  /*function printEmpleados() {
    if (empleados.length != 0) {
      return <h1>{empleados[0].firstName}</h1>;
    }
  }
  <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar", x: { nombres }, y: [2, 5, 3, 4, 3, 6] },
        ]}
        layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
      />
  */
  return (
    <div>
    <h2>BBC Employees Graphs</h2>
    <div>
    <br></br>
      <h3>Which is the waiter that services more orderes in a week?</h3>
      <Plot
        data={[
          {
            type: "bar",
            x: nombres,
            y: ordenes,
            transforms: [
              {
                type: "sort",
                target: "x",
                order: "descending",
              },
            ],
          },
        ]}
        layout={{
          margin: { l: 120 },
          width: 600,
          height: 600,
          title: "Quantity of orders per waiter",
          xaxis: { title: "Waiters" },
        }}
      />
    </div>
    <div>
    <br></br>
      <h3>Which is the waiter that bring more profits in a week?</h3>
      <Plot
        data={[
          {
            type: "bar",
            x: nombres,
            y: ganacias,
            transforms: [
              {
                type: "sort",
                target: "x",
                order: "descending",
              },
            ],
          },
        ]}
        layout={{
          margin: { l: 120 },
          width: 600,
          height: 600,
          title: "Profit per Waiter",
          xaxis: { title: "Waiters" },
        }}
      />
    </div>
    <div>
    <br></br>
      <h3>How many waiters are active in the ongoing Shift?</h3>
      <Plot
        data={[
          {
            type: "bar",
            x: activos,
            y: ['Active', 'Inactive'],
            orientation:"h",
            transforms: [
              {
                type: "sort",
                target: "x",
                order: "descending",
              },
            ],
          },
        ]}
        layout={{
          margin: { l: 120 },
          width: 600,
          height: 600,
          title: "Active waiters",
          xaxis: { title: "Number of active waiters" },
        }}
      />
    </div>
    </div>
  );
};
export default Empleados;
