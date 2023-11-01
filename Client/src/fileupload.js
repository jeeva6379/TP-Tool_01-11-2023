import React, { useEffect, useState } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload, faFile } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import FadeLoader from "react-spinners/FadeLoader";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";
import image from "./lens.webp";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 6,
    paddingTop: 30, 
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
  },
  text: {
    marginBottom: 10,
    fontSize: 6,
  },
});
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [wordCounts, setWordCounts] = useState({});
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [outputPDFFfileName__, setOutputPDFFfileName__] = useState("");
  const [google_title, setGoogle_title] = useState("");
  const [title, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selfCitationData, setSelfCitationData] = useState("");
  const [refCitationData, setRefCitationData] = useState("");
  const [googletitle_link, setGoogletitle_link] = useState("");
  const [userData, setUserData] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
          window.location.href = "/";
        }

        const response = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        setShowLoadingScreen(false);
        return alert("Please choose file to upload !!");
      }

      setShowLoadingScreen(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData);

      setShowLoadingScreen(false);
      const {
        highlightedText,
        wordCounts,
        google_title: searchGoogleForTitle,
        filename,
        selfcitationdata,
        referenceCitationInAbstractandConclusion,
      } = response.data;

      setSelfCitationData(selfcitationdata);

      console.log(referenceCitationInAbstractandConclusion);
      setRefCitationData(referenceCitationInAbstractandConclusion);
      console.log("Self_Citation", selfcitationdata);

      setAbbreviation(highlightedText);
      if (selfcitationdata.matchingResult !== "Not found") {
        setGoogletitle_link(selfcitationdata.matchingResult.link);
      }

      const fileNameParts = filename.split(".");
      fileNameParts.pop();
      const outputPDFFfileName = `${fileNameParts.join(".")}_phrases_found.pdf`;
      setOutputPDFFfileName__(outputPDFFfileName);

      setHighlightedText(highlightedText);
      setWordCounts(wordCounts);
    } catch (error) {
      console.error("Error uploading file:", error);
      setShowLoadingScreen(false);
      alert("This file not support");
    }
  };

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Html style={{ fontSize: "12px", fontFamily: "Times New Roman" }}>
            {highlightedText}
          </Html>
        </View>
      </Page>
    </Document>
  );

  const handleClearDocument = () => {
    setShowLoadingScreen(true);
    setHighlightedText("");
    setWordCounts("");
    setFile(null);
    setFileName("");
    setShowLoadingScreen(false);
  };

  const loadingScreen = () => {
    return (
      <div
        className="d-flex display-5 justify-content-center align-items-center"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: "10",
          backgroundColor: "#0006",
        }}
      >
        <div className="text-light">
          <FadeLoader color="darkorange" />
        </div>
      </div>
    );
  };

  const colors = [
    "#FF0000",
    "#0000FF",
    "#FF00FF",
    "#808000",
    "#FFA500",
    "#000000",
    "#808080",
    "#3CB371",
    "#57E964",
    "#FDBD01",
    "#D4A017",
    "#513B1C",
    "#EB5406",
    "#F62217",
    "#810541",
    "#F8B88B",
    "#FF00FF",
    "#BA55D3",
    "#800080",
  ];
  const wordMatchColor = {};
  let nextMatchColor = 0;

  const textStyle = {
    color: "#000c",
    fontSize: "50px",
    fontFamily: "'Exo', sans-serif",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
    window.location.href = "/";
  };

  const handleDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {showLoadingScreen && loadingScreen()}

        <div className="animationContainer">
          <div className="app">
            <div className="container display-4  pt-5 pb-3" style={textStyle}>
              <h4 class="d-inline-flex bd-highlight border border text-dark display-5 font-monospace  rounded p-2">
                TP Detector
              </h4>
              <button
                className="btn btn border border-dark bg-white position-absolute"
                style={{
                  position: "fixed",
                  left: "80%",
                  transform: "translateX(-20%)",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>{" "}
              <br />
              <button
                className="btn btn border border-danger bg-white position-absolute"
                style={{
                  position: "fixed",
                  left: "10%",
                  transform: "translateX(-20%)",
                }}
                onClick={handleDashboard}
              >
                Dashboard
              </button>
            </div>

            <br />

            <div
              className="row pt-5 justify-content-center"
              style={{ transition: "all .3s" }}
            >
              <div className="mb-5  col-lg-4">
                <div class="parent me-3">
                  <div className=" file-upload mx-auto">
                    <div>
                      <h3>
                        <CSSTransition
                          in={true}
                          appear={true}
                          timeout={500}
                          classNames="animation"
                        >
                          <FontAwesomeIcon
                            icon={faFile}
                            className="file-icon"
                          />
                        </CSSTransition>
                        &nbsp; Choose Browse File from Device
                      </h3>
                      <input
                        type="file"
                        accept=".doc,.docx"
                        onChange={handleFileUpload}
                        required
                      />
                    </div>
                  </div>{" "}
                  {fileName && <div class="small my-1">{fileName}</div>}
                  <div class="small my-1 text-danger">
                    Max Upload Size: 12 MB
                  </div>
                  &nbsp; &nbsp;
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="upload-button btn-block w-100"
                  >
                    <FontAwesomeIcon icon={faUpload} />
                    Upload
                  </button>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={handleClearDocument}
                    className="text-primary p-0 bg-transparent mt-4 text-end"
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-2" />
                    Reset
                  </div>
                </div>
              </div>

              {highlightedText && (
                <div className=" mb-5 col-lg-6 parent m-0">
                  <div className="mx-auto ">
                    {highlightedText && Object.keys(wordCounts).length < 1 && (
                      <div>
                        <h5>Torture Phrases Found:NIL</h5>
                        <hr />
                      </div>
                    )}
                    {Object.keys(wordCounts).length > 0 && (
                      <div>
                        <h5>Torture Phrases Found:</h5>
                        <ul>
                          {Object.entries(wordCounts).map(([word, count]) => {
                            if (!wordMatchColor[word]) {
                              wordMatchColor[word] = colors[nextMatchColor];
                              nextMatchColor++;
                              if (nextMatchColor === colors.length) {
                                nextMatchColor = 0;
                              }
                            }
                            return (
                              <li
                                style={{ color: wordMatchColor[word] }}
                                key={word}
                              >
                                {word}: {count}
                              </li>
                            );
                          })}
                        </ul>
                        <hr />
                      </div>
                    )}{" "}
                    <br />
                    {selfCitationData.selfCitationData.length > 0 ||
                    selfCitationData.selfCitationData.length < 1 ? (
                      <div>
                        <h5>Self Citation Count: NIL</h5>
                        <hr />
                      </div>
                    ) : (
                      <>
                        <h5>Self Citation Count</h5>

                        <div>
                          {selfCitationData.selfCitationData.map(
                            (item, index) => {
                              if (item.count > 0) {
                                return (
                                  <div key={index}>
                                    {item.name} - {item.count}
                                  </div>
                                );
                              } else {
                                return null;
                              }
                            }
                          )}
                          <hr />
                        </div>
                      </>
                    )}
                    <br />
                    {refCitationData.matches.length === 0 ? (
                      <div>
                        <h5>Found in Abstract/Conclusion Section:NIL</h5>
                      </div>
                    ) : (
                      <div>
                        <h5>
                          Found in Abstract/
                          <wbr />
                          Conclusion Section:
                        </h5>
                        <hr />
                        <ul>
                          {refCitationData.matches.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <hr />
                    <br />
                    <div>
                      <h5>
                        Similar title: Available Link -{" "}
                        {googletitle_link ? (
                          <a target="blank" href={googletitle_link}>
                            Matched-Link
                          </a>
                        ) : (
                          "Not found"
                        )}
                      </h5>
                      <hr />
                    </div>
                    {/* <hr /> */}
                    <div></div>
                    {highlightedText && (
                      <div>
                        <PDFDownloadLink
                          className="btn btn-danger"
                          document={<MyDocument />}
                          fileName={outputPDFFfileName__}
                        >
                          {({ loading }) =>
                            loading ? "Loading document..." : "Download as PDF"
                          }
                        </PDFDownloadLink>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FileUpload;

