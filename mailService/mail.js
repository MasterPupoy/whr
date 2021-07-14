const SMTPServer = require('smtp-server').SMTPServer;
const parser = require('mailparser').simpleParser;

const server = new SMTPServer({
  onData(stream, session, callback){
    parser(stream, {}, (err, parsed) => {
      if(err){
        console.log(err)
      }

      console.log(parsed)
      stream.on('end', callback)
    })
  },
  disabledCommands : ['AUTH']
});

server.on("error", err => {
  console.log(err);
})

server.listen(25, "104.236.215.216", () => {
  console.log('Bound to 104.235.215.216');
});