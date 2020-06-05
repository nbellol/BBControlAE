import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Promos = (props) => {

    const [activos, setActivos] = useState([]);
    const [nombres, setNombres] = useState([]);
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        fetch("./activePromos")
         .then((res) => res.json())
         .then((res) => {
          setActivos(res);
        });
        fetch("./pricePromos")
         .then((res) => res.json())
         .then((res) => {
          setPrices(res);
        });
        fetch("./namePromos")
         .then((res) => res.json())
         .then((res) => {
          setNombres(res);
        });
    },[]);

    return(
    <div>
        <h2>BBC Promotions Graphs</h2>
        <div>
        <h3> What percentage of the promotions is active during the shift? </h3>
        <Plot
        data={[
            {
                values: activos,
                labels: ['Activos', 'Inactivos'],
                type: 'pie'  
            }
        ]}
        layout={{
          margin: { l: 120 },
          width: 600,
          height: 600,
          title: "Active Promotions",
        }}
         />
        </div>
    </div>
    );
};
export default Promos;
