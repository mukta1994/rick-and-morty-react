import React, { useState } from 'react';
import Character from "./Character";
import "./CharacterList.scss";
import { getAllCharacters, getCharacterinfo } from '../../Apis/Api';
import { useInfiniteQuery } from 'react-query';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withRouter} from 'react-router-dom'
import CustomButton from "../../Components/General/CustomButton";

const CharacterList = (props) => {
  const [options, setOptions] = useState([]);
  //const [redirect, setRedirect] = useState();


  const { status, data, fetchMore } = useInfiniteQuery(
    'characters',
    getAllCharacters,
    {
      getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage,
    }
  );
  if (status === 'loading') {
    return (
      <p>loading</p>
    );
  }

  const list = [];
  //let list1 = [];
  data.forEach((page) => {
    page.data &&
      page.data.forEach((char) => {
        list.push(char);
      });
  });
  let characterList = ""
  if (list) {
    characterList = list.map(character => {
      return             <div className="character-item"  key={character.id}>
      <Character data={character} /></div>;
    });
  }

  async function searchresult(e) {
    
    setOptions(await getCharacterinfo(e.target.value).catch(error => {
      console.log(error,"err")  // 'An error has occurred: 404'
      console.log(options,"options")
     }));

 
  }

  const goTo=(val)=>{
    let url = `/character/`;
    props.history.push(url+val.id);
  }
  
  let btn=""
  if(data[0].pages !== data[data.length - 1].next){
    btn=<CustomButton fetch={fetchMore}/>
  }
  
  return <div>
        <div className="top-section"></div>
        <div className="container main-content">
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }} 
      renderInput={(params) => <TextField {...params} variant="outlined" onChange={searchresult} />}
      onChange={(event, value) => goTo(value)}
    />

    <div className="characters-wrap" >{characterList}</div>
    {btn}
  </div></div>
}


export default withRouter(CharacterList);
