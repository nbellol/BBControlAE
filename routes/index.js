var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var firebase = require("firebase-admin"); // Imports the Google Cloud client library

var serviceAccount = require("./keyBBCONROL.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://bbcontrol.firebaseio.com",
});
/*
function traerData(callback) {
  var empleados = [];
  var db = firebase.firestore();
  var employees = db.collection("BBCEmployees");
  employees
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((documentSnapshot) => {
        let doc = documentSnapshot.data();
        //doc.id = documentSnapshot.id;
        empleados.push(doc);
      });
      return empleados;
    })
    .then((res) => callback(res));
}
traerData(imprimir);
function imprimir(d) {
  console.log(d);
}
*/
async function traerDataEmpleados() {
  var empleados = [];
  var db = firebase.firestore();
  var employees = db.collection("BBCEmployees");
  querySnapshot = await employees.get();
  querySnapshot.docs.forEach((documentSnapshot) => {
    let doc = documentSnapshot.data();
    //doc.id = documentSnapshot.id;
    empleados.push(doc);
  });
  return empleados;
}

async function traerDataOrdenes() {
  var ordenes = [];
  var db = firebase.firestore();
  var orders = db.collection("Orders");
  querySnapshot = await orders.get();
  querySnapshot.docs.forEach((documentSnapshot) => {
    let doc = documentSnapshot.data();
    //doc.id = documentSnapshot.id;
    ordenes.push(doc);
  });
  return ordenes;
}

async function traerDataPromos() {
  var promos = [];
  var db = firebase.firestore();
  var orders = db.collection("Promotions");
  querySnapshot = await orders.get();
  querySnapshot.docs.forEach((documentSnapshot) => {
    let doc = documentSnapshot.data();
    //doc.id = documentSnapshot.id;
    promos.push(doc);
  });
  return promos;
}

async function traerDataReservas() {
  var reservas = [];
  var db = firebase.firestore();
  var orders = db.collection("Reservations");
  querySnapshot = await orders.get();
  querySnapshot.docs.forEach((documentSnapshot) => {
    let doc = documentSnapshot.data();
    //doc.id = documentSnapshot.id;
    reservas.push(doc);
  });
  return reservas;
}

async function traerDataPromotions() {
  var promotions = [];
  var db = firebase.firestore();
  var orders = db.collection("Promotions");
  querySnapshot = await orders.get();
  querySnapshot.docs.forEach((documentSnapshot) => {
    let doc = documentSnapshot.data();
    //doc.id = documentSnapshot.id;
    promotions.push(doc);
  });
  return promotions;
}

async function traerDataCustomer() {
  var customer = [];
  var db = firebase.firestore();
  var orders = db.collection("Customers");
  querySnapshot = await orders.get();
  querySnapshot.docs.forEach((documentSnapshot) => {
    let doc = documentSnapshot.data();
    //doc.id = documentSnapshot.id;
    customer.push(doc);
  });
  return customer;
}

router.get("/empleados", function (req, res) {
  //Client side rendering
  traerDataEmpleados().then((empleados) => res.json(empleados));
});
router.get("/nombresEmpleados", function (req, res) {
  //Client side rendering
  traerDataEmpleados().then((empleados) => {
    var nombres = [];
    for (let i = 0; i < empleados.length; i++) {
      nombres.push(empleados[i].firstName);
    }
    res.json(nombres);
  });
});

router.get("/orderesEmpleados", function (req, res) {
  traerDataEmpleados().then((empleados) => {
    var ordenes = [];
    for (let i = 0; i < empleados.length; i++) {
      ordenes.push(empleados[i].ordersAmount);
    }
    res.json(ordenes);
  });
});

router.get("/gananciasEmpleados", function (req, res) {
  traerDataEmpleados().then((empleados) => {
    var ganacias = [];
    var id = [];
    for (let i = 0; i < empleados.length; i++) {
      id.push(empleados[i].id);
    }
    traerDataOrdenes().then((ordenes) => {
      for (let n = 0; n < id.length; n++) {
        var gan = 0;
        for (let o = 0; o < ordenes.length; o++) {
          var idOrder = ordenes[o].idWaiter;
          if (idOrder != "" && idOrder == id[n]) {
            gan = gan + ordenes[o].total;
          }
        }
        ganacias.push(gan);
      }
      res.json(ganacias);
    });
  });
});

