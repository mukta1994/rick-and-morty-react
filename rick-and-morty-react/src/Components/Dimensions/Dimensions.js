import React, { } from 'react';
import List from "../General/List";
import { getAllData } from '../../Apis/Api';
import { useInfiniteQuery } from 'react-query';
import CustomButton from "../../Components/General/CustomButton";
import AutoCompleteGenaral from "../General/AutoCompleteGenaral";
import { getdistinctDatabyusingProperty } from '../../Constants/Constants';


const Dimensions = (props) => {
    const { status, data, fetchMore } = useInfiniteQuery(
        ['dimensions', 'location'],
        getAllData,
        {
            getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage,
        });

    if (status === 'loading') {
        return (<p>loading</p>);
    }

    const list = [];
    data.forEach((page) => {
        page.data &&
            page.data.forEach((char) => {
                list.push(char);
            });
    });
    const dimenList = getdistinctDatabyusingProperty(list);

    let locationList = ""
    if (list) {
        locationList = dimenList.map((dimension, i) => {
            return <div key={i}>
                <List name={dimension.dimension} property="" path={`/dimension/${dimension.dimension}`}></List>
            </div>;
        });
    }
    let btn = ""
    if (data && (data[0].pages >= (data[data.length - 1].nextPage - 1)) && data[data.length - 1].nextPage !== null) {
        btn = <CustomButton fetch={fetchMore} />
    }
    return <div>
        <div className="title">Dimensions</div>
        <div className="sort-options">
            <AutoCompleteGenaral pathname="dimension"></AutoCompleteGenaral>
        </div>
        <div >{locationList}</div>
        {btn}
    </div>
}


export default Dimensions;

