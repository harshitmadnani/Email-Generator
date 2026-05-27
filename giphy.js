import fetch from "node-fetch";

export const getRomanticGif = async () => {
  try {
    const queries = [
      "cute love",
      "cute couple",
      "kawaii love",
      "cute"
    ];

    const randomQuery = queries[Math.floor(Math.random() * queries.length)];

    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${randomQuery}&limit=10&rating=g`
    );

    const data = await res.json();

    const gifs = data.data;

    if (!gifs.length) {
      throw new Error("No GIFs found");
    }

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    return randomGif.images.fixed_height.url;
  } catch (err) {
    console.error("GIF error:", err);

    return "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"; // cute fallback
  }
};