import React,{ useEffect,useState } from "react"
import { Link } from "react-router-dom";
import sanityClient from "../client.js"

export default function Home() {
    const [postData, setPost] = useState(null);
    useEffect(()=>{
        sanityClient.fetch(`*[_type=="post"] | order(publishedAt desc) {
            title,
            slug,
            publishedAt,
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
        <main className="min-h-screen w-full" >
            <div className="relative min-h-screen w-full ">
                <section className="relative w-full justify-center text-gray-900 text-center">
                    <h1 className="text-6xl text-gray-900 regular-text lg:leading-snug pt-4">...let's &#123;code&#125;</h1>
                </section>
                <section className="relative w-full h-full justify-center text-gray-900 text-center pt-6">
                    <h2 className="text-2xl text-gray-900 regular-text lg:leading-snug">Recent Post</h2>
                    <div className="grid md:grid-cols-auto lg:grid-cols-auto pt-6 text-center">
                        {postData && postData.map((post,index) => (
                            <span className="relative rounded shadow-md h-32 m-auto mb-3 leading-snug border-m-8 border-2 border-gray-100 w-72 md:w-5/12 hover:border-gray-900" key={index}>
                                <img 
                                alt={"img_"+post.slug.current}
                                src={post.mainImage.asset.url}
                                className="h-full w-full rounded-r object-cover absolute"/>
                                <Link to={"/post/" + post.slug.current} key={post.slug.current}>    
                                    <span className="block relative flex">
                                        <h4 className="text-white text-xs font-blog bg-gray-900 bg-opacity-75"> {post.publishedAt.split('T')[0]} </h4>
                                    </span>
                                    <span className="block relative mt-12 flex justify-end items-end pr-1 pb-1">
                                        <h3 className="text-white text-sm font-blog px-9 py-4 bg-gray-900 bg-opacity-75 rounded"> {post.title} </h3>
                                    </span>
                                </Link>
                            </span>
                        ))}
                        <span className="relative rounded shadow mx-auto border-m-8 border-2 border-white ">
                        <iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ez&f=ifr&linkID={{link_id}}&t=ericcabigti0d-20&tracking_id=ericcabigti0d-20" title="ecabigtingamazonaffiliate" scrolling="no" border="0" marginWidth="0" frameBorder="0"></iframe>
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