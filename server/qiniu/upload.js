/**
 *
 * @author: 李梁
 * @date: 2019/4/29  12:49
 */
const qiniu = require('qiniu');
const fs = require('fs');
const path = require('path');

const adnConfig = require('../config/index').qiniu;

const {AK, SK, bucket} = adnConfig;
const mac = new qiniu.auth.digest.Mac(AK, SK);

const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;

const doUpload = (key, file) => {
    const option = {
        scope: bucket + ':' + key
    };
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    const putPolicy = new qiniu.rs.PutPolicy(option);
    const uploadToken = putPolicy.uploadToken(mac);
    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
            if (err) {
                return reject(err)
            }
            if (info.statusCode === 200) {
                resolve(body)
            } else {
                reject(body)
            }
        })
    })
};

// const publicPath = path.join(__dirname, '../public');
/**
 * 遍历上传文件夹写的所有文件
 */
// const uploadAll = (dir, prefix) => {
//     const files = fs.readdirSync(dir);
//     files.forEach(file => {
//         const filePath = path.join(dir, file);
//         if (fs.lstatSync(filePath).isDirectory()) {
//             return uploadAll(filePath);
//
//         }
//         doUpload(file, filePath)
//             .then(res => console.log(res))
//             .catch(err => console.log(err))
//     })
// };

// 上传一张图片
doUpload('lancePng', path.join(__dirname, '../../lance.png'))
    .then(res => console.log(res))
    .catch(err => console.log(err));
