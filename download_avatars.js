const request = require('request');
const fs = require('fs');
const token = require('./secrets.js'); // github token location

console.log('Welcome to the GitHub Avatar Downloader!');

// gets the contributors list and performs callback
function getRepoContributors (repoOwner, repoName, cb) {
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

// calls the function with inputs from the terminal then parses the result
// then for each user calls the downloadImageByURL function which
// first checks if the avatars folder exists and creates it if it doesn't
// then it requests the avatar and user and downloads the file saving it with
// the user name as the file name.
getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  console.log('Errors:', err);
  const parsedBody = JSON.parse(result);
  parsedBody.forEach(user => downloadImageByURL(user.avatar_url, user.login));
});

function downloadImageByURL (url, filePath) {
  const mkdir = './avatars/';
  if (!fs.existsSync(mkdir)) {
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
    .pipe(fs.createWriteStream(`./avatars/${filePath}.jpeg`));
}
