import React, {  useState, useEffect  } from "react";
import {extractIdsFromArr } from '../../Constants/Constants';
import { getLocationsinfo, getSingleOrmultipleData } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

//shows Characters by using dimension name. 
//1.gets all locations by dimension 
//2 By using those location characters are retrieved
    const Dimension =(props)=> {
    
        const [residents, setresidents] = useState();
        const [LocationInfo, setLocationInfo] = useState();

          useEffect(()=>{
            (async () => {
          //get locations and characters for given dimension
            if (props.match.params.dimension) {
              try {
                const Location = await getLocationsinfo(props.match.params.dimension);   
                setLocationInfo(Location)
                const residentIds =  extractIdsFromArr(Location); 
                if(residentIds)
                  setresidents(await getSingleOrmultipleData('character',residentIds));
                
              } catch (err) {
              }
            }
          })()
        },[props.match.params.dimension])
        
            let locationDetails = null;
            let characterList =null;
            if(residents && residents.length){
            characterList = residents.map(character => {
                return <CharacterCard key={character.id} data={character} />; 
            });
        }
        else if(residents){
          characterList= <CharacterCard key={residents.id} data={residents} />; 
        }
        else 
        characterList= <div className="no-data"> No characters for this dimension</div>; 

            if (LocationInfo) {
             locationDetails = (
                  <div className="movie-details-wrapper">
                    <div className="title">Dimension : {props.match.params.dimension}</div>            
                  </div>
                );
              }
          return(
            <div className="">
             {locationDetails}
             {characterList}
            </div>
          );
      }

    export default Dimension;
