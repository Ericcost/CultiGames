import React from "react";
import "./Home.scss";
import Button from "../../components/Button/Button"
import Banner from "../../components/Banner/Banner";
import gamesImg from "../../assets/images/test-game.png";

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <div className="home-content">
        <div className="home-title">
          <h1>Jeux</h1>
        </div>
        <div className="home-game">
          <img src={gamesImg} alt="image du jeu" />
          <Button content="Aller au jeu"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
