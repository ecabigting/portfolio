import React, { useEffect,useState } from "react"
import { Link } from "react-router-dom";
import sanityClient from "../client.js"

export default function Post() {
    const [postData, setPost] = useState(null);
    useEffect(()=>{
        sanityClient.fetch(`*[_type=="post"] | order(publishedAt desc) {
            title,
            slug,
            mainImage{
                asset->{
                    _id,
                    url,
                },
                alt
            }
        }`)
        .then((data)=> setPost(data))
        .catch((console.error))
    },[])
    return(
        <main className="bg-gray-100 min-h-screen p-12">
            <section className="contain mx-auto">
                <h1 className="text-5xl flex justify-center regular-text">Posts</h1>
                <h2 className="text-lg text-gray-500 flex justify-center mb-12">Mostly about code and tech stuff I encounter at work everyday..</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <article>
                        <span className="block h-64 relative rounded shadow bg-white border-l-8 border-gray-800">
                            <span className="block relative h-full flex justify-end">
                            <iframe 
                            title="ecabigtingamazonaffiliate"
                            src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ez&f=ifr&linkID={{link_id}}&t=ericcabigti0d-20&tracking_id=ericcabigti0d-20" 
                            width="300" 
                            height="250" 
                            scrolling="no" 
                            border="0" 
                            frameBorder="0"></iframe>
                            </span>
                        </span>
                    </article>
                    {postData && postData.map((post,index) => (
                        <article key={index}>
                            <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                                <span className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-gray-800">
                                    <img 
                                    alt={"img_"+post.slug.current}
                                    src={post.mainImage.asset.url}
                                    className="w-full h-full rounded-r object-cover absolute"/>
                                    <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                                        <h3 className="text-white text-lg font-blog px-9 py-4 bg-gray-900 bg-opacity-75 rounded"> {post.title} </h3>
                                    </span>
                                </span>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}