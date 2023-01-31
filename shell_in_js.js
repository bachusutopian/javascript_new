

const readline = require('readline');
const { exec } = require('child_process');

const read_line = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//The infinite loop
while (true) {
  read_line.question('> ', (command) => 
  {
    const pieces = command.split(' ');
    const option = pieces[0];
    switch (option) 
    {
      case '/':
      case '.':
        // We are checking if it's the right command
        exec(command, (err, stdout, stderr) => 
        {
          if (err) 
          {
            console.error(`exec error: ${err}`);
            return;
          }
          console.log(stdout);
        });
        break;
      case 'lp':
        // Listing all the processes
        exec('ps', (err, stdout, stderr) =>
         {
          if (err) 
          {
            console.error(`exec error: ${err}`);
            return;
          }
          console.log(stdout);
        });
        break;
      case 'bing':
        if (pieces.length !== 3) 
        {
          console.log('This format is not accepted. Please, tap instead bing "-kill","-pause","-continue" <processId>');
          return;
        }
        const bing_opt = pieces[1];
        const process_ID = pieces[2];
        // The 3 options we can apply on a process : kill, pause, continue 
        switch (bing_opt) 
        {
          case "-kill":
            exec(`kill ${process_ID}`, (err, stdout, stderr) => {
              if (err) {
                console.error(`exec error: ${err}`);
                return;
              }
              console.log(stdout);
            });
            break;
          case "-pause":
            exec(`kill -STOP ${process_ID}`, (err, stdout, stderr) => 
            {
              if (err) {
                console.error(`exec error: ${err}`);
                return;
              }
              console.log(stdout);
            });
            break;
          case "-continue":
            exec(`kill -CONT ${process_ID}`, (err, stdout, stderr) => 
            {
              if (err) {
                console.error(`exec error: ${err}`);
                return;
              }
              console.log(stdout);
            });
            break;
          default:
            console.log('Not a valid option. Please, tap instead "-kill","-pause","-continue"');
        }
        break;
        //running the background command
      case "!":
          exec(`${command} &`, (err, stdout, stderr) => {
            if (err) {
              console.error(`exec error: ${err}`);
              return;
            }
            console.log(stdout);
          });
          break;
          //exiting the shell 
      case "CTRL-P":
          console.log('Shell Exit. Program Terminated.');
          process.exit(0);
          break;
      }
    });
}