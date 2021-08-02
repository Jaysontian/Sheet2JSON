/*
Sheet2JSON
License MIT

by Jayson Tian https://jaysontian.com
*/

function sheet2JSON(id){
    var newdata = [];
    $.getJSON('https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json', function(returned) {
        data = returned.feed.entry;

        data.forEach(tag => {
            var newrow = {};

            for (var key of Object.keys(tag)) {
                if ((key.toString()).includes('gsx')){
                    var keyname = (key.toString()).substring(4);
                    //console.log(keyname + ' -> ' + tag[key]['$t']);
                    newrow[keyname] = tag[key]['$t'];
                }
            }
            newdata.push(newrow);
        });
    });
    return newdata;
}


