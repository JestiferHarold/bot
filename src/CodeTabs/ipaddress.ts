import { Message } from "whatsapp-web.js";

export default async function getGeolocation(message: Message) {
  let URL: string = "https://api.codetabs.com/v1/geolocation/json";

  if (message.body.split(" ").length == 1) {
    return await message.reply("");
  }

  if (!message.body.toLowerCase().split(" ").includes("--this")) {
    URL += "?q=" + message.body.split(" ")[1];
  }

  const response = await fetch(URL);
  const responseJson = await response.json()

  if (responseJson.Error) {
    return await message.reply("Error :" + responseJson.Error.split(".")[0])
  }

  const text: string = `\`\`\`Ip Address: ${responseJson.ip}\n\n
  Country: ${responseJson.country_name}\n\n
  Country Code: ${responseJson.country_code}\n\n
  Region: ${responseJson.region_name}\n\n
  City: ${responseJson.city}\n\n
  Zip Code: ${responseJson.zip_code}\n\nb
  Time Zone: ${responseJson.time_zone}\n\n
  Latitude: ${(responseJson.latitude == 0 || responseJson.latitude == undefined ? "Data Unavaiable" : responseJson.latitude)}\n\n
  Longitude: ${(responseJson.longitude == 0 || responseJson.longitude == undefined ? "Data Unavaible" : responseJson.longitude)}\`\`\``

  return await message.reply(text)
}
