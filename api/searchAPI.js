const searchAPI = (keyWord) => (
  fetch('http://192.168.1.239/app-server/search.php?key=' + keyWord).then(res => 
    res.json())
);
export default searchAPI;