router.get("/empleadosActivos", function (req, res) {
  var activos = [0, 0];
  traerDataEmpleados().then((empleados) => {
    for (let e = 0; e < empleados.length; e++) {
      if (empleados[e].active) {
        activos[0] = activos[0] + 1;
      } else {
        activos[1] = activos[1] + 1;
      }
    }
    res.json(activos);
  });
});

router.get("/reservasPreferences", function (req, res) {
  var reservas = [0, 0, 0];
  traerDataReservas().then((reservations) => {
    for (let e = 0; e < reservations.length; e++) {
      var pref = reservations[e].preferences;
      for (let p = 0; p < pref.length; p++) {
        var v = pref[p];
        if (v == "near arcade") {
          reservas[0] = reservas[0] + 1;
        }
        if (v == "near bar") {
          reservas[1] = reservas[1] + 1;
        }
        if (v == "near tv") {
          reservas[2] = reservas[2] + 1;
        }
      }
    }
    res.json(reservas);
  });
});

router.get("/reservasPrefQuantity", function (req, res) {
  var reservas = [0, 0, 0];
  traerDataReservas().then((reservations) => {
    for (let e = 0; e < reservations.length; e++) {
      var pref = reservations[e].preferences;
      if (pref.length === 1) {
        reservas[0] = reservas[0] + 1;
      }
      if (pref.length === 2) {
        reservas[1] = reservas[1] + 1;
      }
      if (pref.length === 3) {
        reservas[2] = reservas[2] + 1;
      }
    }
    reservas[0] = reservas[0] / reservations.length;
    reservas[1] = reservas[1] / reservations.length;
    reservas[2] = reservas[2] / reservations.length;
    res.json(reservas);
  });
});

router.get("/reservasDate", function (req, res) {
  var reservas = [];
  traerDataReservas().then((reservations) => {
    for (let e = 0; e < reservations.length; e++) {
      var pref = reservations[e].date;
      var date = new Date(pref._seconds * 1000 + pref._nanoseconds / 1000);
      var mes = date.toString().split(" 2020")[0] + " 2020";
      if (reservas.indexOf(mes) == -1) {
        reservas.push(mes);
      }
    }
    res.json(reservas);
  });
});

router.get("/reservasCant", function (req, res) {
  var dates = [];
  var cant = [];
  traerDataReservas().then((reservations) => {
    for (let e = 0; e < reservations.length; e++) {
      var pref = reservations[e].date;
      var date = new Date(pref._seconds * 1000 + pref._nanoseconds / 1000);
      var mes = date.toString().split(" 2020")[0] + " 2020";
      if (dates.indexOf(mes) == -1) {
        dates.push(mes);
      }
    }
    for (let d = 0; d < dates.length; d++) {
      cont = 0;
      for (let i = 0; i < reservations.length; i++) {
        var pref = reservations[i].date;
        var date = new Date(pref._seconds * 1000 + pref._nanoseconds / 1000);
        var mes = date.toString().split(" 2020")[0] + " 2020";
        if (mes == dates[d]) {
          cont = cont + 1;
        }
      }
      cant.push(cont);
    }
    res.json(cant);
  });
});

router.get("/reservasPersons", function (req, res) {
  var dates = [];
  var cant = [];
  traerDataReservas().then((reservations) => {
    for (let e = 0; e < reservations.length; e++) {
      var pref = reservations[e].date;
      var date = new Date(pref._seconds * 1000 + pref._nanoseconds / 1000);
      var mes = date.toString().split(" 2020")[0] + " 2020";
      if (dates.indexOf(mes) == -1) {
        dates.push(mes);
      }
    }
    for (let d = 0; d < dates.length; d++) {
      cont = 0;
      for (let i = 0; i < reservations.length; i++) {
        var pref = reservations[i].date;
        var date = new Date(pref._seconds * 1000 + pref._nanoseconds / 1000);
        var mes = date.toString().split(" 2020")[0] + " 2020";
        if (mes == dates[d]) {
          cont = cont + reservations[i].num_people;
        }
      }
      cant.push(cont);
    }
    res.json(cant);
  });
});

