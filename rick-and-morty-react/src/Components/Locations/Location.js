import React, { useState, useEffect  } from "react";
import { extractIds } from '../../Constants/Constants';
import {  getSingleOrmultipleData } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

// shows Characters under the specific location using location id
const Location = (props) => {
  const [residents, setresidents] = useState([]);
  const [LocationInfo, setLocationInfo] = useState("");

    useEffect(() => {
      (async () => {
        if (props.match.params.id) {
          try {
            const location=await getSingleOrmultipleData('location',props.match.params.id);
            setLocationInfo(location)
            if(location.residents.length){
              const residentIds = extractIds(location.residents); 
              if(residentIds.includes(","))
                setresidents(await getSingleOrmultipleData('character',residentIds));
                else     
                setresidents([await getSingleOrmultipleData('character',residentIds)]);          
            }
         
          } catch (err) {
          }
        }
      })()
    },[props.match.params.id]);


      let locationDetails = null;
      let characterList =null;
      
       locationDetails = (
              <div className="title">Location : {LocationInfo.name}</div>            
          );   
          characterList = residents.map(character => {
              return <CharacterCard key={character.id} data={character} />; 
          });
   
          if(!residents.length)
            characterList=<div className="no-data">No characters found for this location</div>; 

    return(
      <div className="">
       {locationDetails}
       {characterList}
      </div>
    );
}

    export default Location;
