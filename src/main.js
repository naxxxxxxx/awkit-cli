import program from "commander";
import chalk from "chalk";
import apply from "./index";
import { VERSION } from "./utils/constants";

/**
 * awkit commands
 * - init
 * - config
 */
let actionMap = {
  init: {
    description: "generate a new project from a template",
    usages: ["awkit int templateName projectName"],
  },
  config: {
    alias: "cfg",
    description: "config .awkitrc",
    usages: [
      "awkit config set <k> <v>",
      "awkit config get <k>",
      "awkit config remove <k>",
    ],
  },
};

/**
 * 添加 init/config命令
 */
Object.keys(actionMap).forEach((action) => {
  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        case "init":
          apply(action, ...process.argv.slice(3));
          break;
        case "config":
          apply(action, ...process.argv.slice(3));
          break;
        default:
          break;
      }
    });
});

/**
 * help 命令
 */
function help() {
  console.log("\r\nUsage:");
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].usages.forEach((usage) => {
      console.log(" - " + usage);
    });
  });
}

program.usage("<command> [options]");
// awkit -h
program.on("-h", help);
program.on("-help", help);

// awkit -V / awkit -VERSION 返回package.json中的版本号
program.version(VERSION, "-V --version").parse(process.argv);

/**
 * awkit 不带参数
 */
if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}
function make_green(txt) {
  return chalk.green(txt);
}
