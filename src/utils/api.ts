import axios from "axios";

export function fetchDiscorData() {
  var config = {
    method: "GET",
    url: "https://api.lanyard.rest/v1/users/805166992432431124/",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
}

export function sendMessage(
  name: string,
  ip: string,
  message: string,
  pingId: string,
  agent: string,
  email: string
) {
  let data = JSON.stringify({
    content: `<@${pingId}>`,
    embeds: [
      {
        title: "New Message",
        color: 5814783,
        fields: [
          {
            name: "Name:",
            value: `${name}`,
            inline: true,
          },
          {
            name: "Ip:",
            value: `${ip}`,
            inline: true,
          },
          {
            name: "Email:",
            value: `${email}`,
          },
          {
            name: "Message:",
            value: `${message}`,
          },
        ],
        footer: {
          text: `User Agent: ${agent}`,
        },
      },
    ],
    username: "Bardia - [ CONTACT ]",
    avatar_url: "https://discordtemplates.me/icon.png?size=512",
    attachments: [],
  });

  let config = {
    method: "post",
    url: "https://discord.com/api/webhooks/878671016900055040/MywhlNWBYJ4QPGH7G087H7JdpF0l-LjvJTvxoAwGKrRFSnLFh9NOfucpx1KrhUIrFpuA",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function getIp() {
  var config = {
    method: "get",
    url: "https://api.ipify.org/?format=json",
  };

  return axios(config);
}
