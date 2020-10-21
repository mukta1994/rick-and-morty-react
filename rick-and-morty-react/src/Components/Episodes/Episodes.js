import React, { useEffect, useState } from 'react';
import List from "../General/List";
import { getAllData } from '../../Apis/Api';
import { useInfiniteQuery } from 'react-query';
import AutoCompleteGenaral from "../General/AutoCompleteGenaral";
import { getlistdata } from '../../Constants/Constants';

const Episodes = () => {
  const [episodeArray, setEpisodeArray] = useState([]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  const { status, data, fetchMore } = useInfiniteQuery(
    ['episodes', 'episode'],
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
    if (data && (data[0].pages >= (data[data.length - 1].nextPage - 1)) && data[data.length - 1].nextPage !== null) {
      fetchMore();
      setEpisodeArray(list);
    }
  }

  let episodeList = ""

  if (list) {
    if (episodeArray.length === 0) {
      setEpisodeArray(list);
    }
    episodeList = episodeArray.map(episode => {
      return <div className={`${(episode.characters !== undefined && episode.characters.length === 0) ? "disabled" : ""}`} key={episode.id}>
        <List name={episode.name} property={episode.air_date} path={`/episode/${episode.id}`} ></List>
      </div>;
    });
  }

  return <div onScroll={() => fetchMore()}>
    <div className="title">Episodes</div>
    <div className="sort-options">
    <AutoCompleteGenaral pathname="episode"></AutoCompleteGenaral>
    </div>
    <div >{episodeList}</div>
  </div>
}


export default Episodes;