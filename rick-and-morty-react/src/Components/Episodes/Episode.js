import React, {  } from "react";
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';
import { extractIds } from '../../Constants/Constants';
import { getEpisode, getCharacters } from '../../Apis/Api';
import CharacterCard from "../../Components/General/CharacterCard";

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
                const EpisodeInfo = await getEpisode(this.props.match.params.id);
               const residentIds = extractIds(EpisodeInfo.characters);

                const episodeCharacters = await getCharacters(residentIds);
                
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
            if(episodeCharacters){
                characterList = episodeCharacters.map(character => {
                    return <CharacterCard key={character.id} data={character} />; 
                });
            }
            if (!loading && EpisodeInfo) {
             episodeDetails = (
                  <div className="movie-details-wrapper">
                    <h1>Episode : {EpisodeInfo.name}</h1>
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
