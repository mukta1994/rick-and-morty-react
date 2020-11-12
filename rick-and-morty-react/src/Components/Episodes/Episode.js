import React, { useState, useEffect } from "react";
import { extractIds } from '../../Constants/Constants';
import {  getSingleOrmultipleData } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

// shows Characters of episode using episode id. 
    const Episode =(props)=> {
          const [episodeCharacters, setepisodeCharacters] = useState([]);
          const [EpisodeInfo, setEpisodeInfo] = useState("");
          useEffect(()=>{
            (async () => {
            if (props.match.params.id) {
              try {
               const Episode = await getSingleOrmultipleData('episode',props.match.params.id);
                setEpisodeInfo(Episode)
               const residentIds = extractIds(Episode.characters);
               if(residentIds.includes(","))
                  setepisodeCharacters( await getSingleOrmultipleData('character',residentIds));
               else
                  setepisodeCharacters([await getSingleOrmultipleData('character',residentIds)]);
              } catch (err) {
              }
            }
          })()
          },[props.match.params.id])
        
            let episodeDetails = null;
            let characterList=null;
                characterList = episodeCharacters.map(character => {
                    return <CharacterCard key={character.id} data={character} />; 
                });
            
            if(!episodeCharacters.length)
               characterList= <div className="no-data"> No characters for this dimension</div>; 
    
             episodeDetails = (
                  <div className="movie-details-wrapper">
                    <div className="title">Episode : {EpisodeInfo.name}</div>
                    {characterList}
                  </div>
                );
          return(
            <div className="project">
             {episodeDetails}
            </div>
          );
      }

    export default Episode;
