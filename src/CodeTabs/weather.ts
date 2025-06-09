import { Message } from "whatsapp-web.js";

//,t <place> :: I guess that's all :: maybe add a image thingy? :: -i :: this is not the weather but rather just the temp 

export default async function getWeather(message: Message) {
  const place: string = message.body.split(" ")[1]

  if (place == undefined) {
    return await message.react("❌") //You know the drill
  }

  let URL: string = "https://api.codetabs.com/v1/weather" + "?city=" + place.trim() //triming here because trimming an empty string will case typerror
  
  let response = await fetch(URL)
  let responseJson = await response.json()

  if (parseInt(responseJson.tempF) + parseInt(responseJson.tempC) + parseInt(responseJson.latitude) + parseInt(responseJson.longitude) == 0 && responseJson.country.length == 0) {
    return await message.react("❌") //Emoji asd
  }

  const text: string = `\`\`\`Current temperature in ${responseJson.city}\n\nCelcius : ${responseJson.tempC}\n\nFahrenheit : ${responseJson.tempF}\n\nCountry : 
  ${responseJson.country}\n\nlatitude : ${responseJson.latitude}\n\nlongitude : ${responseJson.longitude}\`\`\``

  return await message.reply(text)
}
