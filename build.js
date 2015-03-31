var fs = require('fs-extra');
var sys = require('sys')
var exec = require('child_process').exec;

var errorPrint = function (err, message) {
    console.log(message);
    console.error(err);
}
var puts = function (error, stdout, stderr) { sys.puts(stdout) }

exec('npm install', function (error, stdout, stderr) {
    puts(error, stdout, stderr);

    exec('bower install', function (error, stdout, stderr) {
        puts(error, stdout, stderr);

        exec('grunt test', function (error, stdout, stderr) {
            puts(error, stdout, stderr);

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

                    fs.copy('bower_components/', 'dist/vendor/', function (err) {
                        if (err) {
                            errorPrint(err, 'Vendor dir not update from bower_components');
                        }
                    });

                    fs.copy('node_modules/jsclass', 'dist/vendor/jsclass', function (err) {
                        if (err) {
                            errorPrint(err, 'Vendor dir not update from node_modules');
                        }
                    });
                }
            });
        })
    });
});

