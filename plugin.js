export function onLoad() {
    
function tiktokEmbed(a) {
  if (a.message.embeds[0] && a.message.embeds[0].provider && a.message.embeds[0].provider.name === "TikTok") {
    console.log(a.message.embeds[0])
    //a.message.embeds[0].provider.name = "TikTok Embed"
    a.message.embeds[0].type = "video"
    a.message.embeds[0].thumbnail = a.message.embeds[0].image
    a.message.embeds[0].video = {}
    if (a.message.embeds[0].image) {
      a.message.embeds[0].video.height = 300//a.message.embeds[0].thumbnail.width 
      a.message.embeds[0].video.width = 400//a.message.embeds[0].thumbnail.height
      a.message.embeds[0].video.url = "https://tt-embed.com/video/" + btoa(a.message.embeds[0].url).split('/')[0]
    } /*else {
      a.message.embeds[0].thumbnail = {}
      a.message.embeds[0].video.height = a.message.embeds[0].thumbnail.height = 1440
      a.message.embeds[0].video.width = a.message.embeds[0].thumbnail.width = 1280
    }*/
    
  } 
  else if (a.message.embeds[0] && a.message.embeds[0].provider && a.message.embeds[0].provider.url === "https://tt-embed.com/"){
    console.log(a.message.embeds[0])
  }
}
const tiktok = cumcord.patcher.findAndPatch(
    () => cumcord.modules.webpack.findByProps("MessageAccessories"),
    (header) => cumcord.patcher.before("default", header, (args) => {tiktokEmbed(args[0])})
); 
export async function onUnload() {
      let confirmed = await cumcord.ui.modals.showConfirmationModal({
        header: "Are you sure?",
        content: "This will reload your discord!",
        confirmText: "Reload",
        type: "danger"
      });
      if(await confirmed){location.href = location.href}
}
