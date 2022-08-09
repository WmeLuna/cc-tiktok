let tiktok;
export function onLoad() {

  async function tiktokEmbed(a) {
    if (a.message.embeds[0] && a.message.embeds[0].provider && a.message.embeds[0].provider.name === "TikTok") {
      //console.log(a.message.embeds[0])
      a.message.embeds[0].provider.name = "TikTok Embed"
      a.message.embeds[0].type = "video"
      a.message.embeds[0].author = {"name": String(a.message.embeds[0].rawTitle).replace(' on TikTok','')}
      a.message.embeds[0].rawTitle = undefined
      if (a.message.embeds[0].image) {
          a.message.embeds[0].thumbnail = a.message.embeds[0].image
          a.message.embeds[0].color = "#7401d3"
          a.message.embeds[0].footer = {"text":  a.message.embeds[0].rawDescription}
      } else {
          a.message.embeds[0].thumbnail = {"height": 300, "width":400}
          a.message.embeds[0].thumbnail.url = a.message.embeds[0].thumbnail.proxyURL = "https://sf16-sg.tiktokcdn.com/obj/eden-sg/uvkuhyieh7lpqpbj/pwa/512x512.png"
          a.message.embeds[0].footer = {"text": a.message.embeds[0].rawDescription + "\nThumbnail not provided by TikTok"}
      }

      a.message.embeds[0].video = {"height": 300, "width":400}
      a.message.embeds[0].video.url = a.message.embeds[0].video.proxyURL= "https://tt-embed.com/video/" + btoa(a.message.embeds[0].url).split('/')[0]
      a.message.embeds[0].footer.iconURL = a.message.embeds[0].footer.iconProxyURL = "https://sf16-sg.tiktokcdn.com/obj/eden-sg/uvkuhyieh7lpqpbj/pwa/512x512.png"
    } 
  }
  tiktok = cumcord.patcher.findAndPatch(
      () => cumcord.modules.webpack.findByProps("MessageAccessories"),
      (header) => cumcord.patcher.before("default", header, (args) => {tiktokEmbed(args[0])})
  ); 


  }
export function onUnload() {
  tiktok()
}
  