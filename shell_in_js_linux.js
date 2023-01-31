

const readline = require('readline');
const { exec } = require('child_process');
//promise 
const { promisify } = require("util");
const execP = promisify(exec);

async function command_execution(command) {
  try {
    const { stdout } = await execP(command);
    return stdout;
  } catch (error) {
    console.error(`exec error: ${error}`);
    return;
  }
}

async function main() {
  const readline = require("readline");
  const read_line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const command = await new Promise((resolve) => {
      read_line.question("> ", resolve);
    });

    const pieces = command.split(" ");
    const option = pieces[0];

    switch (option) {
      case "/":
      case ".":
        console.log(await command_execution(command));
        break;
      case "lp":
        console.log(await command_execution("tasklist"));
        break;
      case "bing":
        if (pieces.length !== 3) {
          console.log(
            'This format is not accepted. Please, tap instead bing "-kill","-pause","-continue" <processId>'
          );
          return;
        }

        const bing_opt = pieces[1];
        const process_ID = pieces[2];

        switch (bing_opt) {
          case "-kill":
            console.log(await command_execution(`kill ${process_ID}`));
            break;
          case "-pause":
            console.log(await command_execution(`kill -STOP ${process_ID}`));
            break;
          case "-continue":
            console.log(await command_execution(`kill -CONT ${process_ID}`));
            break;
          default:
            console.log('Not a valid option. Please, tap instead "-kill","-pause","-continue"');
        }
        break;
      case "!":
        console.log(await command_execution(`${command} &`));
        break;
      case "CTRL-P":
        console.log("Shell Exit. Program Terminated.");
        process.exit(0);
        break;
    }
  }
}

main();


