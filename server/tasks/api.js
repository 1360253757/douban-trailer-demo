/**
 *
 * @author: 李梁
 * @date: 2019/4/27  20:08
 */
const rp = require('request-promise-native');

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/${item.doubanId}`;
    return await rp(url)
}

(async () => {
    let movies = [{
        doubanId: 1432146,
        title: '钢铁侠',
        rate: 8.1,
        poster:
            'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p725871004.jpg'
    },
        {
            doubanId: 3793023,
            title: '三傻大闹宝莱坞',
            rate: 9.2,
            poster:
                'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p579729551.jpg'
        }];
    movies.map(async movie => {
        let movieData = await fetchMovie(movie);
        let data = JSON.parse(movieData);
        console.log(data.author);
        console.log(data.summary);
    })

})();
