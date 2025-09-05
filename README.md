# YabaiBot

> YabaiBot is a Discord Music Bot built with TypeScript, discord.js & uses Command Handler from [discordjs.guide](https://discordjs.guide) that's forked from [EvoBot](https://github.com/eritislami/evobot)

Code has been modified due to inactivity on the original repository.

## Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**  
   1.1. Enable 'Message Content Intent' in Discord Developer Portal
2. Node.js 16.11.0 or newer
3. `yt-dlp` and `ffmpeg` in **`$PATH`**

## 🚀 Getting Started

```sh
git clone https://github.com/x5ilky/yabai-bot.git
cd yabai-bot
npm install
```

After installation finishes follow configuration instructions then run `npm run start` to start the bot.

## ⚙️ Configuration

Copy or Rename `config.json.example` to `config.json` and fill out the values:

⚠️ **Note: Never commit or share your token or api keys publicly** ⚠️

```json
{
  "TOKEN": "",
  "MAX_PLAYLIST_SIZE": 10,
  "PRUNING": false,
  "LOCALE": "en",
  "DEFAULT_VOLUME": 100,
  "STAY_TIME": 30
}
```



- 🎶 Play music from YouTube via url

`/play https://www.youtube.com/watch?v=GLvohMXgcBo`

- 🔎 Play music from YouTube via search query

`/play under the bridge red hot chili peppers`

- 🔎 Search and select music to play

`/search Pearl Jam`

- 📃 Play youtube playlists via url

`/playlist https://www.youtube.com/watch?v=YlUKcNNmywk&list=PL5RNCwK3GIO13SR_o57bGJCEmqFAwq82c`

- 🔎 Play youtube playlists via search query

`/playlist linkin park meteora`

- Now Playing (/nowplaying)
- Queue system (/queue)
- Loop / Repeat (/loop)
- Shuffle (/shuffle)
- Volume control (/volume)
- Lyrics (/lyrics)
- Pause (/pause)
- Resume (/resume)
- Skip (/skip)
- Skip to song # in queue (/skipto)
- Move a song in the queue (/move)
- Remove song # from queue (/remove)
- Show ping to Discord API (/ping)
- Show bot uptime (/uptime)
- Toggle pruning of bot messages (/pruning)
- Help (/help)
- Command Handler from [discordjs.guide](https://discordjs.guide/)
- Media Controls via Buttons

![buttons](https://i.imgur.com/67TGY0c.png)

## 🌎 Locales

Currently available locales are:

- English (en)
- Arabic (ar)
- Brazilian Portuguese (pt_br)
- Bulgarian (bg)
- Romanian (ro)
- Czech (cs)
- Dutch (nl)
- French (fr)
- German (de)
- Greek (el)
- Indonesian (id)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Minionese (mi)
- Persian (fa)
- Polish (pl)
- Russian (ru)
- Simplified Chinese (zh_cn)
- Singaporean Mandarin (zh_sg)
- Spanish (es)
- Swedish (sv)
- Traditional Chinese (zh_tw)
- Thai (th)
- Turkish (tr)
- Ukrainian (uk)
- Vietnamese (vi)
- Check [Contributing](#-contributing) if you wish to help add more languages!
- For languages please use [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) two letter format
