import { AudioResource, createAudioResource, StreamType } from "@discordjs/voice";
import youtube from "youtube-sr";
import { i18n } from "../utils/i18n";
import { videoPattern, isURL } from "../utils/patterns";
import * as youtubedl from 'youtube-dl-exec';
import { Readable } from "node:stream";
import { spawn } from "node:child_process";


export interface SongData {
    url: string;
    title: string;
    duration: number;
}

export class Song {
    public readonly url: string;
    public readonly title: string;
    public readonly duration: number;

    public constructor({ url, title, duration }: SongData) {
        this.url = url;
        this.title = title;
        this.duration = duration;
    }

    public static async from(url: string = "", search: string = "") {
        const isYoutubeUrl = videoPattern.test(url);

        let songInfo;

        if (isYoutubeUrl) {
            songInfo = await youtubedl.youtubeDl(url, {

                skipDownload: true,
            });

            if (typeof songInfo === "string") throw new Error();
            return new this({
                url: songInfo.original_url,
                title: songInfo.title,
                duration: songInfo.duration * 1000
            });
        } else {
            const result = await youtube.searchOne(search);

            result ? null : console.log(`No results found for ${search}`);

            if (!result) {
                let err = new Error(`No search results found for ${search}`);

                err.name = "NoResults";

                if (isURL.test(url)) err.name = "InvalidURL";

                throw err;
            }

            songInfo = await youtubedl.youtubeDl(`https://youtube.com/watch?v=${result.id}`, {
                dumpSingleJson: true,
                skipDownload: true,
            });
            if (typeof songInfo === "string") throw new Error();

            return new this({
                url: songInfo.webpage_url,
                title: songInfo.title,
                duration: songInfo.duration * 1000
            });
        }
    }

    public async makeResource(): Promise<AudioResource<Song> | void> {
        let playStream;

        const source = this.url.includes("youtube") ? "youtube" : "soundcloud";

        if (source === "youtube") {
            const dl = new Promise<void>(res => {
                console.log("trying to download %s", this.url);
                const chunks: Buffer[] = [];
                const ytdlp = spawn('yt-dlp', ['-f', 'bestaudio', '-o', '-', this.url]);
                const ffmpeg = spawn('ffmpeg', [
                    '-i', 'pipe:0','-loglevel', '0',
                    '-f', 'opus',
                    '-ar', '48000',
                    '-ac', '2',
                    'pipe:1'
                ]);
                ytdlp.stdout.pipe(ffmpeg.stdin);
                playStream = ytdlp.stdout;


                ffmpeg.stdout.on("data", e => {
                    chunks.push(e);
                })
                ffmpeg.stdout.on("close", () => {
                    playStream = Buffer.concat(chunks);
                    res();
                })
            })
            await dl;

            // ffmpeg.stdout is now a live Opus stream you can feed to createAudioResource
        }

        if (playStream === undefined) return console.log("Failed to stream");

        return createAudioResource(Readable.from([playStream]), { metadata: this, inputType: StreamType.OggOpus, inlineVolume: true });
    }

    public startMessage() {
        return i18n.__mf("play.startedPlaying", { title: this.title, url: this.url });
    }
}
