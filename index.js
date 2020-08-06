require('dotenv').config()
const Instagram = require('instagram-web-api')
const axios = require('axios');
const randomInt = require('random-int');

const { username, password } = process.env
const client = new Instagram({ username, password })

const catFactUrl = "https://cat-fact.herokuapp.com/facts";
const catImageUrl = "https://api.thecatapi.com/v1/images/search";

const getCaption = async () => {
  try {
    const response = await axios.get(catFactUrl);
    const catArray = await response.data.all;
    const num = randomInt(1, 242);
    const caption = catArray[num].text;
    return caption;
  } catch (e) {
    console.error(e);
  }
}

const downloadCat = async () => {
  console.log("Donwloading Cat Image...");
  try {
    const response = await axios.get(catImageUrl);
    return response.data[0].url;
  } catch (e) {
    console.error(e)
  }
}

(async () => {
  const photo = await downloadCat();
  const caption = await getCaption();
  console.log(photo);
  console.log(caption);
  await client.login();
  // Upload Photo
  const { media } = await client.uploadPhoto({ photo, caption:'test instagram bot'})
  console.log(`https://www.instagram.com/p/${media.code}/`)
})();
