import React, { useState, useEffect } from "react";
import { fetchDiscorData, getIp, sendMessage } from "../../utils/api";
import { navItems } from "../../utils/mocks/navbar";
import Rpc from "../Rpc/Rpc";
import "./navbar.scss";
import { Modal, MantineProvider } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [discordName, setDiscordName] = useState<string>("");
  // RPC
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImage, setSmallImage] = useState<string>("");
  const [appName, setAppName] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [dirName, setDirName] = useState<string>("");
  const [showRpc, setShowRpc] = useState<boolean>(false);
  // RPC
  const [navOpen, setNavOpen] = useState<boolean>(false);
  // Modal
  const [opened, setOpened] = useState<boolean>(false);
  // Modal
  // Contact
  const [name, setContacterName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // Contact

  const handleSubmit = () => {
    if (name.length !== 0 && email.length !== 0 && message.length !== 0) {
      getIp()
        .then((response) => {
          sendMessage(
            name,
            response.data.ip,
            message,
            "<@805166992432431124>",
            navigator.userAgent,
            email
          )
            .then((res) => {
              toast.success("Success! Your message has been submitted.");
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
      if (name.length === 0) {
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

  useEffect(() => {
    fetchDiscorData()
      .then((res) => {
        const rpc = res.data.data.activities[1];
        const general = res.data.data;

        setDiscordName(general.discord_user.username);
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
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="navbar">
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
      {/* {window.innerWidth <= 725 ? ( */}
      <>
        <div className="mobile-nav">
          <h2>{discordName}</h2>
          <span onClick={() => setNavOpen(!navOpen)}>
            <i
              className={`fa-solid ${navOpen ? "fa-circle-xmark" : "fa-bars"}`}
            ></i>
          </span>
        </div>
        <div className={`mobile-menu ${navOpen === true ? "selected" : ""}`}>
          {navItems.map((item) => (
            <div className="menu-item">
              <div className="item-wrapper" key={item.id}>
                {item.redirect === true ? (
                  <a
                    href={item.path}
                    className={
                      window.location.href.includes(`${item.path}`)
                        ? "active"
                        : ""
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
          {showRpc === true ? (
            <Rpc
              largeImage={largeImage}
              smallImage={smallImage}
              appName={appName}
              fileName={fileName}
              dirName={dirName}
              resposive="Mobile"
            />
          ) : (
            ""
          )}
        </div>
      </>
      {/* ) : (
        ""
      )} */}
    </div>
  );
};

export default Navbar;