router.get("/reservasAveragePersons", function (req, res) {
  var dates = [];
  var cant = [];
  traerDataReservas().then((reservations) => {
    for (let e = 0; e < reservations.length; e++) {
      var pref = reservations[e].date;
      var date = new Date(pref._seconds * 1000 + pref._nanoseconds / 1000);
      var mes = date.toString().split(" 2020")[0] + " 2020";
      if (dates.indexOf(mes) == -1) {
        dates.push(mes);
      }
    }
    for (let d = 0; d < dates.length; d++) {
      var cont = 0;
      var people = 0;
      for (let i = 0; i < reservations.length; i++) {
        var pref = reservations[i].date;
        var date = new Date(pref._seconds * 1000 + pref._nanoseconds / 1000);
        var mes = date.toString().split(" 2020")[0] + " 2020";
        if (mes == dates[d]) {
          cont = cont + 1;
          people = people + reservations[i].num_people;
        }
      }
      cant.push(people / cont);
    }
    res.json(cant);
  });
});

router.get("/reservasDuration", function (req, res) {
  var dates = [];
  var cant = [];
  var dura = [];
  traerDataReservas().then((reservations) => {
    for (let e = 0; e < reservations.length; e++) {
      var pref = reservations[e].date;
      var date = new Date(pref._seconds * 1000 + pref._nanoseconds / 1000);
      var mes = date.toString().split(" 2020")[0] + " 2020";
      if (dates.indexOf(mes) == -1) {
        dates.push(mes);
      }
    }
    for (let d = 0; d < dates.length; d++) {
      var cont = 0;
      var duration = 0;
      for (let i = 0; i < reservations.length; i++) {
        var pref = reservations[i].date;
        var date = new Date(pref._seconds * 1000 + pref._nanoseconds / 1000);
        var mes = date.toString().split(" 2020")[0] + " 2020";
        if (mes == dates[d]) {
          cont = cont + 1;
          var start = new Date(
            reservations[i].start._seconds * 1000 +
              reservations[i].start._nanoseconds / 1000
          );
          var end = new Date(
            reservations[i].end._seconds * 1000 +
              reservations[i].end._nanoseconds / 1000
          );
          var starts = start.toString().split(" ")[4];
          var ends = end.toString().split(" ")[4];
          var startsep = starts.split(":");
          var endsep = ends.split(":");
          var snum = parseInt(startsep[0]) * 60 + parseInt(startsep[1]);
          var dnum = parseInt(endsep[0]) * 60 + parseInt(endsep[1]);
          var total = dnum - snum;
          var dur = parseFloat(
            (parseInt(total / 60) + (total % 60) / 60).toFixed(2)
          );
          duration = duration + dur;
          dura.push(dur);
        }
      }
      cant.push(parseFloat((duration / cont).toFixed(2)));
    }
    res.json(dura);
  });
});

router.get("/activePromos", function (req, res) {
  //Client side rendering
  traerDataPromotions().then((promos) => {
    var actives = 0;
    var inactives = 0;
    for (let i = 0; i < promos.length; i++) {
      if (promos[i].active) {
        actives = actives + 1;
      }
      if (promos[i].active == false) {
        inactives = inactives + 1;
      }
    }
    actives = parseFloat((actives / promos.length).toFixed(2));
    inactives = parseFloat((inactives / promos.length).toFixed(2));

    res.json([actives, inactives]);
  });
});

router.get("/namePromos", function (req, res) {
  //Client side rendering
  traerDataPromotions().then((promos) => {
    var nombres = [];
    for (let i = 0; i < promos.length; i++) {
      nombres.push(promos[i].name);
    }
    res.json(nombres);
  });
});

router.get("/limitCustomers", function (req, res) {
  //Client side rendering
  traerDataCustomer().then((customer) => {
    var limits = [];
    for (let i = 0; i < customer.length; i++) {
      if (limits.indexOf("Limit $" + customer[i].limitAmount) == -1) {
        limits.push("Limit $" + customer[i].limitAmount);
      }
    }

    res.json(limits);
  });
});

router.get("/limitAmountCustomers", function (req, res) {
  //Client side rendering
  traerDataCustomer().then((customer) => {
    var amount = [];
    var limits = [];
    for (let i = 0; i < customer.length; i++) {
      if (limits.indexOf(customer[i].limitAmount) == -1) {
        limits.push(customer[i].limitAmount);
      }
    }
    for (let l = 0; l < limits.length; l++) {
      var lim = limits[l];
      var cont = 0;
      for (let k = 0; k < customer.length; k++) {
        if (customer[k].limitAmount == lim) {
          cont = cont + 1;
        }
      }
      amount.push(cont);
    }
    res.json(amount);
  });
});

