import { MantineProvider, Modal } from "@mantine/core";
import { fetchDiscorData, getIp, sendMessage } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { navItems } from "../../utils/mocks/navbar";
import { socials } from "../../utils/mocks/socials";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Rpc from "../Rpc/Rpc";
import "./sidebar.scss";

const Sidebar = () => {
  const [profile, setProfile] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  // RPC
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImage, setSmallImage] = useState<string>("");
  const [appName, setAppName] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [dirName, setDirName] = useState<string>("");
  const [showRpc, setShowRpc] = useState<boolean>(false);
  // RPC
  // Modal
  const [opened, setOpened] = useState<boolean>(false);
  // Modal
  // Contact
  const [contacterName, setContacterName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // Contact

  useEffect(() => {
    fetchDiscorData()
      .then((res) => {
        const rpc = res.data.data.activities[1];

        setProfile(`${res.data.data.discord_user.avatar}`);
        setId(`${res.data.data.discord_user.id}`);
        setName(`${res.data.data.discord_user.username}`);

        // RPC
        if (rpc) {
          setShowRpc(true);
          // RPC
          setLargeImage(
            `https://cdn.discordapp.com/app-assets/${rpc.application_id}/${rpc.assets.large_image}.png`
          );
          setSmallImage(
            `https://cdn.discordapp.com/app-assets/${rpc.application_id}/${rpc.assets.small_image}.png`
          );
          setAppName(rpc.name);
          const fileInDiscord = rpc.details.includes("📃")
            ? rpc.details.split("📃 ")
            : "";
          setFileName(fileInDiscord);

          const dirName = rpc.state.includes("📂")
            ? rpc.state.split("📂 Workspace:")
            : rpc.state.split("Workspace:");

          setDirName(dirName);
          // RPC
        }
        // RPC
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = () => {
    if (
      contacterName.length !== 0 &&
      email.length !== 0 &&
      message.length !== 0
    ) {
      getIp()
        .then((response) => {
          sendMessage(
            contacterName,
            response.data.ip,
            message,
            "<@805166992432431124>",
            navigator.userAgent,
            email
          )
            .then((res) => {
              console.log(res);
              toast.success("Success! Your message has been submitted.");
              setOpened(false);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Something went wrong!");
            });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something went wrong!");
        });
    } else {
      if (contacterName.length === 0) {
        document.querySelector("#name").style.borderColor = "#f00";
      }
      if (email.length === 0) {
        document.querySelector("#email").style.borderColor = "#f00";
      }
      if (message.length === 0) {
        document.querySelector("#textarea").style.borderColor = "#f00";
      }
    }
  };

  return (
    <div className="sidebar">
      <ToastContainer theme="dark" position="bottom-left" />
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Lets get in touch!"
        >
          <h3 className="label">Name:</h3>
          <input
            type="text"
            className="input"
            placeholder="John/Jane Doe"
            onChange={(e) => setContacterName(e.target.value)}
            id="name"
          />
          <h3 className="label">Email:</h3>
          <input
            type="text"
            className="input"
            placeholder="john.doe@provider.com"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <h3 className="label">Message:</h3>
          <textarea
            id="textarea"
            placeholder="Your message..."
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="settings">
            <button className="submit" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </Modal>
      </MantineProvider>
      <div className="socials">
        {socials.map((item) => (
          <a href={item.path} key={item.id}>
            <i className={item.iconName} />
          </a>
        ))}
      </div>
      <div className="sidebar-top">
        <img
          src={`https://cdn.discordapp.com/avatars/${id}/${profile}.webp?size=80`}
          alt={`${name}'s Profile Picture`}
        />
        <h3 className="username">{name}</h3>
      </div>
      <hr
        style={{ height: "2px", backgroundColor: "#202020", border: "none" }}
      />
      {navItems.map((item) => (
        <div className="items">
          <div className="item" key={item.id}>
            {item.redirect === true ? (
              <a
                href={item.path}
                className={
                  window.location.href.includes(`${item.path}`) ? "active" : ""
                }
              >
                {item.name}
              </a>
            ) : (
              <a onClick={() => setOpened(true)}>{item.name}</a>
            )}
          </div>
        </div>
      ))}
      <Rpc
        resposive="Desktop"
        appName={appName}
        dirName={dirName}
        fileName={fileName}
        largeImage={largeImage}
        smallImage={smallImage}
      />
    </div>
  );
};

export default Sidebar;
