import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";

const DBZCharacters = () => {
    const { token } = useAuth();
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener los personajes de DBZ
        const fetchCharacters = async () => {
            try {
                const response = await fetch("https://localhost:5001/dbz/character", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Incluimos el token en el header
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los personajes de DBZ");
                }

                const data = await response.json();
                setCharacters(data);
            } catch (error) {
                setError("No se pudo cargar la lista de personajes. Verifica tu conexión y el token.");
                console.error("Fetch error:", error);
            }
        };

        // Llamamos a la función si el token está disponible
        if (token) {
            fetchCharacters();
        }
    }, [token]);

    return (
        <div>
            <h1>Personajes de DBZ</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {characters.length > 0 ? (
                <ul>
                    {characters.map((character, index) => (
                        <li key={index}>
                            {character.name} - Nivel de Fuerza: {character.strengthLevel}
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p>Cargando personajes...</p>
            )}
        </div>
    );
};

export default DBZCharacters;
