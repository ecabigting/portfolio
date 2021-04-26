import React ,{ useEffect, useState}from "react"
import { useParams } from "react-router-dom"
import sanityClient from "../client"
import imageUrlBuild from "@sanity/image-url"
import BlockContent from "@sanity/block-content-to-react"

const build = imageUrlBuild(sanityClient);

function urlFor(source){
    return build.image(source);
}

export default function SinglePost() {
    const [ singlePost, setSinglePost ] = useState(null);
    const { slug } = useParams();

    useEffect(()=>(
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage {
                asset-> {
                    _id,
                    url,
                }
            },
            body,
            "name" : author->name,
            "authorImage" : author->image
        }`)
        .then((data)=>setSinglePost(data[0]))
        .catch(console.error)
    ),[slug]);

    if(!singlePost){
        return (
            <main className="bg-gray-200 min-h-screen p-12">
                <article className="container shadow-lg mx-auto bg-gray-100 rounded-lg">
                    <header className="relative">
                        <div className="absolute h-full w-full items-center justify-center p-8">
                            <div className="bg-white bg-opacity-75 rounded p-12">
                                <h1 className="regular-text lg:text-6xl mb-4 text-center">404</h1>
                                <div className="justify-center flex text-gray-800">
                                    <p className="flex items-center pl-2 text-2xl"> Post does not exist!</p>
                                </div>
                            </div>
                        </div>
                        {/* </div>
                        <img 
                            src={singlePost.mainImage.asset.url}
                            alt={singlePost.title}
                            className="w-full object-cover rounded-t"
                            style={{ height:"400px" }}
                            /> */}
                    </header>
                </article>
            </main>
        );
    } 
    return (
        <main className="bg-gray-200 min-h-screen p-12">
            <article className="container shadow-lg mx-auto bg-gray-100 rounded-lg">
                <header className="relative">
                    <div className="absolute h-full w-full items-center justify-center p-8">
                        <div className="bg-white bg-opacity-75 rounded p-12">
                            <h1 className="regular-text lg:text-6xl mb-4 justify-center">{singlePost.title}</h1>
                            <div className="justify-center flex text-gray-800">
                                <img 
                                src={urlFor(singlePost.authorImage).url()}
                                alt={singlePost.name}
                                className="w-10 h-10 rounded-full"
                                />
                                <p className="flex items-center pl-2 text-2xl"> {singlePost.name} </p>
                            </div>
                        </div>
                    </div>
                    <img 
                        src={singlePost.mainImage.asset.url}
                        alt={singlePost.title}
                        className="w-full object-cover rounded-t"
                        style={{ height:"400px" }}
                        />
                </header>
                <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                    <BlockContent blocks={singlePost.body} projectId="bc4fzsr5" dataset="production"/>
                </div>
            </article>
        </main>
    );
}