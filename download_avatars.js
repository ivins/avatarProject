const request = require('request');
const token = require('./secrets.js');
const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
    });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  const parsedBody = JSON.parse(result);
  parsedBody.forEach(user => {
    downloadImageByURL(user.avatar_url, user.login);
  });
});


function downloadImageByURL(url, filePath) {
  const mkdir = './avatars/';
  if (!fs.existsSync(mkdir)){
    fs.mkdirSync(mkdir);
  }
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response Status Message: ', response.statusMessage);
         console.log('Content Type: ', response.headers['content-type']);
       })
       .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpeg'));
}
