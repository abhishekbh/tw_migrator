fs = require("fs");

exports.migrate = function(req, res){
  var csv = require('csv');
  tags = ['hello'];

  function doCSV(tags) {
    console.log();
    csv(tags)
      .from.stream(
        fs.createReadStream('iran.csv')
        //,{columns: ['Tags']}
      )
      .to.path(
        'tags.out.csv'
        ,{columns: ['Tags']}
      )
      .on('record', function(data, index){
        //console.log('#'+index+' '+JSON.stringify(data));
        tags.push(JSON.stringify(data));
        console.log(tags.length);
      })
      //.on('end', function(count){
        //console.log('Number of lines: '+count);
      //})
      .on('error', function(error){
        console.log(error.message);
      });
  }

  res.render('index', {
      title: 'The MigratOr'
      , tags: doCSV(tags)
  });
};
