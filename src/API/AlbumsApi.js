import asyncData from "../assets/data";

const getAsyncAlbumListCallback = async () => {
  // Can be some logic ...
  return await new Promise((resolve) => {
    return setTimeout(() => {
      return resolve(asyncData);
    }, 300);
  });
};

export { getAsyncAlbumListCallback };
