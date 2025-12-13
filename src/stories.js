import { insertDB, getDB, saveDB } from "./db.js";

export const newStory = async (story, tags) => {
  const data = {
    tags,
    content: story,
    id: Date.now(),
  };
  await insertDB(data);
  return data;
};

export const getAllstories = async () => {
  const db = await getDB();
  return db.stories;
};

export const listStories = (stories) => {
  if (stories.length === 0) {
    console.log("No stories found");
    return;
  }
  stories.forEach((story) => {
    console.log("\n");
    console.log("Date Created : ", new Date(story.id).toLocaleString());
    console.log("Id : ", story.id);
    console.log("Tags : ", story.tags || [].join(","));
    console.log("Story Content :", story.content);
  });
};

export const findStories = async (id) => {
  const stories = await getAllstories();
  const targetStory = stories.filter((s) => s.id === id);
  if (targetStory.length === 0) {
    return;
  }
  return targetStory;
};

export const deleteStory = async (id) => {
  const stories = await getAllstories();
  const targetStory = stories.filter((s) => s.id === id);
  if (targetStory.length === 0) {
    return;
  }
  console.log("Story Successfully Deleted");
  return await saveDB({ stories: stories.filter((s) => s.id != id) });
};

export const clearAll = async () => {
  const data = await getAllstories();
  if (data.length === 0) {
    console.log("No Stories Found");
    return;
  }
  console.log("All Stories deleted");
  await saveDB({ stories: [] });
};
