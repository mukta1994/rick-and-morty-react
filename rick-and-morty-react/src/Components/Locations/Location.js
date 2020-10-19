import React, {  } from "react";
import { extractIds } from '../../Constants/Constants';
import { getLocation, getCharacters } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

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
                const LocationInfo = await getLocation(this.props.match.params.id);
                let residents="";
                if(LocationInfo.residents.length){
                  const residentIds = extractIds(LocationInfo.residents);  
                   residents = await getCharacters(residentIds);
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
                    <h1>Location : {LocationInfo.name}</h1>            
                  </div>
                );
           
              }
              if(residents && residents.length){
               
                characterList = residents.map(character => {
                    return <CharacterCard key={character.id} data={character} />; 
                });
            }
            else if(residents){
              return characterList=<div> {locationDetails} <CharacterCard key={residents.id} data={residents} /></div>; 
            }
            else
            return characterList=<div>no characters found</div>; 

          return(
            <div className="">
             {locationDetails}
             {characterList}
            </div>
          );
        }
      }

    export default Location;
