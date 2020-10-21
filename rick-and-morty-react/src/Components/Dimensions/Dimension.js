import React, {  } from "react";
import {extractIdsFromArr } from '../../Constants/Constants';
import { getLocationsinfo, getSingleOrmultipleData } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

//shows Characters by using dimension name. 
//1.gets all locations by dimension 
//2 By using those location characters are retrieved
    class Dimension extends React.Component {
        state = {
            LocationInfo: null,
            loading: true,
            error: true,
            residents:null
          };
        async componentDidMount() {
          //get locations and characters for given dimension
            if (this.props.match.params.dimension) {
              try {
                const LocationInfo = await getLocationsinfo(this.props.match.params.dimension);   
                const residentIds =  extractIdsFromArr(LocationInfo); 
                const residents = await getSingleOrmultipleData('character',residentIds);
                
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

            if (!loading && LocationInfo) {
             locationDetails = (
                  <div className="movie-details-wrapper">
                    <div className="title">Dimension : {this.props.match.params.dimension}</div>            
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
      }

    export default Dimension;