router.get("/ageCustomers", function (req, res) {
  //Client side rendering
  traerDataCustomer().then((customer) => {
    var ages = [0, 0, 0, 0];
    for (let i = 0; i < customer.length; i++) {
      var date = new Date(
        customer[i].birthDate._seconds * 1000 +
          customer[i].birthDate._nanoseconds / 1000
      );
      var d = parseInt(date.toString().split(" ")[3]);
      var actual = new Date().getFullYear();
      var age = actual - d;
      if (age < 25) {
        ages[0] = ages[0] + 1;
      }
      if (age >= 25 && age < 35) {
        ages[1] = ages[1] + 1;
      }
      if (age >= 35 && age < 45) {
        ages[2] = ages[2] + 1;
      }
      if (age >= 45) {
        ages[3] = ages[3] + 1;
      }
    }

    res.json(ages);
  });
});

router.get("/activeOrders", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var active = [0, 0];
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].state == 0) {
        active[0] = active[0] + 1;
      }
      if (orders[i].state == 1) {
        active[1] = active[1] + 1;
      }
    }
    active[1] = active[1] / orders.length;
    active[0] = active[0] / orders.length;
    res.json(active);
  });
});

router.get("/dayOrders", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      if (dweek == "Mon") {
        days[0] = days[0] + 1;
      }
      if (dweek == "Tue") {
        days[1] = days[1] + 1;
      }
      if (dweek == "Wed") {
        days[2] = days[2] + 1;
      }
      if (dweek == "Thu") {
        days[3] = days[3] + 1;
      }
      if (dweek == "Fri") {
        days[4] = days[4] + 1;
      }
      if (dweek == "Sat") {
        days[5] = days[5] + 1;
      }
      if (dweek == "Sun") {
        days[6] = days[6] + 1;
      }
    }

    res.json(days);
  });
});

router.get("/itemsOrders", function (req, res) {
  //Client side rendering
  var items = [];
  traerDataOrdenes().then((orders) => {
    for (let i = 0; i < orders.length; i++) {
      var l = orders[i].list;
      for (let j = 0; j < l.length; j++) {
        var el = l[j].split("|");
        if (items.indexOf(el[0]) == -1) items.push(el[0]);
      }
    }
    res.json(items);
  });
});

router.get("/cantOrders", function (req, res) {
  //Client side rendering
  var items = [];
  var cant = [];
  traerDataOrdenes().then((orders) => {
    for (let i = 0; i < orders.length; i++) {
      var l = orders[i].list;
      for (let j = 0; j < l.length; j++) {
        var el = l[j].split("|");
        if (items.indexOf(el[0]) == -1) items.push(el[0]);
      }
    }
    for (let k = 0; k < items.length; k++) {
      var it = items[k];
      var c = 0;
      for (let n = 0; n < orders.length; n++) {
        var li = orders[n].list;
        for (let j = 0; j < li.length; j++) {
          var el = li[j].split("|");
          if (it == el[0]) {
            c = c + parseInt(el[2]);
          }
        }
      }
      cant.push(c);
    }
    res.json(cant);
  });
});

router.get("/profitOrders", function (req, res) {
  //Client side rendering
  var items = [];
  var cant = [];
  traerDataOrdenes().then((orders) => {
    for (let i = 0; i < orders.length; i++) {
      var l = orders[i].list;
      for (let j = 0; j < l.length; j++) {
        var el = l[j].split("|");
        if (items.indexOf(el[0]) == -1) items.push(el[0]);
      }
    }
    for (let k = 0; k < items.length; k++) {
      var it = items[k];
      var c = 0;
      for (let n = 0; n < orders.length; n++) {
        var li = orders[n].list;
        for (let j = 0; j < li.length; j++) {
          var el = li[j].split("|");
          if (it == el[0]) {
            c = c + parseInt(el[1]) * parseInt(el[2]);
          }
        }
      }
      cant.push(c);
    }
    res.json(cant);
  });
});

router.get("/Beers", function (req, res) {
  //Client side rendering
  var beers = [];
  traerDataOrdenes().then((orders) => {
    for (let i = 0; i < orders.length; i++) {
      var l = orders[i].list;
      for (let j = 0; j < l.length; j++) {
        var el = l[j].split("|");
        if (el[0].includes("-") && !el[0].includes("-BBC")) {
          if (beers.indexOf(el[0].split("-")[0]) == -1)
            beers.push(el[0].split("-")[0]);
        }
      }
    }
    res.json(beers);
  });
});

