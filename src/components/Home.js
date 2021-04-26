import React,{ useEffect,useState } from "react"
import image from "../home-main-bg.jpg"
import { Link } from "react-router-dom";
import sanityClient from "../client.js"

export default function Home() {
    const [postData, setPost] = useState(null);
    useEffect(()=>{
        sanityClient.fetch(`*[_type=="post"] | order(publishedAt asc) {
            title,
            slug,
            mainImage{
                asset->{
                    _id,
                    url,
                },
                alt
            }
        }[0...4]`)
        .then((data)=> setPost(data))
        .catch((console.error))
    },[])

    return (
        <main className="min-h-screen w-full" style={{ backgroundImage : `url(${image})`,backgroundPosition: 'center top',backgroundSize: 'cover' }}>
            {/* <img src={image} alt="lets code!" className="absolute object-cover min-h-screen w-full"/> */}
            <div className="relative min-h-screen w-full bg-black bg-opacity-40 ">
                <section className="relative w-full justify-center text-white text-center">
                    <h1 className="text-6xl text-white regular-text lg:leading-snug pt-4">...lets &#123;code&#125;</h1>
                </section>
                <section className="relative w-full h-full justify-center text-white text-center pt-6">
                    <h2 className="text-2xl text-white regular-text lg:leading-snug">Recent Post</h2>
                    <div className="grid md:grid-cols-auto lg:grid-cols-auto pt-6 text-center">
                        {postData && postData.map((post,index) => (
                            <span className="relative rounded shadow w-1/4 h-32 m-auto mb-3 leading-snug border-m-8 border-2 border-white" key={index}>
                                <img 
                                alt={post.mainImage.asset.alt}
                                src={post.mainImage.asset.url}
                                className="h-full w-full rounded-r object-cover absolute"/>
                                <Link to={"/post/" + post.slug.current} key={post.slug.current}>    
                                    <span className="block relative h-full flex justify-end items-end pr-1 pb-1">
                                        <h3 className="text-white text-sm font-blog px-9 py-4 bg-gray-900 bg-opacity-75 rounded"> {post.title} </h3>
                                    </span>
                                </Link>
                            </span>
                        ))}
                        <span className="relative rounded shadow w-1/4 h-32 m-auto mb-3 leading-snug border-m-8 border-2 border-white">
                            <Link to="/post">
                                    ------------------- ADS HERE  -------------------
                            </Link>
                        </span>
                        <span className="pt-4 mb-6 h-full">
                            <Link to="/post">
                                    See All
                            </Link>
                        </span>
                    </div>
                </section>
            </div>
            
        </main>
    );
}