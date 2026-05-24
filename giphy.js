import fetch from "node-fetch";

export const getRomanticGif = async () => {
  try {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=romantic+love+couple&limit=10`
    );

    const data = await res.json();

    const gifs = data.data;
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    return randomGif.images.fixed_height.url;
  } catch (err) {
    console.error("GIF error:", err);

    return "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif";
  }
};