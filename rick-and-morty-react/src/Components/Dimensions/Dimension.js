import React, {  } from "react";
import {extractIdsFromArr } from '../../Constants/Constants';
import { getLocationinfo, getCharacters } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

    class Dimension extends React.Component {
        state = {
            LocationInfo: null,
            loading: true,
            error: true,
            residents:null
          };
        async componentDidMount() {
            if (this.props.match.params.dimension) {
              try {
                const LocationInfo = await getLocationinfo(this.props.match.params.dimension);                     
                const residentIds =  extractIdsFromArr(LocationInfo); 
                const residents = await getCharacters(residentIds);
                
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
            return <CharacterCard key={residents.id} data={residents} />; 

        }
            if (!loading && LocationInfo) {
             locationDetails = (
                  <div className="movie-details-wrapper">
                    <h1>Dimension : {this.props.match.params.dimension}</h1>            
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
