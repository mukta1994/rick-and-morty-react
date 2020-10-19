import React, {  } from 'react';
import List from "../General/List";
import { getAllEpisodes } from '../../Apis/Api';
 import { useInfiniteQuery } from 'react-query';
 import CustomButton from "../../Components/General/CustomButton";


//  const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #9f9ada 30%, #51668c 90%);',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(117, 93, 175, .3)',
//     color: 'white',
//     height: 38,
//     padding: '0 20px',
//     margin:'0 0 30px 0'
//   },
// });


const Episodes=()  => {   
  //const classes = useStyles();
     
    const { status, data, fetchMore } = useInfiniteQuery(
        'episodes',
        getAllEpisodes,
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
    
      let episodeList=""     

if(list){
 episodeList = list.map(episode => {
    // return <CharacterItem key={character.id} data={character} />
    return<div className={`${(episode.characters!==undefined && episode.characters.length===0) ? "disabled" : ""}`}  key={episode.id}>
          <List name={episode.name} property={episode.air_date} path={`/episode/${episode.id}`} ></List>

       
   
</div>;
});
}
let btn=""
if(data[0].pages !== data[data.length - 1].next){
  btn=<CustomButton fetch={fetchMore}/>
}
    return <div onScroll={() => fetchMore()}>
        <div >{episodeList }</div>
        {btn}
    </div>     
}


export default Episodes;