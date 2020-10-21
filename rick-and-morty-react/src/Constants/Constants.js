export const BASE_URL = `https://rickandmortyapi.com/api/`;

export const extractIds = (items) =>
  items.map((item) => item.split('/')[5]).join(',');

  export const extractLocationId = (items) =>
  items.split('/')[5];

  export const extractIdsFromArr = (items) =>
  items.map((item) => (item.residents.map((res) => res.split('/')[5]).join(','))).join(',');

  export const filterOptions=[{name: 'name(asc)', val: 'name-asc' },{name: 'name(desc)', val: 'name-desc' },{name: 'status', val: 'status' }]

  export const filtereddata=(val,items)=>{
  switch (val) {
  
    case 'name-asc': {
      return (items.sort((a, b) => { return a.name.localeCompare(b.name) }));
    }

    case 'name-desc': {
      return (items.sort((a, b) => { return a.name.localeCompare(b.name) })).reverse();
    }
    case 'status': {
      return (items.sort((a, b) => { return a.status.localeCompare(b.status) }));
    }

    default: {
      return items;
    }
  }
}

export const getlistdata=(data)=>{
  let list=[]
  data.forEach((page) => {
    page.data &&
      page.data.forEach((char) => {
        list.push(char);
      });
  });
  return list;
}

export const getdistinctDatabyusingProperty=(list)=>{
  return  list.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj.dimension).indexOf(obj.dimension) === pos;
    })
}

export const searchdatabyname=(list,value)=>{
  return list.filter(item => {
    const lc = item.name.toLowerCase();
    const filter = value.toLowerCase();
    return lc.includes(filter);
  });
}