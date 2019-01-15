const request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  request(url, function(err, res, body) {
    cb(err, body);
    });
}

// request.get('https://sytantris.github.io/http-examples/future.jpg')
//        .on('error', function (err) {
//          throw err;
//        })
//        .on('response', function (response) {
//          console.log('Response Status Code: ', response.statusCode);
//          console.log('Response Status Message: ', response.statusMessage);
//          console.log('Content Type: ', response.headers['content-type']);
//        })
//        .pipe(fs.createWriteStream('./future.jpg'));

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
