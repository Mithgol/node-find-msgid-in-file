var fs = require('fs');

module.exports = (filePath, callback) => fs.readFile(
   filePath,
   { encoding: 'binary' },
   (err, message) => {
      if( err ) return callback(err);

      var lineMSGID = message.split(
         /(?:\r|\n)/
      ).find( msgLine => msgLine.startsWith('\x01MSGID:') );
      if( typeof lineMSGID === 'undefined') return callback(null, null);

      lineMSGID = lineMSGID.slice( '\x01MSGID:'.length ).replace(/^\s*/g, '');
      if( lineMSGID.length < 1 ) return callback(null, null);

      return callback(null, lineMSGID);
   }
);