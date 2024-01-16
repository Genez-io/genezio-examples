import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./App.css";
import { BlockchainServer } from "@genezio-sdk/genezio-blockchain_us-east-1";
import { Alert } from "@mui/material";

const CHUNKS = 10;

function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);

  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    // Use the SDK to get events from the BlockchainServer class hosted on genezio
    BlockchainServer.getEvents(currentIndex, CHUNKS)
      .then((response) => {
        if (!response || !response.success) {
          setEvents([]);
          setErrorAlert(
            `Unexpected error: ${
              response.err
                ? response.err
                : "Please check the backend logs in the project dashboard - https://app.genez.io."
            }`,
          );
          return;
        }
        setEvents(response.events);
        setTotalCount(response.count);
      })
      .catch((error) => {
        console.error("An error occurred!", error);
        setEvents([]);
      });
  }, [currentIndex]);

  const handleChange = (param, value) => {
    setCurrentIndex((value - 1) * CHUNKS);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Genezio Smart Contract Indexer</h1>

        {errorAlert != "" ? (
          <Alert severity="error">{errorAlert}</Alert>
        ) : (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {events.map((event) => (
              <ListItem>
                <ListItemText
                  primary={event.name}
                  secondary={
                    event.blockNumber + " " + JSON.stringify(event.parameters)
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        <div>
          <Pagination
            count={Math.floor(totalCount / CHUNKS)}
            onChange={handleChange}
          ></Pagination>
        </div>
      </header>
    </div>
  );
}

export default App;
