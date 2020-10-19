import React, { } from 'react';
//import { useQuery } from 'react-query';
import { getCharacters,getLocation,getEpisode } from '../../Apis/Api';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import { extractLocationId,extractIds } from '../../Constants/Constants';
import List from "../General/List";


class CharacterScreen extends React.Component {
    state = {
        LocationInfo: null,
        loading: true,
        error: true,
        residents:null,
        characterInfo:null,
        episodeInfo:null
      };
    async componentDidMount() {
        if (this.props.match.params.id) {
          try {
            const characterInfo=await getCharacters(this.props.match.params.id);
            const locationIds=extractLocationId(characterInfo.location.url);
            const episodeIds=extractIds(characterInfo.episode);
            const LocationInfo = await getLocation(locationIds);
            const episodeInfo = await getEpisode(episodeIds);
            
            this.setState({
              loading: false,
              LocationInfo,                 
              error: false,
              characterInfo,
              episodeInfo
            });
          } catch (err) {
            this.setState({ loading: false, error: true });
          }
        }
      }
    
    render() {
        const { LocationInfo,characterInfo,episodeInfo } = this.state;

        let episodeDetails = null;
        let characterList =null;
        if(episodeInfo && episodeInfo.length){
        episodeDetails = episodeInfo.map(episode => {
            // return <CharacterItem key={character.id} data={character} />
            return <List name={episode.name} property={episode.air_date} path={`/episode/${episode.id}`}></List>
        });
    }
    else if(episodeInfo){
        episodeDetails =  
        <List name={episodeInfo.name} property={episodeInfo.air_date} path={`/episode/${episodeInfo.id}`}></List>      
    }
        if(characterInfo ){
         characterList =<div className="top-section" style={{height:"100%"}}>
        {/* <Card className="char-card">
            <CardContent> */}
            {/* <div className="container"> */}
                <div className="character-detail container">
                    <div
                        className="character-image" >
                        <figure className="item-thumb-wrap">
                            <img
                                src={characterInfo.image}
                                alt={characterInfo.name}
                                className="item-thumb-image"
                            />
                        </figure>
                    </div>
                    <div className="character-desc">
                        <h2 className="character-item__title">{characterInfo.name}</h2>
                        <span className={`${characterInfo.status==="Alive" ? "alive" : `${characterInfo.status==="Dead" ? "dead" : ""}`}`}>●</span>{" "+characterInfo.status}
                        <br/>
                        
                        <p>Species:</p>
                        <p className="property">{characterInfo.species}</p>

                        <p>Gender:</p>
                        <p className="property">{characterInfo.gender}</p>

                        <p>{characterInfo.location.name ?"Last known location:" : ""} </p>
                        <p className="property">{characterInfo.location.name}</p>

                        <p>{LocationInfo.dimension ?"Dimension:" : ""}</p>
                        <p className="property">{LocationInfo.dimension}</p>
                    </div>
                </div>
            {/* </CardContent></Card> */}
            </div>
            {/* </div> */}
                    }

      return(
        <div >
            <div>
            {characterList}

            </div>
         <div className="container">
         <h2>Episodes</h2>
         {episodeDetails}
         </div>
        
        </div>
      );
   
  }
}

export default CharacterScreen;

