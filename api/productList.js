const productList = (idType, page) => {
  let url;
  if (idType !== 'COLLECTION') {
    url = 'http://192.168.1.239/app-server/product_by_type.php?id_type=' + idType + '&page=' + page;
  }
  if (idType === 'COLLECTION') {
    url = 'http://192.168.1.239/app-server/get_collection.php?page=' + page;
  }
  return fetch(url).then(res => res.json());
};
export default productList;
