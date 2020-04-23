var fs = require('fs');
const path = require('path');
console.log(path.join(__dirname, '../Kintone/nw-garoon-office/dist/customize/cloud/garoon-office-cloud-customize-auth.prod.min.js'))
fs.copyFile(`${path.join(__dirname, '../Kintone/nw-garoon-office/dist/customize/cloud/garoon-office-cloud-customize-auth.prod.min.js')}`, `${path.join(__dirname, '../Kintone/nw-garoon-office/dist/customize/cloud/garoon-office-auth-customize.js')}`, function(err) {
  if ( err ) console.log('ERROR: ' + err);
  console.log("done")
});
fs.copyFile(`${path.join(__dirname, '../Kintone/nw-garoon-office/dist/customize/cloud/garoon-office-cloud-customize-setting.prod.min.js')}`, `${path.join(__dirname, '../Kintone/nw-garoon-office/dist/customize/cloud/garoon-office-setting-customize.js')}`, function(err) {
  if ( err ) console.log('ERROR: ' + err);
  console.log("done")
});
fs.copyFile(`${path.join(__dirname, '../Kintone/nw-garoon-google/dist/customize/cloud/garoon-google-cloud-customize-auth.dev.min.js')}`, `${path.join(__dirname, '../Kintone/nw-garoon-google/dist/customize/cloud/garoon-google-auth-customize.js')}`, function(err) {
  if ( err ) console.log('ERROR: ' + err);
  console.log("done")
});
fs.copyFile(`${path.join(__dirname, '../Kintone/nw-garoon-google/dist/customize/cloud/garoon-google-cloud-customize-setting.dev.min.js')}`, `${path.join(__dirname, '../Kintone/nw-garoon-google/dist/customize/cloud/garoon-google-setting-customize.js')}`, function(err) {
  if ( err ) console.log('ERROR: ' + err);
  console.log("done")
});