router.get("/BeersGlass", function (req, res) {
  //Client side rendering
  var beers = [];
  var glass = [];
  traerDataOrdenes().then((orders) => {
    for (let i = 0; i < orders.length; i++) {
      var l = orders[i].list;
      for (let j = 0; j < l.length; j++) {
        var el = l[j].split("|");
        if (el[0].includes("-") && !el[0].includes("-BBC")) {
          if (beers.indexOf(el[0].split("-")[0]) == -1)
            beers.push(el[0].split("-")[0]);
        }
      }
    }
    for (let k = 0; k < beers.length; k++) {
      var b = beers[k];
      var c = 0;
      for (let a = 0; a < orders.length; a++) {
        var li = orders[a].list;
        for (let v = 0; v < li.length; v++) {
          var item = li[v];
          var parts = item.split("|");
          if (parts[0].includes(b) && parts[0].includes("glass")) {
            c = c + parseInt(parts[1]) * parseInt(parts[2]);
          }
        }
      }
      glass.push(c);
    }
    res.json(glass);
  });
});

router.get("/BeersPint", function (req, res) {
  //Client side rendering
  var beers = [];
  var glass = [];
  traerDataOrdenes().then((orders) => {
    for (let i = 0; i < orders.length; i++) {
      var l = orders[i].list;
      for (let j = 0; j < l.length; j++) {
        var el = l[j].split("|");
        if (el[0].includes("-") && !el[0].includes("-BBC")) {
          if (beers.indexOf(el[0].split("-")[0]) == -1)
            beers.push(el[0].split("-")[0]);
        }
      }
    }
    for (let k = 0; k < beers.length; k++) {
      var b = beers[k];
      var c = 0;
      for (let a = 0; a < orders.length; a++) {
        var li = orders[a].list;
        for (let v = 0; v < li.length; v++) {
          var item = li[v];
          var parts = item.split("|");
          if (parts[0].includes(b) && parts[0].includes("pint")) {
            c = c + parseInt(parts[1]) * parseInt(parts[2]);
          }
        }
      }
      glass.push(c);
    }
    res.json(glass);
  });
});

router.get("/BeersJar", function (req, res) {
  //Client side rendering
  var beers = [];
  var glass = [];
  traerDataOrdenes().then((orders) => {
    for (let i = 0; i < orders.length; i++) {
      var l = orders[i].list;
      for (let j = 0; j < l.length; j++) {
        var el = l[j].split("|");
        if (el[0].includes("-") && !el[0].includes("-BBC")) {
          if (beers.indexOf(el[0].split("-")[0]) == -1)
            beers.push(el[0].split("-")[0]);
        }
      }
    }
    for (let k = 0; k < beers.length; k++) {
      var b = beers[k];
      var c = 0;
      for (let a = 0; a < orders.length; a++) {
        var li = orders[a].list;
        for (let v = 0; v < li.length; v++) {
          var item = li[v];
          var parts = item.split("|");
          if (parts[0].includes(b) && parts[0].includes("jar")) {
            c = c + parseInt(parts[1]) * parseInt(parts[2]);
          }
        }
      }
      glass.push(c);
    }
    res.json(glass);
  });
});

router.get("/BeersTower", function (req, res) {
  //Client side rendering
  var beers = [];
  var glass = [];
  traerDataOrdenes().then((orders) => {
    for (let i = 0; i < orders.length; i++) {
      var l = orders[i].list;
      for (let j = 0; j < l.length; j++) {
        var el = l[j].split("|");
        if (el[0].includes("-") && !el[0].includes("-BBC")) {
          if (beers.indexOf(el[0].split("-")[0]) == -1)
            beers.push(el[0].split("-")[0]);
        }
      }
    }
    for (let k = 0; k < beers.length; k++) {
      var b = beers[k];
      var c = 0;
      for (let a = 0; a < orders.length; a++) {
        var li = orders[a].list;
        for (let v = 0; v < li.length; v++) {
          var item = li[v];
          var parts = item.split("|");
          if (parts[0].includes(b) && parts[0].includes("tower")) {
            c = c + parseInt(parts[1]) * parseInt(parts[2]);
          }
        }
      }
      glass.push(c);
    }
    res.json(glass);
  });
});

