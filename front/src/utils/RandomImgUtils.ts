
class RandomImgUtils {
    static randomVideoAPI(type: "jk" | "ecy") {
        if (type === 'jk') {
            return `http://sucyan.cfd/api/tupian/jk.php?tm=${Math.random()}`;
        }
        if (type === 'ecy') {
            return `https://api.yimian.xyz/img?type=wallpaper/${Math.random()}`;
        }
    }
}

export default RandomImgUtils;