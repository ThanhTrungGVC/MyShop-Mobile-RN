const initData = () => (
    fetch('http://192.168.1.239/app-server/')
        .then(res => res.json())
);
export default initData;