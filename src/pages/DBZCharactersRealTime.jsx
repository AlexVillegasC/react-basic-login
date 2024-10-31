import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useAuth } from "../provider/AuthProvider";

const DBZCharactersRealTime = () => {
    const { token } = useAuth();
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) return; // Only connect if the token is available (user is authenticated)

        // Create a new connection to the SignalR hub
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:5001/hub/DBZCharactersHub", {
                accessTokenFactory: () => token, // Pass the JWT token for authentication
                withCredentials: true // Ensure credentials are sent with the request
            })
            .withAutomaticReconnect() // Automatically reconnect if connection drops
            .configureLogging(signalR.LogLevel.Information)
            .build();

        // Start the connection and set up listeners
        connection.start()
            .then(() => {
                console.log("Connected to DBZCharactersHub");

                // Listen for the 'ReceiveCharacterSimulation' message from the server
                connection.on("ReceiveCharacterSimulation", (data) => {
                    console.log("Received message:", data); // Debugging log
                    setMessages((prevMessages) => [...prevMessages, data]);
                });
            })
            .catch((err) => {
                console.error("Connection failed: ", err);
            });

        // Cleanup on component unmount
        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [token]);

    return (
        <div>
            <h1>DBZ Real-Time Characters</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))
                ) : (
                    <p>Waiting for real-time character data...</p>
                )}
            </ul>
        </div>
    );
};

export default DBZCharactersRealTime;
