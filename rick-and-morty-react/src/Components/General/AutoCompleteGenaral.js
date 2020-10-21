import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { getInfobyName,getLocationsinfo } from '../../Apis/Api';
import { withRouter } from 'react-router-dom';
import {getdistinctDatabyusingProperty } from '../../Constants/Constants';

//General autocomplete list used by dimension, location and episode and characterScreen components
const AutoCompleteGenaral = (props) => {
    const [options, setOptions] = useState([]);
    async function searchresult(e) { 
      if(e.target.value){
      if(props.pathname==='dimension'){
        const list= await getLocationsinfo(props.pathname,e.target.value)
        setOptions(getdistinctDatabyusingProperty(list))
      }
      else
        setOptions(await getInfobyName(props.pathname,e.target.value));
        }
      }

        const goTo = (val) => {
          if(val!=null)
          {
            let param=""
            if(props.pathname==='dimension')
              param=val.dimension
            else
              param=val.id
            let url = `/`+props.pathname+`/`;
          props.history.push(url + param);}
          }
      

    return(
      <Autocomplete
      id="combo-box-demo"
      includeInputInList
      options={options}
      getOptionLabel={(option) => props.pathname==='dimension' ? option.dimension : option.name}
      renderInput={(params) => <TextField {...params} variant="outlined" placeholder={"Type"+" "+props.pathname} className="search-term"   onChange={searchresult} />}
      onChange={(event, value) => {console.log(value);goTo(value)}}
    />)
}

export default withRouter(AutoCompleteGenaral);