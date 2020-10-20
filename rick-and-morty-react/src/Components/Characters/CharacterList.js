import React, { useState, useEffect } from 'react';
import Character from "./Character";
import "./CharacterList.scss";
import { getAllCharacters } from '../../Apis/Api';
import { useInfiniteQuery } from 'react-query';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom'
import {filterOptions,filtereddata} from '../../Constants/Constants'; 


const CharacterList = (props) => {
  const [filterOptionSelected, setfilterOptionSelected] = useState('name-asc');
  const [que, setque] = useState("");
  const [characterArray, setCharacterArray] = useState([]);
  const [value, setValue] = React.useState(filterOptions[0]);
  
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

const sortOptions=filterOptions;

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
  function handleScroll() {
    if (que === "") {
      if ((data[0].pages >= (data[data.length - 1].nextPage - 1)) && data[data.length - 1].nextPage !== null) {
        fetchMore();    // }  
        setCharacterArray(filtereddata(filterOptionSelected,list));
      }
    }
  }


  let list = [];
  data.forEach((page) => {
    page.data &&
      page.data.forEach((char) => {
        list.push(char);
      });
  });


  let characterList = ""
  if (list) {
    if (characterArray.length === 0 && que === "") {
      setCharacterArray(filtereddata(filterOptionSelected,list));
    }
    characterList = characterArray.map(character => {
      return <div className="character-item" key={character.id}>
        <Character data={character} /></div>;
    });
  }
  else{
   return characterList = <div>no characters matching this word</div>
  }

  const searchdata = (e) => {
    setque(e.target.value);
    console.log("search")
    if (e.target.value !== "") {
      const newList = list.filter(item => {
        const lc = item.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
      console.log(newList, "lc")
      setCharacterArray(newList);
    }
    else{
      setCharacterArray(list)
    } 
  }

  const goTo = (val) => {
    let url = `/character/`;
    props.history.push(url + val.id);
  }
  const sortData = (e,val) => {
    if(val!==null){
      setfilterOptionSelected(val.val)
      const sortedData=filtereddata(val.val,characterArray)
      setCharacterArray(sortedData);
      console.log(val,"target");
       }
     
  }

  if(characterArray.length===0 && que!==""){
   characterList = <div>no characters matching this word</div>
   }

  return <div>
    <div className="top-section-home">
      <div className="search-bar" style={{margin: 'auto' }} >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={list}
          getOptionLabel={(option) => option.name}
          style={{ margin: 'auto'}}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              variant="outlined" onChange={searchdata} className="search-term" placeholder="search character"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
          onChange={(event, value) => goTo(value)}
        />
      </div>
    </div>
   
    <div className="container main-content">
      <div className="sort-options">
    <Autocomplete
    value={value}
        id="include-input-in-list"
        includeInputInList
        options={sortOptions}
          getOptionLabel={(option) => option.name}     
          onChange={(event, newValue) => { setValue(newValue);
            sortData(event,newValue);
          }}            
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Sorting options" margin="normal" />
        )}           
      /></div>
      <div className="characters-wrap" >{characterList}</div>
    </div></div>
}


export default withRouter(CharacterList);
