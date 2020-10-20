export const getLocation = async (id) => {
  const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`)
  const data = await response.json();
  return data;
}

export const getCharacters = async (ids) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${ids}`)
  const data = await response.json();
  return data;
}


export const getEpisode = async (id) => {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
  const data = await response.json();
  return data;
}

export const getCharacterinfo = async (name) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
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

export const getLocationinfo = async (dimension) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/location/?dimension=${dimension}`)
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


export const getAllCharacters = async (key, nextPage = 1) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${nextPage}`);
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

export const getAllEpisodes = async (key, nextPage = 1) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/?page=${nextPage}`);
    const { results, info } = await res.json();
    return {
      data: results,
      nextPage: info.next ? nextPage + 1 : null,
      pages: info.pages,
      next: nextPage
    };
  } catch (err) {
    console.error(`Something went wrong fetching the now playing data: ${err}`);
    throw err;
  }
};

export const getAllLocations = async (key, nextPage = 1) => {
  const res = await fetch(`https://rickandmortyapi.com/api/location/?page=${nextPage}`);
  const { results, info } = await res.json();
  return {
    data: results,
    nextPage: info.next ? nextPage + 1 : null,
    pages: info.pages
  };
};

