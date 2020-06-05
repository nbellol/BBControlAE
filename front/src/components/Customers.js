import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Customers = (props) => {

    const [limits, setLimits] = useState([]);
    const [amounts, setLimitsAmount] = useState([]);
    const [ages, setAges] = useState([]);

    useEffect(() => {
        fetch("./limitCustomers")
         .then((res) => res.json())
         .then((res) => {
          setLimits(res);
        });
        fetch("./limitAmountCustomers")
         .then((res) => res.json())
         .then((res) => {
          setLimitsAmount(res);
        });
        fetch("./ageCustomers")
         .then((res) => res.json())
         .then((res) => {
          setAges(res);
        });
    },[]);

    return(
    <div>
        <h2>BBC Customers Graphs</h2>
        <div>
        <h3>What are the expenses Limits set by the users?</h3>
        <Plot
        data={[
          {
            type: "bar",
            x: limits,
            y: amounts,
           
          },
        ]}
        layout={{
          margin: { l: 120 },
          width: 600,
          height: 600,
          title: "Limits Amounts of the users",
          xaxis: { title: "Limits" },
        }}
      />
        </div>
        <div>
        <h3>How many users are in each age ranges?</h3>
        <Plot
        data={[
          {
            type: "bar",
            x: ['18 - 24','25 - 34','35 - 45','45+'],
            y: ages,
           
          },
        ]}
        layout={{
          margin: { l: 120 },
          width: 600,
          height: 600,
          title: "User age categories",
          xaxis: { title: "Ages Categories" },
        }}
      />
        </div>
    </div>
    );
};
export default Customers;
