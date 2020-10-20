import React, { } from 'react';
import List from "../General/List";
//import "./Locations.scss";
// import { makeStyles } from '@material-ui/core/styles';
import { getAllLocations } from '../../Apis/Api';
import { useInfiniteQuery } from 'react-query';
import CustomButton from "../../Components/General/CustomButton";


const Dimensions = () => {
  

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
                list.push(char.dimension);
            });
    });
    const dimenList = list.filter(function (elem, pos) {
        return list.indexOf(elem) === pos;
    });

  
    let locationList = ""

    if (list) {
        locationList = dimenList.map((dimension,i) => {
            // return <CharacterItem key={character.id} data={character} />
            return <div key={i}>
                    <List name={dimension} property="" path={`/dimension/${dimension}`}></List>
            </div>;
        });
    }
    let btn=""
if((data[0].pages >= (data[data.length - 1].nextPage - 1)) && data[data.length - 1].nextPage !== null){
  btn=<CustomButton fetch={fetchMore}/>
}
    return <div>
        <div className="title">Dimensions</div>
        <div >{locationList}</div>
        {btn}
    </div>
}


export default Dimensions;

