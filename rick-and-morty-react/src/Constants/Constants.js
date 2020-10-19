export const extractIds = (items) =>
  items.map((item) => item.split('/')[5]).join(',');

  export const extractLocationId = (items) =>
  items.split('/')[5];

  export const extractIdsFromArr = (items) =>
  items.map((item) => (item.residents.map((res) => res.split('/')[5]).join(','))).join(',');