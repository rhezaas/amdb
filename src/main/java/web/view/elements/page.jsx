import { useContext, useEffect } from "react"

import MovieContext from "../Context"

import Sidebar from "../components/sidebar"


// Index Page
export default function Page({ page, title, className, children }) {
    const { movieContext, setContext } = useContext(MovieContext)

    useEffect(() => {
        document.title = title
    })

    return (
        <div className={`relative font-poppins text-neutral-100 large:flex large:flex-col large:items-center overflow-hidden ${movieContext.sidebarOpened ? "max-h-dvh" : ""}`}>
            <div className="max-w-screen-large min-h-dvh macro:grid macro:gap-5 macro:grid-cols-12 macro:px-5 large:w-full">
                <div 
                    className={`scrollbar-hide pb-20
                        macro:mx-3 macro:col-start-1 macro:col-end-9 macro:overflow-x-hidden macro:overflow-y-scroll macro:max-h-dvh
                        ${className}`}
                >
                    {children}
                </div>

                <Sidebar
                    page={page}
                    className={`w-full h-full absolute top-0 bottom-0 z-50
                        rounded-l-3xl flex flex-col justify-center transition-all duration-700 
                        macro:h-auto macro:static macro:col-start-9 macro:col-end-13 macro:my-16 macro:rounded-3xl macro:shadow-xl
                        ${movieContext.sidebarOpened ? "left-0" : "left-full"}
                    `}
                />

                <button 
                    className="fixed bg-neutral-100 bottom-5 right-5 p-5 rounded-full macro:hidden"
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20} className="fill-neutral-900">
                        {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}