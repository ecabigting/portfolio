import React,{ useEffect,useState} from "react"
import sanityClient from "../client"
import aboutImage from "../home-main-bg.jpg"
import imageUrlBuild from "@sanity/image-url"
import BlockContent from "@sanity/block-content-to-react"

const build = imageUrlBuild(sanityClient);

function urlFor(source){
    return build.image(source);
}

export default function About() {
    const [author, setAuthor] = useState(null);
    useEffect(()=>{
        sanityClient
        .fetch(`*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url
        }`)
        .then((data)=>setAuthor(data[0]))
        .catch(console.error)
    },[]);
    if(!author) 
    {
        return (<div>Author not found</div>);
        // return (
        //     <main className="bg-gray-200 min-h-screen p-12 relative">
        //         <article className="container shadow-lg mx-auto bg-gray-100 rounded-lg">
        //             <header className="relative">
        //                 <div className="absolute h-full w-full items-center justify-center p-8">
        //                     <div className="bg-white bg-opacity-75 rounded p-12">
        //                         <h1 className="regular-text lg:text-6xl mb-4 text-center">404</h1>
        //                         <div className="justify-center flex text-gray-800">
        //                             <p className="flex items-center pl-2 text-2xl">Author not found!</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </header>
        //         </article>
        //     </main>
        // );
    }

    return(
        <main className="relative min-h-screen">
            <img src={aboutImage} alt="ecabigting" className="absolute w-full"/>
            <div className="p-10 lg:pt-48 container mx-auto relative ">
                <section className="bg-gray-900 bg-opacity-80 rounded-lg shadow-2xl lg:flex p-20">
                    <img src={urlFor(author.authorImage).url()} className="rounded w-32 h-32" alt={author.name}/>
                    <div className="text-lg flex flex-col justify-center text-white pl-6">
                        <h1 className="text-regular text-4xl text-white-900 mb-4">
                            Hey! I'm {" "}
                            <span>{author.name}</span>
                        </h1>
                        <div className="pros lg:prose-md text-white">
                            <BlockContent blocks={author.bio} projectId="bc4fzsr5" dataset="production"/>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}