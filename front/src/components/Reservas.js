import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Reservas = (props) => {
    const [preferences, setPreferences] = useState([]);
    const [averagepref, setAvergaPref] = useState([]);
    const [dates, setDates] = useState([]);
    const [datecant, setDateCant] = useState([]);
    const [dateper, setDatePers] = useState([]);
    const [dateaveper, setDateAvePers] = useState([]);
    const [duration, setDuration] = useState([]);

    useEffect(() => {
        fetch("./reservasPreferences")
         .then((res) => res.json())
         .then((res) => {
          setPreferences(res)});
        fetch("./reservasPrefQuantity")
         .then((res) => res.json())
         .then((res) => {
          setAvergaPref(res)});
        fetch("./reservasDate")
         .then((res) => res.json())
         .then((res) => {
          setDates(res)});
        fetch("./reservasCant")
         .then((res) => res.json())
         .then((res) => {
          setDateCant(res)});
        fetch("./reservasPersons")
         .then((res) => res.json())
         .then((res) => {
          setDatePers(res)});
        fetch("./reservasAveragePersons")
         .then((res) => res.json())
         .then((res) => {
          setDateAvePers(res)});
        fetch("./reservasDuration")
         .then((res) => res.json())
         .then((res) => {
          setDuration(res)});
    }, []);
    
    return (
        <div>
        <h2>BBC Reservation Graphs</h2>
        <div>
        <br></br>
          <h3>Which reservation preferences is the most used?</h3>
            <Plot
            data={[
             {
              type: "bar",
              x: ['near arcade','near bar','near tv'],
              y: preferences,
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
            title: "Quantity of the prefrences",
            xaxis: { title: "Preferences" },
          }}
          />
        </div>
        <div>
        <h3>What is the average probability of having 1,2, or 3 preferences?</h3>
            <Plot
            data={[
             {
              type: "bar",
              x: [1,2,3],
              y: averagepref,
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
            title: "Average probability of each preferences",
            xaxis: { title: "Preferences" },
          }}
          />
        </div>
        <div>
        <h3>What is the maximun number of Reservations per day?</h3>
            <Plot
            data={[
             {
              type: 'scatter',
              mode: 'lines+points',
              x: dates,
              y: datecant,
              transforms: [
                {
                  type: "sort",
                  target: "x",
                  order: "ascending",
                },
              ],
            },
          ]}
          layout={{
            margin: { l: 120 },
            width: 600,
            height: 600,
            title: "Reservation per Day",
            xaxis: { title: "Dates" },
          }}
          />
        </div>
        <div>
        <h3>What is the maximum number of people that reserve per day?</h3>
            <Plot
            data={[
             {
              type: 'scatter',
              mode: 'lines+points',
              x: dates,
              y: dateper,
              x0: 0,
              transforms: [
                {
                  type: "sort",
                  target: "x",
                  order: "ascending",
                },
              ],
            },
          ]}
          layout={{
            margin: { l: 120 },
            width: 600,
            height: 600,
            title: "Number of people that Reserve per Day",
            xaxis: { 
              title: "Dates",
               },
          }}
          />
        </div>
        <div>
        <h3>What is the average Number of people per reservation per day?</h3>
            <Plot
            data={[
             {
              type: 'scatter',
              mode: 'lines+points',
              x: dates,
              y: dateaveper,
              x0: 0,
              transforms: [
                {
                  type: "sort",
                  target: "x",
                  order: "ascending",
                },
              ],
            },
          ]}
          layout={{
            margin: { l: 120 },
            width: 600,
            height: 600,
            title: "Number of people per Reservation per Day",
            xaxis: { 
              title: "Dates",
               },
          }}
          />
        </div>
        <div>
        <h3>What is the average duration of a reservation per day?</h3>
            <Plot
            data={[
             {
              type: 'scatter',
              mode: 'lines+points',
              x: dates,
              y: duration,
              x0: 0,
              transforms: [
                {
                  type: "sort",
                  target: "x",
                  order: "ascending",
                },
              ],
            },
          ]}
          layout={{
            margin: { l: 120 },
            width: 600,
            height: 600,
            title: "average Duration of a Reservation per Day",
            xaxis: { 
              title: "Dates",
               },
          }}
          />
        </div>
        </div>
    );
};
export default Reservas;