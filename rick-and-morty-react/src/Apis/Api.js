import {BASE_URL } from '../Constants/Constants';

//get single or list of character, locations, episodes based on pathname 
export const getSingleOrmultipleData = async (pathname,id) => {
  const response = await fetch(BASE_URL+pathname+`/${id}`)
  const data = await response.json();
  return data;
}


//fetch filtered data of location list, or episode or character list
export const getInfobyName = async (pathname,name) => {
  try {
    const response = await fetch(BASE_URL+pathname+`/?name=${name}`)
    const res = await response.json()

    if (response.ok) {
      return res.results;
    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.log(error, "error")
    return []
  }
}

//get locations for dimension
export const getLocationsinfo = async (dimension) => {
  try {
    const response = await fetch(BASE_URL+`location/?dimension=${dimension}`)
    const data = await response.json();
    if (response.ok) {
      return data.results;
    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.log(error, "error")
    return []
  }
}

export const getAllData = async (key,pathname, nextPage = 1) => {
  try {
    const res = await fetch(BASE_URL+pathname+`/?page=${nextPage}`);
    const { results, info } = await res.json();
    return {
      data: results,
      nextPage: info.next ? nextPage + 1 : null,
      pages: info.pages
    };
  } catch (err) {
    console.error(`Something went wrong fetching the now playing data: ${err}`);
    throw err;
  }
};


