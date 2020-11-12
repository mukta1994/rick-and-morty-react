import React, {  useState, useEffect  } from "react";
import {extractIdsFromArr } from '../../Constants/Constants';
import { getLocationsinfo, getSingleOrmultipleData } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

//shows Characters by using dimension name. 
//1.gets all locations by dimension 
//2 By using those location characters are retrieved
    const Dimension =(props)=> {
    
        const [residents, setresidents] = useState([]);

          useEffect(()=>{
            (async () => {
          //get locations and characters for given dimension
            if (props.match.params.dimension) {
              try {
                const Location = await getLocationsinfo(props.match.params.dimension);   
                const residentIds =  extractIdsFromArr(Location); 
                if(residentIds.includes(","))
                  setresidents(await getSingleOrmultipleData('character',residentIds));
                else
                setresidents([await getSingleOrmultipleData('character',residentIds)]);
                
              } catch (err) {
              }
            }
          })()
        },[props.match.params.dimension])
        
            let locationDetails = null;
            let characterList =null;
            characterList = residents.map(character => {
                return <CharacterCard key={character.id} data={character} />; 
            });

            if(!residents.length)
               characterList= <div className="no-data"> No characters for this dimension</div>; 

             locationDetails = (
                  <div className="movie-details-wrapper">
                    <div className="title">Dimension : {props.match.params.dimension}</div>            
                  </div>
                );
          return(
            <div className="">
             {locationDetails}
             {characterList}
            </div>
          );
      }

    export default Dimension;