router.get("/beersDay", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    var o = [];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      var a = orders[i].list;
      for (let j = 0; j < a.length; j++) {
        var item = a[j];
        var parts = item.split("|");
        var c = 0;
        if (parts[0].includes("-") && !parts[0].includes("-BBC")) {
          if (parts[0].includes("glass")) {
            c = 0.33 * parseInt(parts[2]);
          }
          if (parts[0].includes("pint")) {
            c = 0.57 * parseInt(parts[2]);
          }
          if (parts[0].includes("jar")) {
            c = 1.5 * parseInt(parts[2]);
          }
          if (parts[0].includes("tower")) {
            c = 3 * parseInt(parts[2]);
          }
          if (dweek == "Mon") {
            days[0] = days[0] + c;
          }
          if (dweek == "Tue") {
            days[1] = days[1] + c;
          }
          if (dweek == "Wed") {
            days[2] = days[2] + c;
          }
          if (dweek == "Thu") {
            days[3] = days[3] + c;
          }
          if (dweek == "Fri") {
            days[4] = days[4] + c;
          }
          if (dweek == "Sat") {
            days[5] = days[5] + c;
          }
          if (dweek == "Sun") {
            days[6] = days[6] + c;
          }
        }
      }
    }

    res.json(days);
  });
});

router.get("/nonAlcoholic", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var non = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < orders.length; i++) {
      var l = orders[i].list;
      for (let j = 0; j < l.length; j++) {
        var item = l[j];
        var parts = item.split("|");
        if (parts[0].includes("Capuccino")) {
          non[0] = non[0] + parseInt(parts[2]);
        }
        if (parts[0].includes("Coke")) {
          non[1] = non[1] + parseInt(parts[2]);
        }
        if (parts[0].includes("americano")) {
          non[2] = non[2] + parseInt(parts[2]);
        }
        if (parts[0].includes("Classic Lemonade")) {
          non[3] = non[3] + parseInt(parts[2]);
        }
        if (parts[0].includes("Latte")) {
          non[4] = non[4] + parseInt(parts[2]);
        }
        if (parts[0].includes("machiatto")) {
          non[5] = non[5] + parseInt(parts[2]);
        }
        if (parts[0].includes("mineral water")) {
          non[6] = non[6] + parseInt(parts[2]);
        }
      }
    }
    res.json(non);
  });
});

router.get("/bacataDay", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    var o = [];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      var a = orders[i].list;
      for (let j = 0; j < a.length; j++) {
        var item = a[j];
        var parts = item.split("|");
        var c = 0;
        if (
          parts[0].includes("-") &&
          !parts[0].includes("-BBC") &&
          parts[0].includes("Bacata")
        ) {
          if (parts[0].includes("glass")) {
            c = 0.33 * parseInt(parts[2]);
          }
          if (parts[0].includes("pint")) {
            c = 0.57 * parseInt(parts[2]);
          }
          if (parts[0].includes("jar")) {
            c = 1.5 * parseInt(parts[2]);
          }
          if (parts[0].includes("tower")) {
            c = 3 * parseInt(parts[2]);
          }
          if (dweek == "Mon") {
            days[0] = days[0] + c;
          }
          if (dweek == "Tue") {
            days[1] = days[1] + c;
          }
          if (dweek == "Wed") {
            days[2] = days[2] + c;
          }
          if (dweek == "Thu") {
            days[3] = days[3] + c;
          }
          if (dweek == "Fri") {
            days[4] = days[4] + c;
          }
          if (dweek == "Sat") {
            days[5] = days[5] + c;
          }
          if (dweek == "Sun") {
            days[6] = days[6] + c;
          }
        }
      }
    }
    res.json(days);
  });
});

router.get("/macondoDay", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    var o = [];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      var a = orders[i].list;
      for (let j = 0; j < a.length; j++) {
        var item = a[j];
        var parts = item.split("|");
        var c = 0;
        if (
          parts[0].includes("-") &&
          !parts[0].includes("-BBC") &&
          parts[0].includes("Macondo")
        ) {
          if (parts[0].includes("glass")) {
            c = 0.33 * parseInt(parts[2]);
          }
          if (parts[0].includes("pint")) {
            c = 0.57 * parseInt(parts[2]);
          }
          if (parts[0].includes("jar")) {
            c = 1.5 * parseInt(parts[2]);
          }
          if (parts[0].includes("tower")) {
            c = 3 * parseInt(parts[2]);
          }
          if (dweek == "Mon") {
            days[0] = days[0] + c;
          }
          if (dweek == "Tue") {
            days[1] = days[1] + c;
          }
          if (dweek == "Wed") {
            days[2] = days[2] + c;
          }
          if (dweek == "Thu") {
            days[3] = days[3] + c;
          }
          if (dweek == "Fri") {
            days[4] = days[4] + c;
          }
          if (dweek == "Sat") {
            days[5] = days[5] + c;
          }
          if (dweek == "Sun") {
            days[6] = days[6] + c;
          }
        }
      }
    }
    res.json(days);
  });
});

