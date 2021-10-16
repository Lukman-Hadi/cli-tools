const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

function moveAndConvert(dir, options, command){
    let data;
    let format;
    if(options.type==='json'){
        data = convert(dir);
        format = 'json';
        console.log(chalk.bold.green('converted to json !'))
    }else{
        data = fs.readFileSync(dir, 'utf8');
        format = 'txt'
    }
    if(options.output){
        let output = options.output;
        fs.appendFile(output, data, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }else{
        fs.appendFile(`error.${format}`, data, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }
    console.log(chalk.bold.green('Success Copying File'))
}
function convert(dir) {
    var text = fs.readFileSync(dir, 'utf8')
    array = text.split("\n")
    var dataArray = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] == '') { continue }
        let tempArray = []
        tempArray = array[i].split(",");
        dataArray.push(tempArray)
    };

    json = {};
    var c = 1;
    dataArray.forEach((e1) => {
        isdate = true;
        var tempjson = {};
        e1.forEach((e2) => {
            var key;
            if (isdate) {
                key = 'date';
                tempjson[key] = e2;
                isdate = false;
            }
            else if (e2.includes("batteryCurrent")) {
                key = "batteryCurrent";
                tempjson[key] = e2.split("batteryCurrent=")[1]
            }
            else {
                var arr = e2.split("=");
                key = arr[0].trim();
                tempjson[key] = arr[1];
            }
        })
        json[c] = tempjson;
        c++
    });
    let data = JSON.stringify(json);
    return data;
}
module.exports = moveAndConvert;