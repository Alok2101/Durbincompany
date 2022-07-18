import React from "react";
import "./styles.css";
import { LatLon } from "geodesy/utm";
import { CSVReader } from "react-papaparse";
import { CSVLink } from "react-csv";

export default function App() {
  const [disableDownload, setDisableDownload] = React.useState(true);
  const [coordinates, setCoordinates] = React.useState([]);
  const headers = [
    { label: "zone", key: "zone" },
    { label: "hemisphere", key: "hemisphere" },
    { label: "easting", key: "easting" },
    { label: "northing", key: "northing" },
    { label: "ellipsoidA", key: "datum.ellipsoid.a" },
    { label: "ellipsoidB", key: "datum.ellipsoid.b" },
    { label: "ellipsoidF", key: "datum.ellipsoid.f" },
    { label: "transform0", key: "datum.transform[0]" },
    { label: "transform1", key: "datum.transform[1]" },
    { label: "transform2", key: "datum.transform[2]" },
    { label: "transform3", key: "datum.transform[3]" },
    { label: "transform4", key: "datum.transform[4]" },
    { label: "transform5", key: "datum.transform[5]" },
    { label: "transform6", key: "datum.transform[6]" },
    { label: "convergence", key: "convergence" },
    { label: "scale", key: "scale" }
  ];

  const handleOnDrop = (data) => {
    setDisableDownload(true);
    console.clear();
    data.map((item) => {
      if (item.data.length > 1) {
        const latLonP = new LatLon(item.data[0], item.data[1]);

        // for some reason setCoordinates doesn't work (???)
        coordinates.push(latLonP.toUtm());
      }
    });
    setDisableDownload(false);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.clear();
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.clear();
    setDisableDownload(true);
    setCoordinates([]);
  };

  return (
    <>
      <h3 className="warning">
       
      </h3>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      <br />
      {!disableDownload ? (
        <CSVLink data={coordinates} headers={headers}>
          Download
        </CSVLink>
      ) : (
        ""
      )}
      <pre>
        *if the download button doesn't work, open the app in a new window
      </pre>
    </>
  );
}
