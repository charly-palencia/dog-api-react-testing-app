//stoled from arbol app

const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
};

const HOST = 'https://dog.ceo/api/';

const fetcher = async (url) => {
  const res = await fetch(HOST + url, {
    headers: { },
  });

  return res.json();
};

export default fetcher;
