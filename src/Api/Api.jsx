const fetchImagesQuery = async (query, page) => {
  const res = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=22469434-62330606312f34e078b383df4&image_type=photo&orientation=horizontal&per_page=12`,
  );
  const {hits} = await res.json();
  return hits;
};
export default fetchImagesQuery;
