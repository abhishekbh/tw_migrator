fs = require("fs");

exports.migrate = function(req, res){
  var csv = require('csv');
  var local_tags = new tags('fake');
  var status = false;

  function tags (tag) {
    var tags = [];
    tags.push(tag);
 
    this.getValue = function(){
        return tags;
    };
 
    this.setValue = function(tag){
        tags.push(tag);
    };
  }

  function doCSV(callback) {
    csv()
      .from.stream(
        fs.createReadStream('iran.csv')
        ,{columns: ['Tags']}
      )
      .to.path(
        'tags.out.csv'
        ,{columns: ['Tags']}
      )
      .on('record', function(data, index){
        local_tags.setValue(JSON.stringify(data));
        console.log(JSON.stringify(data));
      })
      .on('error', function(error){
        console.log(error.message);
      });
      console.log('1');
      callback();
      console.log('3');
      console.log(local_tags.getValue());
      return local_tags.getValue();
  }

  res.render('index', {
      title: 'The MigratOr'
      , tags: doCSV(function(){
                status = true;
                console.log('2');
              })
      , status: status
  });
};
