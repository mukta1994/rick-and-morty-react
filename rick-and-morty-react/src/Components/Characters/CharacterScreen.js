import React, { } from 'react';
import { getSingleOrmultipleData } from '../../Apis/Api';
import { extractLocationId, extractIds } from '../../Constants/Constants';
import List from "../General/List";
import AutoCompleteGenaral from "../General/AutoCompleteGenaral";


// component which shows details of character by id. search bar is provided to search other characters
class CharacterScreen extends React.Component {
  state = {
    LocationInfo: null,
    loading: true,
    error: true,
    residents: null,
    characterInfo: null,
    episodeInfo: null
  };
  async componentDidMount() {
    //by using  character id retrieve location,episodes and dimension info
    if (this.props.match.params.id) {
      try {
        const characterInfo = await getSingleOrmultipleData('character', this.props.match.params.id);
        const locationIds = extractLocationId(characterInfo.location.url);
        const episodeIds = extractIds(characterInfo.episode);
        const LocationInfo = await getSingleOrmultipleData('location', locationIds);
        const episodeInfo = await getSingleOrmultipleData('episode', episodeIds);

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

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      if (this.props.match.params.id) {
        try {
          const characterInfo = await getSingleOrmultipleData('character', this.props.match.params.id);
          const locationIds = extractLocationId(characterInfo.location.url);
          const episodeIds = extractIds(characterInfo.episode);
          const LocationInfo = await getSingleOrmultipleData('location', locationIds);
          const episodeInfo = await getSingleOrmultipleData('episode', episodeIds);
  
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
  }

  render() {
    const { LocationInfo, characterInfo, episodeInfo } = this.state;

    let episodeDetails = null;
    let characterList = null;
    if (episodeInfo && episodeInfo.length) {
      episodeDetails = episodeInfo.map(episode => {
        // return <CharacterItem key={character.id} data={character} />
        return <List key={episode.id} name={episode.name} property={episode.air_date} path={`/episode/${episode.id}`}></List>
      });
    }
    else if (episodeInfo) {
      episodeDetails =
        <List name={episodeInfo.name} property={episodeInfo.air_date} path={`/episode/${episodeInfo.id}`}></List>
    }
    if (characterInfo) {
      characterList = <div className="top-section character-screen" style={{ height: "100%" }}>
             <div className="search-bar" style={{ margin: 'auto' }} > <AutoCompleteGenaral pathname="character"></AutoCompleteGenaral></div>
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
            <span className={`${characterInfo.status === "Alive" ? "alive" : `${characterInfo.status === "Dead" ? "dead" : ""}`}`}>●</span>{" " + characterInfo.status}
            <br />

            <p>Species:</p>
            <p className="property">{characterInfo.species}</p>

            <p>Gender:</p>
            <p className="property">{characterInfo.gender}</p>

            <p>{characterInfo.location.name ? "Last known location:" : ""} </p>
            <p className="property">{characterInfo.location.name}</p>

            <p>{LocationInfo.dimension ? "Dimension:" : ""}</p>
            <p className="property">{LocationInfo.dimension}</p>
          </div>
        </div>
      </div>
    }

    return (
      <div >
        <div>
          {characterList}
        </div>
        <div className="container">
          <div className="title">Episodes</div>
          {episodeDetails}
        </div>

      </div>
    );

  }
}

export default CharacterScreen;

