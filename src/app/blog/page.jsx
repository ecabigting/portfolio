"use server";
import React from "react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

const query = `*[_type == "post" && !(_id in path("drafts.**"))][0...30] | order(publishedAt desc)
	 		{
	             title,
	             publishedAt,categories,
	             "postSlug":slug.current,
	             "postImage":mainImage.asset->url,
	             "authorName":author->name,
	             "authorImage":author->image.asset->url
	         }`;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: new Date().toISOString().split('T')[0],
});
const builder = imageUrlBuilder(client);

const Blog = async () => {
  let postData = undefined;
  let loadingContentErrorMsg = "";
  let isLoadingContent = true;
  try {
    postData = await client.fetch(query);
    isLoadingContent = false;
  } catch (eerr) {
    console.log(eerr);
    isLoadingContent = false;
    loadingContentErrorMsg = JSON.stringify(eerr);
  }
  return (
    <section id='blog' className='bg-gray-20'>
      <div className='bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-orange-900 to-transparent rounded-full h-80 w-80 z-0 top-32 blur-lg absolute transform -translate-x-1/2 -translate-1/2 -right-10'></div>
      <div className='mx-auto w-full grid h-44 justify-center content-center bg-primary-100'>
        <h1 className='text-3xl font-black text-white'>BLOG</h1>
      </div>
      <div className='mx-auto w-5/6 grid grid-cols-1 md:grid-cols-3 justify-start content-center py-5 gap-6'>
        {isLoadingContent === false &&
          loadingContentErrorMsg === "" &&
          postData !== undefined &&
          postData.map((post, index) => {
            return (
              <div key={index} className='w-full rounded-md border-2 border-slate-400 relative'>
                <div className='md:shrink-0'>
                  <img className='object-cover w-full h-[100px] lg:h-[200px]' src={urlFor(post.postImage)} />
                </div>
                <div className='p-2 min-h-[150px]'>
                  <p className='font-extralight italic text-xs flex '>
                    <CalendarDaysIcon className='size-4 mr-2 text-color text-gray-400' />
                    {new Date(post.publishedAt).toDateString()}
                  </p>
                  <h2 className='text-sm py-2'>{post.title}</h2>
                  {/* <p className='font-extralight italic text-xs py-3'>{post.authorName}</p> */}
                </div>
                <div className='w-full bg-gray-400 flex bottom-0 absolute'>
                  <Link className='ml-3 p-1 text-xs text-white underline' href={`/blog/${post.postSlug}`}>
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

function urlFor(source) {
  return builder.image(source).height(200).width(300).format("webp").fit("crop").url();
}

export default Blog;
