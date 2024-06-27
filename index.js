const keepAlive = require("./server.js");
const Discord = require("discord.js-selfbot-v13");
require('dotenv').config();


const client = new Discord.Client({
    checkUpdate: false,
});

let executedOnStart = false;

let schedule = [
    {
        startHour: 22,
        startMinute: 30,
        startSecond: 1,
        execute: () => {
            client.user.setPresence({
                activities: [
                    {
                        name: "Getting Ready For School",
                        type: "PLAYING",
                    },
                ],
                status: "idle",
            });
        },
    },
    {
        startHour: 23,
        startMinute: 0,
        startSecond: 1,
        execute: () => {
            client.user.setPresence({
                activities: [
                    {
                        name: "In School rn",
                        type: "PLAYING",
                    },
                ],
                status: "dnd",
            });
        },
    },
    {
        startHour: 2,
        startMinute: 30,
        startSecond: 1,
        execute: () => {
            client.user.setPresence({
                activities: [
                    {
                        name: "Having Lunch At School",
                        type: "PLAYING",
                    },
                ],
                status: "idle",
            });
        },
    },
    {
        startHour: 3,
        startMinute: 10,
        startSecond: 1,
        execute: () => {
            client.user.setPresence({
                activities: [
                    {
                        name: "In School rn",
                        type: "PLAYING",
                    },
                ],
                status: "dnd",
            });
        },
    },
    {
        startHour: 5,
        startMinute: 0,
        startSecond: 1,
        execute: () => {
            client.user.setPresence({
                activities: [
                    {
                        name: "Chillin ☕",
                        type: "PLAYING",
                    },
                ],
                status: "idle",
            });
        },
    },
    {
        startHour: 6,
        startMinute: 0,
        startSecond: 1,
        execute: () => {
            client.user.setPresence({
                activities: [
                    {
                        name: "In Math's Tution",
                        type: "PLAYING",
                    },
                ],
                status: "dnd",
            });
        },
    },
    {
        startHour: 7,
        startMinute: 0,
        startSecond: 1,
        execute: () => {
            client.user.setPresence({
                activities: [
                    {
                        name: "Chillin ☕",
                        type: "PLAYING",
                    },
                ],
                status: "idle",
            });
        },
    },
    {
        startHour: 10,
        startMinute: 36,
        startSecond: 30,
        execute: () => {
            client.user.setPresence({
                activities: [
                    {
                        name: "Sleeping",
                        type: "PLAYING",
                    },
                ],
                status: "dnd",
            });
        },
    },
];

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Execute code on start
    if (!executedOnStart) {
        // executeScheduledCode();
        executeOnStart();
        executedOnStart = true;
    }
});

function getTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();
    return {
        currentHour,
        currentMinutes,
        currentSeconds,
    };
}
function executeOnStart() {
    const currentTime = getTime();
    console.log(currentTime)
    for (let i = 0; i < scedule.length; i++) {
        if (i + 1 == scedule.length) {
            break;
        }
        if (currentTime.currentHour > scedule[i].startHour && currentTime.currentHour < scedule[i + 1].startHour) {
            scedule[i].execute();
            console.log("executed: ");
            console.log(scedule[i]);
            break;
        } else if (currentTime.currentHour == scedule[i].startHour && currentTime.currentHour == scedule[i + 1].startHour) {
            if (currentTime.currentMinutes > scedule[i].startMinute && currentTime.currentMinutes < scedule[i + 1].startMinute) {
                scedule[i].execute();
                console.log("executed: ");
                console.log(scedule[i]);

                break;
            }
        }
    }

}
function executeScheduledCode() {
    try {
        const currentTime = getTime();
        for (let i = 0; i < scedule.length; i++) {
            const scheduleItem = scedule[i];

            if (
                scheduleItem.startHour === currentTime.currentHour &&
                scheduleItem.startMinute === currentTime.currentMinutes &&
                scheduleItem.startSecond === currentTime.currentSeconds
            ) {
                scheduleItem.execute();
                console.log("Scheduled code executed at", currentTime);
            }
        }
    } catch (error) {
        console.error("Error during scheduled code execution:", error);
    }
}

setInterval(executeScheduledCode, 1000);

// Error handling for client login
try {
    client.login(process.env["TOKEN"]);
} catch (error) {
    console.error("Error during login:", error);
}

keepAlive();