router.get("/lagerDay", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    var o = [];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      var a = orders[i].list;
      for (let j = 0; j < a.length; j++) {
        var item = a[j];
        var parts = item.split("|");
        var c = 0;
        if (
          parts[0].includes("-") &&
          !parts[0].includes("-BBC") &&
          parts[0].includes("Lager")
        ) {
          if (parts[0].includes("glass")) {
            c = 0.33 * parseInt(parts[2]);
          }
          if (parts[0].includes("pint")) {
            c = 0.57 * parseInt(parts[2]);
          }
          if (parts[0].includes("jar")) {
            c = 1.5 * parseInt(parts[2]);
          }
          if (parts[0].includes("tower")) {
            c = 3 * parseInt(parts[2]);
          }
          if (dweek == "Mon") {
            days[0] = days[0] + c;
          }
          if (dweek == "Tue") {
            days[1] = days[1] + c;
          }
          if (dweek == "Wed") {
            days[2] = days[2] + c;
          }
          if (dweek == "Thu") {
            days[3] = days[3] + c;
          }
          if (dweek == "Fri") {
            days[4] = days[4] + c;
          }
          if (dweek == "Sat") {
            days[5] = days[5] + c;
          }
          if (dweek == "Sun") {
            days[6] = days[6] + c;
          }
        }
      }
    }
    res.json(days);
  });
});

router.get("/candelariaDay", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    var o = [];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      var a = orders[i].list;
      for (let j = 0; j < a.length; j++) {
        var item = a[j];
        var parts = item.split("|");
        var c = 0;
        if (
          parts[0].includes("-") &&
          !parts[0].includes("-BBC") &&
          parts[0].includes("Candelaria")
        ) {
          if (parts[0].includes("glass")) {
            c = 0.33 * parseInt(parts[2]);
          }
          if (parts[0].includes("pint")) {
            c = 0.57 * parseInt(parts[2]);
          }
          if (parts[0].includes("jar")) {
            c = 1.5 * parseInt(parts[2]);
          }
          if (parts[0].includes("tower")) {
            c = 3 * parseInt(parts[2]);
          }
          if (dweek == "Mon") {
            days[0] = days[0] + c;
          }
          if (dweek == "Tue") {
            days[1] = days[1] + c;
          }
          if (dweek == "Wed") {
            days[2] = days[2] + c;
          }
          if (dweek == "Thu") {
            days[3] = days[3] + c;
          }
          if (dweek == "Fri") {
            days[4] = days[4] + c;
          }
          if (dweek == "Sat") {
            days[5] = days[5] + c;
          }
          if (dweek == "Sun") {
            days[6] = days[6] + c;
          }
        }
      }
    }
    res.json(days);
  });
});

router.get("/chapineroDay", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    var o = [];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      var a = orders[i].list;
      for (let j = 0; j < a.length; j++) {
        var item = a[j];
        var parts = item.split("|");
        var c = 0;
        if (
          parts[0].includes("-") &&
          !parts[0].includes("-BBC") &&
          parts[0].includes("Chapinero")
        ) {
          if (parts[0].includes("glass")) {
            c = 0.33 * parseInt(parts[2]);
          }
          if (parts[0].includes("pint")) {
            c = 0.57 * parseInt(parts[2]);
          }
          if (parts[0].includes("jar")) {
            c = 1.5 * parseInt(parts[2]);
          }
          if (parts[0].includes("tower")) {
            c = 3 * parseInt(parts[2]);
          }
          if (dweek == "Mon") {
            days[0] = days[0] + c;
          }
          if (dweek == "Tue") {
            days[1] = days[1] + c;
          }
          if (dweek == "Wed") {
            days[2] = days[2] + c;
          }
          if (dweek == "Thu") {
            days[3] = days[3] + c;
          }
          if (dweek == "Fri") {
            days[4] = days[4] + c;
          }
          if (dweek == "Sat") {
            days[5] = days[5] + c;
          }
          if (dweek == "Sun") {
            days[6] = days[6] + c;
          }
        }
      }
    }
    res.json(days);
  });
});

