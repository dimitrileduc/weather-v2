import React, { useState, useEffect } from "react";
import Moment from "moment";
import {VictoryTheme,VictoryChart, VictoryLine  } from "victory";



import "./App.css";

function App() {
  const [locations, setLocations] = useState("london");

  const [photos, setPhotos] = useState([]);

  const [currentT, setCurrentT] = useState();
  const [currentWeather, setCurrentWeather] = useState();

  const [nextDayT, setNextDayT] = useState();
  const [nextDayWeather, setNextDayWeather] = useState();

  const [J2T, setJ2T] = useState();
  const [J2Weather, setJ2Weather] = useState();

  const [j3T, setJ3T] = useState();
  const [j3Weather, setJ3Weather] = useState();

  const [j4T, setJ4T] = useState();
  const [j4Weather, setJ4Weather] = useState();

  const [j5T, setJ5T] = useState();
  const [j5Weather, setJ5Weather] = useState();

  const [j6T, setJ6T] = useState();
  const [j6Weather, setJ6Weather] = useState();

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

  const j1Graph = Moment().add(1, "days").format("ddd  ").toString();
  const j2Graph = Moment().add(2, "days").format("ddd  ").toString();
  const j3Graph = Moment().add(3, "days").format("ddd  ").toString();
  const j4Graph = Moment().add(4, "days").format("ddd  ").toString();
  const j5Graph = Moment().add(5, "days").format("ddd  ").toString();
  const j6Graph = Moment().add(6, "days").format("ddd  ").toString();



  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${locations}&limit=1&appid=c728df12326ce2d393585d06d1f41d26&units=metric`
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

            setNextDayT(object.daily[1].temp.day);
            setNextDayWeather(object.daily[1].weather[0].main);

            setJ2T(object.daily[2].temp.day);
            setJ2Weather(object.daily[2].weather[0].main);

            setJ3T(object.daily[3].temp.day);
            setJ3Weather(object.daily[3].weather[0].main);

            setJ4T(object.daily[4].temp.day);
            setJ4Weather(object.daily[4].weather[0].main);

            setJ5T(object.daily[5].temp.day);
            setJ5Weather(object.daily[5].weather[0].main);

            setJ6T(object.daily[6].temp.day);
            setJ6Weather(object.daily[6].weather[0].main);
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
        <img className="app__image" src={photos} alt="" />
        <div className="app__data">
          <h3>{formatDate}</h3>

          <p className="temp">Current Temperature: {currentT}°</p>
          <p className="temp">Current Weather: {currentWeather}</p>

          <h3>{tommorowDate}</h3>
          <p className="temp"> Temperature: {nextDayT}°</p>
          <p className="temp">Weather: {nextDayWeather}</p>

          <h3>{j2Date}</h3>
          <p className="temp"> Temperature: {J2T}°</p>
          <p className="temp">Weather: {J2Weather}</p>

          <h3>{j3Date}</h3>
          <p className="temp"> Temperature: {j3T}°</p>
          <p className="temp">Weather: {j3Weather}</p>

          <h3>{j4Date}</h3>
          <p className="temp"> Temperature: {j4T}°</p>
          <p className="temp">Weather: {j4Weather}</p>

          <h3>{j5Date}</h3>
          <p className="temp"> Temperature: {j5T}°</p>
          <p className="temp">Weather: {j5Weather}</p>

          <h3>{j6Date}</h3>
          <p className="temp"> Temperature: {j6T}°</p>
          <p className="temp">Weather: {j6Weather}</p>
        </div>
        
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
          //animate={{ duration: 2000 }}
          interpolation="natural"
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
            data={[
              
              { x: 1, y: currentT },
              { x: 2, y: nextDayT },
              { x: 3, y: J2T },
              { x: 4, y: j3T },
              { x: 5, y: j4T },
              { x: 6, y: j5T },
              { x: 7, y: j6T },
            ]}
            categories={{ x: ["today",j1Graph,j2Graph, j3Graph, j4Graph, j5Graph, j6Graph] }}
          />
        </VictoryChart>
      </div>
    </div>
  );
}

export default App;

