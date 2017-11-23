"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
require('dotenv').config();
class JCounter {
    constructor(token) {
        this.client = new Discord.Client();
        this.token = token;
    }
    ;
    Run() {
        const serverName = this.makeServerName();
        this.SetGuildName(serverName);
        return true;
    }
    SetGuildName(serverName) {
        this.client.login(this.token).then(() => {
            const guild = this.client.guilds.first();
            console.log("logined!");
            guild.setName(serverName).then(() => {
                console.log("server name changed!");
                this.client.destroy().then(() => {
                    console.log("connection closed.");
                });
            }).catch((e) => {
                console.log("server name change failed", e);
                this.client.destroy().then(() => {
                    console.log("connection closed.");
                });
            });
        }).catch((e) => {
            console.log("login failed.", e);
            this.client.destroy().then(() => {
                console.log("connection closed.");
            });
        });
        return true;
    }
    makeServerName() {
        const entrance = Date.parse("2007/4/1");
        const now = Date.now();
        const elapsedYears = (now - entrance) / 1000 / 60 / 60 / 24 / 365;
        const serverName = (elapsedYears + 1).toFixed(5).toString() + "J";
        return serverName;
    }
}
let env = process.env.NODE_DISCORD_TOKEN;
if (typeof env !== 'string') {
    console.log("tokenネエヨ");
    process.exit();
}
else {
    const bot = new JCounter(env);
    bot.Run();
}
