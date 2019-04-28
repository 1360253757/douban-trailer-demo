/**
 *
 * @author: 李梁
 * @date: 2019/4/28  20:23
 */
const puppeteer = require('puppeteer');

const url = 'https://movie.douban.com/subject/26100958/?from=showing';
const doubanID = '26100958';
// const videoBase = 'https://movie.douban.com/trailer/244458';

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
});

(async () => {
    console.log('Start visit the target pages');

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    });

    const page = await browser.newPage();
    await page.goto(url , {
        waitUntil: 'networkidle2'
    });

    await sleep(1000);


    const result = await page.evaluate(() => {
        let $ = window.$;
        let it = $('.related-pic-video');
        if (it && it.length > 0) {
            let link = it.attr('href');
            let cover = it.css('background-image').split("(")[1].split(")")[0].split('"').join("");
            return {
                link,
                cover
            }
        }
        return {};

    });

    let video;
    if (result.link) {
        await page.goto(result.link, {
            waitUntil: 'networkidle2'
        });

        await sleep(1000);

        video = await page.evaluate(() => {
            let $ = window.$;
            let it = $('source');
            if (it && it.length > 0) {
                return it.attr('src')
            }
            return ''
        })

    }

    const data = {
        video,
        doubanID,
        cover: result.cover
    };

    browser.close();
    console.log(data);

    process.send(data);
    process.exit(0)

})();
