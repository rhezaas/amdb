import { useContext, useState, useEffect } from "react"

import MovieContext from "../Context"

import Page from "../elements/page"


const useMovieAPI = () => {
    const [ { movies, loading, error }, setMovie ] = useState({ movies: [], loading: true, error: null })

    const fetchMovie = async () => {
        await fetch(`/api/movie/`, {
            method: "GET",
        }).then(async resp => {
            const body = await resp.json()

            setMovie({
                movies: body,
                loading: false,
                error: null,
            })
        }).catch(err => {
            setMovie({
                movies: [],
                loading: false,
                error: Error(err.message)
            })
        })
    }

    return {
        movies,
        loading,
        error,

        fetchMovie,
    }
}

export default function Index() {
    const { movieContext, setContext } = useContext(MovieContext)
    const { movies, loading, error, fetchMovie } = useMovieAPI()

    useEffect(() => {
        if (!movies.length && loading) {
            fetchMovie()
        }
    })

    useEffect(() => {
        fetchMovie()
    }, [ movieContext ])

    return (
        <Page title={"Awesome Movie Database"}>
            <div className="px-5 flex flex-col gap-12">
                <div className="flex flex-col gap-5 macro:sticky top-0 pt-12 pb-3 z-50 bg-black">
                    <div>
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={32} height={32} className="fill-neutral-100">
                                {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z" />
                            </svg>
                            <h1 className="font-anton font-bold text-3xl">AMDB</h1>
                        </div>

                        <p className="font-poppins font-semibold">Awesome Movie Database</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="relative flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={16} height={16} className="fill-neutral-200 absolute left-3">
                                {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg>
                            <input type="text" placeholder="Search" className="w-full pl-10 py-2 font-poppins text-semibold rounded-xl text-neutral-100 outline-none bg-neutral-900" />
                        </div>
                        
                        <button 
                            className="p-5 flex items-center gap-3 self-end"
                            onClick={() => {
                                setContext({
                                    sidebarOpened: true,
                                    movie: {
                                        id: 0,
                                        title: "",
                                        director: "",
                                        summary: "",
                                        genres: [],
                                    }
                                })
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20} className="fill-neutral-100">
                                {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                            <p>Add Movie</p>
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 mini:grid-cols-2 macro:grid-cols-3">
                    {movies.map((movie, index) => (
                        <button key={index} className="h-full relative bg-neutral-900 rounded-3xl" onClick={() => setContext({ sidebarOpened: true, movie })}>
                            <div className="flex flex-col">
                                <div className="flex items-center justify-center h-48 bg-neutral-700 rounded-3xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={32} height={32} className="fill-neutral-100">
                                        {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                        <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z" />
                                    </svg>
                                </div>

                                <div className="px-5 py-4 text-left">
                                    <h2 className="font-semibold text-xl">{movie.title}</h2>
                                    <p className="text-sm">{movie.director} • {movie.genres.join(", ")} • {movie.releaseYear}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </Page>
        
    )
}