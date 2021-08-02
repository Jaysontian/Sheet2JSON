
// ********************** Sheet2JSON **********************
// License MIT
//
// By Jayson Tian 
// https://jaysontian.com

function sheet2JSON(id){
    var newdata = [];
    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var returned = JSON.parse(request.responseText);
        var data = returned.feed.entry;
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
        return newdata;

      } else {
        console.log('Reached server but failed to fetch data')
      }
    };
    request.onerror = function() {
      console.log('There was an error fetching the file')
    };
    request.send();
}




/*
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
*/

