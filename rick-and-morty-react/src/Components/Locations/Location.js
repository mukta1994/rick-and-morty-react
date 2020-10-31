import React, { useState, useEffect  } from "react";
import { extractIds } from '../../Constants/Constants';
import {  getSingleOrmultipleData } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

// shows Characters under the specific location using location id
const Location = (props) => {
  const [residents, setresidents] = useState([]);
  const [LocationInfo, setLocationInfo] = useState();

    useEffect(() => {
      (async () => {
        if (props.match.params.id) {
          try {
            const location=await getSingleOrmultipleData('location',props.match.params.id);
            setLocationInfo(location)
            if(location.residents.length){
              const residentIds = extractIds(location.residents);  
              setresidents(await getSingleOrmultipleData('character',residentIds));
            }
         
          } catch (err) {
          }
        }
      })()
    },[props.match.params.id]);


      let locationDetails = null;
      let characterList =null;
      
      if ( LocationInfo) {
       locationDetails = (
            <div className="">
              <div className="title">Location : {LocationInfo.name}</div>            
            </div>
          );
     
        }
        if(residents && residents.length){        
          characterList = residents.map(character => {
              return <CharacterCard key={character.id} data={character} />; 
          });
      }
      else if(residents){
         characterList=<div> <CharacterCard key={residents.id} data={residents} /></div>; 
      }
      else
       characterList=<div className="no-data">No characters found for this location</div>; 

    return(
      <div className="">
       {locationDetails}
       {characterList}
      </div>
    );
}
  // class Location extends React.Component {
  //       state = {
  //           LocationInfo: null,
  //           loading: true,
  //           error: true,
  //           residents:null
  //         };
  //       async componentDidMount() {
  //           if (this.props.match.params.id) {
  //             try {
  //               const LocationInfo = await getSingleOrmultipleData('location',this.props.match.params.id);
  //               let residents="";
  //               if(LocationInfo.residents.length){
  //                 const residentIds = extractIds(LocationInfo.residents);  
  //                  residents = await getSingleOrmultipleData('character',residentIds);
  //               }
                               
  //               this.setState({
  //                 loading: false,
  //                 LocationInfo,                 
  //                 error: false,
  //                 residents
  //               });
  //             } catch (err) {
  //               this.setState({ loading: false, error: true });
  //             }
  //           }
  //         }
        
  //       render() {
  //           const { LocationInfo,loading,residents } = this.state;

  //           let locationDetails = null;
  //           let characterList =null;
            
  //           if (!loading && LocationInfo) {
  //            locationDetails = (
  //                 <div className="">
  //                   <div className="title">Location : {LocationInfo.name}</div>            
  //                 </div>
  //               );
           
  //             }
  //             if(residents && residents.length){
               
  //               characterList = residents.map(character => {
  //                   return <CharacterCard key={character.id} data={character} />; 
  //               });
  //           }
  //           else if(residents){
  //              characterList=<div> <CharacterCard key={residents.id} data={residents} /></div>; 
  //           }
  //           else
  //            characterList=<div className="no-data">No characters found for this location</div>; 

  //         return(
  //           <div className="">
  //            {locationDetails}
  //            {characterList}
  //           </div>
  //         );
  //       }
  //     }

    export default Location;
