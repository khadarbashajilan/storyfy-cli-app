import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { deleteStory, findStories, getAllstories, listStories, newStory } from "./stories.js";

yargs(hideBin(process.argv))
  .command(
    "new <story>",
    "create a new story",
    (yargs) => {
      return yargs.positional("story", {
        description: "The content of the story you want to wrrite",
        type: "string",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const story = await newStory(argv.story, tags);
      console.log("Story added Successfully : \n", story);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "Tags to add to your story",
  })
  .command(
    "all",
    "get all stories",
    () => {},
    async (argv) => {
      const stories = await getAllstories();
      listStories(stories)
    }
  )
  .command(
    "find <id>",
    "find a story",
    (yargs)=>{
        return yargs.positional('id',{
            describe:"Id to find a story",
            type: "number"
        })
    },
    async(argv) => {
        const targetStory = await findStories(argv.id);
        if(!targetStory){
            console.log("Invalid Id")
            return
        }
        listStories(targetStory)
    }
  )
  .command(
    "delete <id>",
    "delete a story",
    (yargs)=>{
        return yargs.positional('id',{
            describe : "Id to delete a story",
            type :"number"
        })
    },
    async(argv)=> {
        const targetStory = await deleteStory(argv.id);
        if(!targetStory){
            console.log("Invalid Id")
            return
        }
    }
  )
  .demandCommand(1)
  .parse();
