#!/usr/bin/env node
// Ex :
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
// yargs(hideBin(process.argv))
// .scriptName("storyfy")
// .command(
//     "curl <url>",
//     "fetch the contents of the URL",
//     () => {},
//         (argv)=>{
//             console.info(argv)
//         }
// )
// .demandCommand(1)
// .parse();

import "./src/command.js"