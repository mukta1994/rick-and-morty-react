import React, {  } from "react";
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';
import { extractIds } from '../../Constants/Constants';
import {  getSingleOrmultipleData } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

// shows Characters of episode using episode id. 
    class Episode extends React.Component {
        state = {
            EpisodeInfo: null,
            loading: true,
            error: true,
            episodeCharacters:null
          };
        async componentDidMount() {
            if (this.props.match.params.id) {
              try {
                const EpisodeInfo = await getSingleOrmultipleData('episode',this.props.match.params.id);
               const residentIds = extractIds(EpisodeInfo.characters);

                const episodeCharacters = await getSingleOrmultipleData('character',residentIds);
                
                this.setState({
                  loading: false,
                  EpisodeInfo,                 
                  error: false,
                  episodeCharacters
                });
              } catch (err) {
                this.setState({ loading: false, error: true });
              }
            }
          }
        
        render() {
            const { EpisodeInfo,loading,episodeCharacters } = this.state;
            let episodeDetails = null;
            let characterList=null;
            if(episodeCharacters && episodeCharacters.length!==0){
                characterList = episodeCharacters.map(character => {
                    return <CharacterCard key={character.id} data={character} />; 
                });
            } 
            else if(episodeCharacters){
              characterList= <CharacterCard key={episodeCharacters.id} data={episodeCharacters} />; 
            }
            else 
            characterList= <div class="no-data"> No characters for this dimension</div>; 
    
            if (!loading && EpisodeInfo) {
             episodeDetails = (
                  <div className="movie-details-wrapper">
                    <div className="title">Episode : {EpisodeInfo.name}</div>
                    {characterList}
                  </div>
                );
              }
          return(
            <div className="project">
             {episodeDetails}
            </div>
          );
        }
      }

    export default Episode;
