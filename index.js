fs = require("fs");

exports.migrate = function(req, res){
  var csv = require('csv');

  csv()
    .from.stream(
      fs.createReadStream('iran.csv'), {
      columns: ['Topic','Location','Tags']
    })
    .to.path('parsed.csv')
//    .transform( function(data){
//       data.unshift(data.pop());
//       return data;
//    })
    .on('record', function(data,index){
      console.log('#'+index+' '+JSON.stringify(data));
    })
    .on('end', function(count){
      console.log('Number of lines: '+count);
    })
    .on('error', function(error){
      console.log(error.message);
    });

  res.render('index', {
      title: 'The MigratOr'
  });
};
