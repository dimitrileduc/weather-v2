import React, { useState, useEffect } from "react";
import Moment from "moment";

import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  

  const [photos, setPhotos] = useState([]);

  const [currentT, setCurrentT] = useState();
  const [currentWeather, setCurrentWeather] = useState();

  const [nextDayT, setNextDayT] = useState();
  const [nextDayWeather, setNextDayWeather] = useState();



  const [day, setDay] = useState();
  const [weekT, setWeekT] = useState();

  const formatDate = Moment().format("[Today ] ");
  const tommorowDate = Moment()
    .add(1, "days")
    .format("ddd DD MMMM ")
    .toString();
  const j2Date = Moment().add(2, "days").format("ddd DD MMMM ").toString();
  const j3Date = Moment().add(3, "days").format("ddd DD MMMM ").toString();
  const j4Date = Moment().add(4, "days").format("ddd DD MMMM ").toString();
  const j5Date = Moment().add(5, "days").format("ddd DD MMMM ").toString();
  const j6Date = Moment().add(6, "days").format("ddd DD MMMM ").toString();

  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${locations}&limit=1&appid=c728df12326ce2d393585d06d1f41d26&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            //return alert("Oops, there seems to be an error!(wrong location)");
          }
          //alert("Oops, there seems to be an error!");
          //throw new Error("You have an error");
        }
      })
      .then((object) => {
        

        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${object[0].lat}&lon=${object[0].lon}&appid=c728df12326ce2d393585d06d1f41d26&units=metric`
        )
          .then((res) => {
            if (res.ok) {
              console.log(res.status);
              return res.json();
            } else {
              if (res.status === 404) {
                return alert(
                  "Oops, there seems to be an error!(wrong location)"
                );
              }
              alert("Oops, there seems to be an error!");
              throw new Error("You have an error");
            }
          })
          .then((object) => {
            setCurrentWeather(object.current.weather[0].main);
            console.log(object);
            setCurrentT(object.current.temp);
            //setCurrentWeather(object.list[0].weather[0].main);
            //console.log(tommorowDate)

            setNextDayT(object.daily[1].temp.day)
            setNextDayWeather(object.daily[1].weather[0].main)
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=I8PNeqzqy1xX9iUVSU8DC_FdGnrQUSomU1c9zSOaEww`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <h3>{formatDate}</h3>

          <p className="temp">Current Temperature: {currentT}</p>
          <p className="temp">Current Weather: {currentWeather}</p>
          

          <h3>{tommorowDate}</h3>
          <p className="temp"> Temperature: {nextDayT}</p>
          <p className="temp">Weather: {nextDayWeather}</p>
          <h3>{j2Date}</h3>
          <h3>{j3Date}</h3>
          <h3>{j4Date}</h3>
          <h3>{j5Date}</h3>
          <h3>{j6Date}</h3>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;

/*
 <p className="temp">Current Temperature: {currentT}</p>
          <p className="temp">Current Weather: {currentWeather}</p>
          */

/*
          fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=c728df12326ce2d393585d06d1f41d26`
        )
          .then((res) => {
            if (res.ok) {
              console.log(res.status);
              return res.json();
            } else {
              if (res.status === 404) {
                return alert(
                  "Oops, there seems to be an error!(wrong location)"
                );
              }
              alert("Oops, there seems to be an error!");
              throw new Error("You have an error");
            }
          })
          .then((object) => {
            //setWeather(object);
            console.log(object);
            //setCurrentT(object.list[0].main.temp);
            //setCurrentWeather(object.list[0].weather[0].main);
            //console.log(tommorowDate)
          })
          .catch((error) => console.log(error));

          nextDayWeather
          */
