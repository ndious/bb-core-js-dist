var fs = require('fs-extra'),

    exec = require('child_process').execSync,

    errorPrint = function (err, message) {
        console.log(message);
        console.error(err);
    },

    gitPublish = function () {
        var deployUrl = 'https://' + process.env.GIT_TOKEN + '@github.com/ndufreche/bb-core-js-dist.git';
        var deployBranch = 'master';

        require('child_process').exec('git rev-parse HEAD', function (error, rev) {
            if (process.env.GIT_NAME) {
                exec('git config user.name ' + process.env.GIT_NAME);
            }
            if (process.env.GIT_EMAIL) {
                exec('git config user.email ' + process.env.GIT_EMAIL);
            }
            exec('git add --all');
            exec('git commit -m "Built from ' + rev + '"');
            exec('git remote add dist ' + deployUrl)
            exec('git push -q dist ' + deployBranch);
        });
    };

if (parseInt(process.env.TRAVIS_PULL_REQUEST, 10) > 0) {
    process.exit(0);
}

console.log('Stating create dist build.');

fs.mkdirs('dist', function (err) {
     if (err) {
        errorPrint(err, 'CSS dir not created');
    } else {
        fs.mkdirs('dist/css', function (err) {
            if (err) {
                errorPrint(err, 'CSS dir not created');
            } else {
                console.log('Strat importing css');

                fs.copy('html/css', 'dist/css/', function (err) {
                    if (err) {
                        errorPrint(err, 'Vendor dir not update from bower_components');
                    }
                });
            }
        });

        fs.mkdirs('dist/vendor', function (err) {
            if (err) {
                errorPrint(err, 'Vendor dir not created');
            } else {
                console.log('Strat importing vendors');

                fs.copy('node_modules/jsclass', 'dist/vendor/jsclass', function (err) {
                    if (err) {
                        errorPrint(err, 'Vendor dir not update from node_modules');
                    }
                });

                fs.copy('bower_components/', 'dist/vendor/', function (err) {
                    if (err) {
                        errorPrint(err, 'Vendor dir not update from bower_components');
                    }
                    gitPublish();
                });
            }
        });
    }
})

