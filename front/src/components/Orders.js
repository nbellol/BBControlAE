import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Orders = (props) => {

    const [active, setActives] = useState([]);
    const [days, setDays] = useState([]);
    const [items, setItems] = useState([]);
    const [cant, setCant] = useState([]);
    const [profit, setProfit] = useState([]);
    const [beers, setBeers] = useState([]);
    const [glass, setGlass] = useState([]);
    const [pint, setPint] = useState([]);
    const [jar, setJar] = useState([]);
    const [tower, setTower] = useState([]);
    const [liters, setLiters] = useState([]);
    const [non, setNon] = useState([]);
    const [bac, setBac] = useState([]);
    const [mac, setMac] = useState([]);
    const [lag, setLag] = useState([]);
    const [can, setCan] = useState([]);
    const [cha, setCha] = useState([]);
    const [mon, setMon] = useState([]);
    const [sep, setSep] = useState([]);
    const [caj, setCaj] = useState([]);

    
    useEffect(() => {
        fetch("./activeOrders")
         .then((res) => res.json())
         .then((res) => {
          setActives(res);
        });
        fetch("./dayOrders")
         .then((res) => res.json())
         .then((res) => {
          setDays(res);
        });
        fetch("./itemsOrders")
         .then((res) => res.json())
         .then((res) => {
          setItems(res);
        });
        fetch("./cantOrders")
         .then((res) => res.json())
         .then((res) => {
          setCant(res);
        });
        fetch("./profitOrders")
         .then((res) => res.json())
         .then((res) => {
          setProfit(res);
        });
        fetch("./Beers")
         .then((res) => res.json())
         .then((res) => {
          setBeers(res);
        });
        fetch("./BeersGlass")
         .then((res) => res.json())
         .then((res) => {
          setGlass(res);
        });
        fetch("./BeersPint")
         .then((res) => res.json())
         .then((res) => {
          setPint(res);
        });
        fetch("./BeersJar")
         .then((res) => res.json())
         .then((res) => {
          setJar(res);
        });
        fetch("./BeersTower")
         .then((res) => res.json())
         .then((res) => {
          setTower(res);
        });
        fetch("./beersDay")
         .then((res) => res.json())
         .then((res) => {
          setLiters(res);
        });
        fetch("./nonAlcoholic")
         .then((res) => res.json())
         .then((res) => {
          setNon(res);
        });
        fetch("./bacataDay")
         .then((res) => res.json())
         .then((res) => {
          setBac(res);
        });
        fetch("./macondoDay")
         .then((res) => res.json())
         .then((res) => {
          setMac(res);
        });
        fetch("./lagerDay")
         .then((res) => res.json())
         .then((res) => {
          setLag(res);
        });
        fetch("./candelariaDay")
         .then((res) => res.json())
         .then((res) => {
          setCan(res);
        });
        fetch("./chapineroDay")
         .then((res) => res.json())
         .then((res) => {
          setCha(res);
        });
        fetch("./monserrateDay")
         .then((res) => res.json())
         .then((res) => {
          setMon(res);
        });
        fetch("./septimazoDay")
         .then((res) => res.json())
         .then((res) => {
          setSep(res);
        });
        fetch("./cajicaDay")
         .then((res) => res.json())
         .then((res) => {
          setCaj(res);
        });
    },[]);

    return(
        <div>
            <h2>BBC Orders Graphs</h2>
            <div>
            <h3>Which percentage of the orders are Completed in the shift?</h3>
            <Plot
            data={[
            {
                values: active,
                labels: ['In Progress', 'Completed'],
                type: 'pie'  
            }
            ]}
            layout={{
              margin: { l: 120 },
              width: 600,
              height: 600,
              title: "Active Orders",
             }}
            />
            </div>
            <div>
            <h3>How many orders are placed each day of the week?</h3>
            <Plot
                data={[
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: days,
           
                  },
                ]}
                layout={{
                  margin: { l: 120 },
                  width: 600,
                  height: 600,
                  title: "Orders per day",
                  xaxis: { title: "Days of the week" },
                }}
             />
            </div>
            <div>
            <h3>How many orders of each item in the menu in a week</h3>
            <Plot
                data={[
                  {
                    type: "bar",
                    x: items,
                    y: cant,
           
                  },
                ]}
                layout={{
                  margin: { l: 120 },
                  width: 600,
                  height: 600,
                  title: "Quantity per item",
                }}
             />
            </div>
            <div>
            <h3>How much profit is earned by each item per week</h3>
            <Plot
                data={[
                  {
                    type: "bar",
                    x: items,
                    y: profit,
           
                  },
                ]}
                layout={{
                  margin: { l: 120 },
                  width: 600,
                  height: 600,
                  title: "Profit per item",
                }}
             />
            </div>
            <div>
            <h3>How much profit is earned by each beer per week</h3>
            <Plot
                data={[
                  {
                    type: "bar",
                    x: beers,
                    y: glass,
                    name:"Glass"
                  },
                  {
                    type: "bar",
                    x: beers,
                    y: pint,
                    name:"Pint"
                  },
                  {
                    type: "bar",
                    x: beers,
                    y: jar,
                    name:"Jar"
                  },
                  {
                    type: "bar",
                    x: beers,
                    y: tower,
                    name:"Tower"
                  },
                ]}
                layout={{
                  barmode: 'stack',
                  margin: { l: 120 },
                  width: 600,
                  height: 600,
                  title: "Profit per item",
                  xaxis: { title: "Beers" },
                }}
             />
            </div>
            <div>
            <h3>How many Liters are sold in beer per day?</h3>
            <Plot
                data={[
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: liters,
           
                  },
                ]}
                layout={{
                  margin: { l: 120 },
                  width: 600,
                  height: 600,
                  title: "Liters sold per day",
                  xaxis: { title: "Days of the week" },
                }}
             />
            </div>
            <div>
            <h3>Which non Alcoholic drink is the favorite?</h3>
            <Plot
                data={[
                  {
                    type: "bar",
                    x: ['Capuccion','Coke','Americano','Classic Lemonade','Latte','Machiatto','Mirenal Water'],
                    y: non,
           
                  },
                ]}
                layout={{
                  margin: { l: 120 },
                  width: 600,
                  height: 600,
                  title: "Liters sold per day",
                  xaxis: { title: "Days of the week" },
                }}
             />
            </div>
            <div>
            <h3>Which beer sells more Liters per day of the week?</h3>
            <Plot
                data={[
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: bac,
                    name:"Bacata"
                  },
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: mac,
                    name:"Macondo"
                  },
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: lag,
                    name:"Lager"
                  },
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: can,
                    name:"Candelaria"
                  },
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: cha,
                    name:"Chapinero"
                  },
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: mon,
                    name:"Monserrate"
                  },
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: sep,
                    name:"Septimazo"
                  },
                  {
                    type: "bar",
                    x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    y: caj,
                    name:"Cajica"
                  },
                ]}
                layout={{
                  barmode: 'group',
                  margin: { l: 120 },
                  width: 600,
                  height: 600,
                  title: "Liters sold per day",
                  xaxis: { title: "Days of the week" },
                }}
             />
            </div>
        </div>
    );
};
export default Orders;