import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"

import MovieContext from "./Context"
import Index from "../view/pages/index"

import "../view/styles/index.sass"


const Movie = () => {
    const [movieContext, setContext] = useState({
        sidebarOpened: false,
        movie: null
    });

    return (
        <MovieContext.Provider value={{movieContext, setContext}}>
            <Index />
        </MovieContext.Provider>
    )
}


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Movie />
    </StrictMode>
)