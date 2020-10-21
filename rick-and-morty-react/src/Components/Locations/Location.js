import React, {  } from "react";
import { extractIds } from '../../Constants/Constants';
import {  getSingleOrmultipleData } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

// shows Characters under the specific location using location id
  class Location extends React.Component {
        state = {
            LocationInfo: null,
            loading: true,
            error: true,
            residents:null
          };
        async componentDidMount() {
            if (this.props.match.params.id) {
              try {
                const LocationInfo = await getSingleOrmultipleData('location',this.props.match.params.id);
                let residents="";
                if(LocationInfo.residents.length){
                  const residentIds = extractIds(LocationInfo.residents);  
                   residents = await getSingleOrmultipleData('character',residentIds);
                }
                               
                this.setState({
                  loading: false,
                  LocationInfo,                 
                  error: false,
                  residents
                });
              } catch (err) {
                this.setState({ loading: false, error: true });
              }
            }
          }
        
        render() {
            const { LocationInfo,loading,residents } = this.state;

            let locationDetails = null;
            let characterList =null;
            
            if (!loading && LocationInfo) {
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
               characterList=<div> {locationDetails} <CharacterCard key={residents.id} data={residents} /></div>; 
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
      }

    export default Location;
