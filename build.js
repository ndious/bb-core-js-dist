var fs = require('fs-extra'),
    errorPrint = function (err, message) {
        console.log(message);
        console.error(err);
    };

fs.mkdirs('css', function (err) {
    if (err) {
        errorPrint(err, 'CSS dir not created');
    } else {
        console.log('Strat importing css');

        fs.copy('html/css', 'css/', function (err) {
            if (err) {
                errorPrint(err, 'Vendor dir not update from bower_components');
            }
        });
    }
});

fs.mkdirs('vendor', function (err) {
    if (err) {
        errorPrint(err, 'Vendor dir not created');
    } else {
        console.log('Strat importing vendors');

        fs.copy('bower_components/', 'vendor/', function (err) {
            if (err) {
                errorPrint(err, 'Vendor dir not update from bower_components');
            }
        });

        fs.copy('node_modules/jsclass', 'vendor/jsclass', function (err) {
            if (err) {
                errorPrint(err, 'Vendor dir not update from node_modules');
            }
        });
    }
});

fs.mkdirs('_layouts', function (err) {
    fs.writeFile('_layouts/base.html.haml', 'last dist', function (err) {
        if (err) {
            errorPrint(err, 'Fake haml not created');
        }
    });
})

