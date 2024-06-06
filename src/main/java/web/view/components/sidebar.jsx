import { useContext, useEffect } from "react"

import MovieContext from "../Context"


const useMovieContext = () => {
    const { movieContext, setContext } = useContext(MovieContext)

    const closeSidebar = () => {
        movieContext.sidebarOpened = false
        movieContext.movie = null
        setContext({ ...movieContext })
    }

    const updateContent = (rerender) => {
        if (rerender) {
            movieContext.triggerRender = !movieContext.triggerRender
        }

        setContext({ ...movieContext })
    }

    return {
        movie: movieContext.movie,
        sidebarOpened: movieContext.sidebarOpened,
        updateContent,
        closeSidebar,
    }
}

const useMovieAPI = () => {
    const uploadMovie = async (data) => {
        await fetch(`/api/movie/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const updateMovie = async (id, data) => {
        await fetch(`/api/movie/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const deleteMovie = async (id) => {
        await fetch(`/api/movie/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return {
        uploadMovie,
        updateMovie,
        deleteMovie,
    }
}


export default function Sidebar({ className, }) {
    const { movie, sidebarOpened, updateContent, closeSidebar } = useMovieContext()
    const { uploadMovie, updateMovie, deleteMovie } = useMovieAPI()

    return (
        <div className={`bg-neutral-900 scrollbar-hide overflow-x-hidden overflow-y-scroll ${className}`}>
            <div>
                <div className="absolute top-10 left-0 right-0 px-5 macro:hidden">
                    <div className="flex justify-between">
                        <button onClick={() => closeSidebar()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={28} height={28} className="fill-neutral-100">
                                {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </button>
                        <button className="flex items-center gap-2" onClick={async () => {
                            await deleteMovie(movie?.id)
                            updateContent(true)
                            closeSidebar()
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={16} height={16} className="fill-red-300">
                                {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                            </svg>
                            <p className="text-sm text-red-300">Delete</p>
                        </button>
                    </div>
                </div>

                {(!movie && !sidebarOpened) && <div className="w-full flex flex-col items-center justify-center">
                    <div className="flex items-center gap-3 py-16 px-20 rounded-3xl border-2 border-neutral-700 border-dashed">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={32} height={32} className="fill-neutral-700">
                            {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z" />
                        </svg>
                        <h1 className="font-anton font-bold text-neutral-700 text-3xl">AMDB</h1>
                    </div>
                </div>}

                {(!!movie && sidebarOpened) && <div className="h-full mt-32 px-3 pb-5 macro:mt-10 macro:pb-5">
                    <div className="relative flex flex-col gap-5">
                        <div className="absolute top-0 right-0 px-5 hidden macro:block">
                            <button className="flex items-center gap-2" onClick={async () => {
                                await deleteMovie(movie.id)
                                updateContent(true)
                                closeSidebar()
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={16} height={16} className="fill-red-300">
                                    {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                </svg>
                                <p className="text-sm text-red-300">Delete</p>
                            </button>
                        </div>
                        <div className="mt-5 flex flex-col gap-1">
                            <label htmlFor="title" className="ml-3">Title</label>
                            <input 
                                id="title" 
                                type="text"
                                placeholder="Movie Title"
                                value={movie?.title}
                                onChange={event => {
                                    movie.title = event.target.value;
                                    updateContent()
                                }}
                                className="w-full pl-5 py-3 font-poppins text-semibold rounded-xl text-neutral-100 outline-none bg-neutral-700" 
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="ml-3">Director</label>
                            <input 
                                type="text"
                                placeholder="Director"
                                value={movie?.director}
                                onChange={event => {
                                    movie.director = event.target.value;
                                    updateContent()
                                }}
                                className="w-full pl-5 py-3 font-poppins text-semibold rounded-xl text-neutral-100 outline-none bg-neutral-700" 
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="ml-3">Summary</label>
                            <textarea cols="5" rows="8"
                                placeholder="Movie Summary"
                                value={movie?.summary}
                                onChange={event => {
                                    movie.summary = event.target.value;
                                    updateContent()
                                }}
                                className="pl-5 pr-3 py-3 font-poppins text-semibold rounded-xl text-neutral-100 outline-none bg-neutral-700 resize-none"
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="ml-3">Genres</label>
                            <textarea cols="30" rows="5"
                                placeholder="Add one genre on each line"
                                value={movie?.genres.map(genre => {
                                    return genre.toLowerCase().replace(/(?:^|\s)\S/g, genre => { return genre.toUpperCase(); });
                                }).join("\n")}
                                onChange={event => {
                                    movie.genres = event.target.value.toUpperCase().split("\n");
                                    updateContent()
                                }}
                                className="pl-5 pr-3 py-3 font-poppins text-semibold rounded-xl text-neutral-100 outline-none bg-neutral-700 resize-none"
                            ></textarea>
                        </div>

                        <div className="self-end flex gap-5 px-5 items-center">
                            <button 
                                className="bg-neutral-700 py-2 px-5 rounded-xl"
                                onClick={async () => {
                                    if (!movie.id) {
                                        await uploadMovie(movie)
                                    } else {
                                        await updateMovie(movie.id, movie)
                                    }

                                    updateContent(true)
                                    closeSidebar()
                                }}
                            >Save</button>
                            <button
                                onClick={() => {
                                    updateContent(true)
                                    closeSidebar()
                                }}
                            >Cancel</button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}