router.get("/monserrateDay", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    var o = [];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      var a = orders[i].list;
      for (let j = 0; j < a.length; j++) {
        var item = a[j];
        var parts = item.split("|");
        var c = 0;
        if (
          parts[0].includes("-") &&
          !parts[0].includes("-BBC") &&
          parts[0].includes("Monserrate")
        ) {
          if (parts[0].includes("glass")) {
            c = 0.33 * parseInt(parts[2]);
          }
          if (parts[0].includes("pint")) {
            c = 0.57 * parseInt(parts[2]);
          }
          if (parts[0].includes("jar")) {
            c = 1.5 * parseInt(parts[2]);
          }
          if (parts[0].includes("tower")) {
            c = 3 * parseInt(parts[2]);
          }
          if (dweek == "Mon") {
            days[0] = days[0] + c;
          }
          if (dweek == "Tue") {
            days[1] = days[1] + c;
          }
          if (dweek == "Wed") {
            days[2] = days[2] + c;
          }
          if (dweek == "Thu") {
            days[3] = days[3] + c;
          }
          if (dweek == "Fri") {
            days[4] = days[4] + c;
          }
          if (dweek == "Sat") {
            days[5] = days[5] + c;
          }
          if (dweek == "Sun") {
            days[6] = days[6] + c;
          }
        }
      }
    }
    res.json(days);
  });
});

router.get("/septimazoDay", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    var o = [];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      var a = orders[i].list;
      for (let j = 0; j < a.length; j++) {
        var item = a[j];
        var parts = item.split("|");
        var c = 0;
        if (
          parts[0].includes("-") &&
          !parts[0].includes("-BBC") &&
          parts[0].includes("Septimazo")
        ) {
          if (parts[0].includes("glass")) {
            c = 0.33 * parseInt(parts[2]);
          }
          if (parts[0].includes("pint")) {
            c = 0.57 * parseInt(parts[2]);
          }
          if (parts[0].includes("jar")) {
            c = 1.5 * parseInt(parts[2]);
          }
          if (parts[0].includes("tower")) {
            c = 3 * parseInt(parts[2]);
          }
          if (dweek == "Mon") {
            days[0] = days[0] + c;
          }
          if (dweek == "Tue") {
            days[1] = days[1] + c;
          }
          if (dweek == "Wed") {
            days[2] = days[2] + c;
          }
          if (dweek == "Thu") {
            days[3] = days[3] + c;
          }
          if (dweek == "Fri") {
            days[4] = days[4] + c;
          }
          if (dweek == "Sat") {
            days[5] = days[5] + c;
          }
          if (dweek == "Sun") {
            days[6] = days[6] + c;
          }
        }
      }
    }
    res.json(days);
  });
});

router.get("/cajicaDay", function (req, res) {
  //Client side rendering
  traerDataOrdenes().then((orders) => {
    var days = [0, 0, 0, 0, 0, 0, 0];
    var o = [];
    for (let i = 0; i < orders.length; i++) {
      var date = new Date(
        orders[i].created._seconds * 1000 +
          orders[i].created._nanoseconds / 1000
      );
      var dweek = date.toString().split(" ")[0];
      var a = orders[i].list;
      for (let j = 0; j < a.length; j++) {
        var item = a[j];
        var parts = item.split("|");
        var c = 0;
        if (
          parts[0].includes("-") &&
          !parts[0].includes("-BBC") &&
          parts[0].includes("Cajica")
        ) {
          if (parts[0].includes("glass")) {
            c = 0.33 * parseInt(parts[2]);
          }
          if (parts[0].includes("pint")) {
            c = 0.57 * parseInt(parts[2]);
          }
          if (parts[0].includes("jar")) {
            c = 1.5 * parseInt(parts[2]);
          }
          if (parts[0].includes("tower")) {
            c = 3 * parseInt(parts[2]);
          }
          if (dweek == "Mon") {
            days[0] = days[0] + c;
          }
          if (dweek == "Tue") {
            days[1] = days[1] + c;
          }
          if (dweek == "Wed") {
            days[2] = days[2] + c;
          }
          if (dweek == "Thu") {
            days[3] = days[3] + c;
          }
          if (dweek == "Fri") {
            days[4] = days[4] + c;
          }
          if (dweek == "Sat") {
            days[5] = days[5] + c;
          }
          if (dweek == "Sun") {
            days[6] = days[6] + c;
          }
        }
      }
    }
    res.json(days);
  });
});

router.get;

module.exports = router;
