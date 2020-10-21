import React, { useState, useEffect } from 'react';
import Character from "./Character";
import "./CharacterList.scss";
import { getAllData } from '../../Apis/Api';
import { useInfiniteQuery } from 'react-query';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom'
import { filterOptions, filtereddata,getlistdata,searchdatabyname } from '../../Constants/Constants';


const CharacterList = (props) => {
  const [filterOptionSelected, setfilterOptionSelected] = useState('name-asc');
  const [query, setquery] = useState("");
  const [characterArray, setCharacterArray] = useState([]);
  const [value, setValue] = React.useState(filterOptions[0]);
  const sortOptions = filterOptions;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const { status, data, fetchMore } = useInfiniteQuery(
    ['characters','character'],
    getAllData,
    {
      getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage,
    }
  );
  if (status === 'loading') {
    return (
      <p>loading</p>
    );
  }

  const list = getlistdata(data);
  
  function handleScroll() {
    if (query === "") {
      if (data && (data[0].pages >= (data[data.length - 1].nextPage - 1)) && data[data.length - 1].nextPage !== null) {
        fetchMore();    
        setCharacterArray(filtereddata(filterOptionSelected, list));
      }
    }
  }

  let characterList = ""
  if (list) {
    if (characterArray.length === 0 && query === "") {
      setCharacterArray(filtereddata(filterOptionSelected, list));
    }
    characterList = characterArray.map(character => {
      return <div className="character-item" key={character.id}>
        <Character data={character} /></div>;
    });
  }

  //search data in the list of characters by name
  const searchdata = (e) => {
    setquery(e.target.value);
    console.log("search")
    if (e.target.value !== "") {
      const newList = searchdatabyname(list,e.target.value)
      setCharacterArray(newList);
    }
    else {
      setCharacterArray(list)
    }
  }

  //redirect to specific character
  const goTo = (val) => {
    console.log(val)
    if(val.id!==undefined){
      let url = `/character/`;
      props.history.push(url + val.id);
    }
    
  }

  const sortData = (e, val) => {
    if (val !== null) {
      setfilterOptionSelected(val.val)
      const sortedData = filtereddata(val.val, characterArray)
      setCharacterArray(sortedData);
    }

  }

  let nodata="";
  if (characterArray.length === 0 && query !== "") {
    nodata = <div className="no-data">no characters matching this word</div>
  }

  return <div>
    <div className="top-section-home">
      <div className="search-bar" style={{ margin: 'auto' }} >
        {/* autocomplete which has input filed for search */}
        <h2>Rick and Morty</h2>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={list}
          getOptionLabel={(option) => option.name}
          style={{ margin: 'auto' }}
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

{/* autocomplete where it includes only input as list item  */}
    <div className="container main-content">
      <div className="sort-options">
        <Autocomplete
          value={value}
          id="include-input-in-list"
          includeInputInList
          options={sortOptions}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            setValue(newValue);
            sortData(event, newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Sorting options" margin="normal" />
          )}
        /></div>
      <div className="characters-wrap" >{characterList}</div>
      {nodata}
    </div></div>
}


export default withRouter(CharacterList);
