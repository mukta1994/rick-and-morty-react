import React, { } from 'react';
import List from "../General/List";
import { getAllLocations } from '../../Apis/Api';
 import { useInfiniteQuery } from 'react-query';
 import CustomButton from "../../Components/General/CustomButton";

const Locations=()  => {        
    const { status, data, fetchMore } = useInfiniteQuery(
        'episodes',
        getAllLocations,
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
      data.forEach((page) => {
        page.data &&
          page.data.forEach((char) => {
            list.push(char);
          });
      });
    
      let locationList=""

if(list){
    locationList = list.map(location => {
    return<div className={`${(location.residents!==undefined && location.residents.length===0) ? "disabled" : ""}`} key={location.id}>
    <List   name={location.name} property={location.dimension} path={`/location/${location.id}`}></List>
   
</div>;
});
}

let btn=""
if(data[0].pages !== data[data.length - 1].next){
  btn=<CustomButton fetch={fetchMore}/>
}
    return <div onScroll={() => fetchMore()}>
        <div >{locationList }</div>
        {btn}
    </div>     
}


export default Locations;

