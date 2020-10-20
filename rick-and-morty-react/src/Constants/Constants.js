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