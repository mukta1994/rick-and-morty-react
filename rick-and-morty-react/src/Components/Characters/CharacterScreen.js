import React, { useState, useEffect } from 'react';
import { getSingleOrmultipleData } from '../../Apis/Api';
import { extractLocationId, extractIds } from '../../Constants/Constants';
import List from "../General/List";
import AutoCompleteGenaral from "../General/AutoCompleteGenaral";


// component which shows details of character by id. search bar is provided to search other characters
const CharacterScreen =(props)=> {
  const [LocationInfo, setLocationInfo] = useState("");
  const [characterInfo, setcharacterInfo] = useState("");
  const [episodeInfo, setepisodeInfo] = useState([]);
  const [name, setname] = useState([]);


  useEffect(() => {
    (async () => {
    //by using  character id retrieve location,episodes and dimension info
    if (props.match.params.id) {
        const character=(await getSingleOrmultipleData('character', props.match.params.id));
        setcharacterInfo(character)
        setname(character.location.name)
        const locationIds = extractLocationId(character.location.url);
        const episodeIds = extractIds(character.episode);
        setLocationInfo (await getSingleOrmultipleData('location', locationIds));
        if(episodeIds.includes(","))
          setepisodeInfo(await getSingleOrmultipleData('episode', episodeIds));
        else
          setepisodeInfo([await getSingleOrmultipleData('episode', episodeIds)]);
    }
  })()
},[props.match.params.id])


    let episodeDetails = null;
    let characterList = null;
      episodeDetails = episodeInfo.map(episode => {
        return <List key={episode.id} name={episode.name} property={episode.air_date} path={`/episode/${episode.id}`}></List>
      });
   
      characterList = <div className="top-section character-screen" style={{ height: "100%" }}>
             <div className="search-bar" style={{ margin: 'auto' }} > <AutoCompleteGenaral pathname="character"></AutoCompleteGenaral></div>
        <div className="character-detail container">
          <div
            className="character-image" >
            <figure className="item-thumb-wrap">
              <img
                src={characterInfo.image}
                alt={characterInfo.name}
                className="item-thumb-image"
              />
            </figure>
          </div>
          <div className="character-desc">
            <h2 className="character-item__title">{characterInfo.name}</h2>
            <span className={`${characterInfo.status === "Alive" ? "alive" : `${characterInfo.status === "Dead" ? "dead" : ""}`}`}>●</span>{" " + characterInfo.status}
            <br />

            <p>Species:</p>
            <p className="property">{characterInfo.species}</p>

            <p>Gender:</p>
            <p className="property">{characterInfo.gender}</p>

            <p>{name ? "Last known location:" : ""} </p>
             <p className="property">{name}</p>
          
            <p>{LocationInfo.dimension ? "Dimension:" : ""}</p>
            <p className="property">{LocationInfo.dimension}</p>
          </div>
        </div>
      </div>

    return (
      <div >
        <div>
          {characterList}
        </div>
        <div className="container">
          <div className="title">Episodes</div>
          {episodeDetails}
        </div>

      </div>
    );

  }

export default CharacterScreen;

