import React, { useState, useEffect } from 'react';
import List from "../General/List";
import { getAllData } from '../../Apis/Api';
import { useInfiniteQuery } from 'react-query';
import AutoCompleteGenaral from "../General/AutoCompleteGenaral";
import {getlistdata } from '../../Constants/Constants';


const Locations = (props) => {
  const [locationArray, setLocationArray] = useState([]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const { status, data, fetchMore } = useInfiniteQuery(
    ['locations','location'],
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
  function handleScroll() {
    console.log("asdf")
    if (data && (data[0].pages >= (data[data.length - 1].nextPage - 1)) && data[data.length - 1].nextPage !== null) {
      fetchMore();
      setLocationArray(list);
    }
  }

  const list = getlistdata(data);

  let locationList = ""
  if (list) {
    if (locationArray.length === 0) {
      setLocationArray(list);
    }
    locationList = locationArray.map(location => {
      return <div className={`${(location.residents !== undefined && location.residents.length === 0) ? "disabled" : ""}`} key={location.id}>
        <List name={location.name} property={location.dimension} path={`/location/${location.id}`} page="location"></List>

      </div>;
    });
  }

  return <div onScroll={() => fetchMore()}>
    <div className="title">Locations</div>
    <div className="sort-options">
      <AutoCompleteGenaral pathname="location"></AutoCompleteGenaral>
      </div>
    <div >{locationList}</div>
  </div>
}


export default Locations;

