"use client";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { PortableText } from "@portabletext/react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import React, { useEffect, useState } from "react";
import { getImageDimensions } from "@sanity/asset-utils";
import Link from "next/link";

const query = `*[_type == "post"][0...10]
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
	useCdn: true, // set to `false` to bypass the edge cache
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
});

const builder = imageUrlBuilder(client);

const urlFor = (source) => {
	return builder.image(source).height(500).width(1920).format("webp").fit("crop").url();
};

const portComp = {
	types: {
		image: ({ value, isInline }) => {
			const { width, height } = getImageDimensions(value);
			return (
				<img
					src={builder.image(value).url()}
					alt={value.alt || " "}
					loading='lazy'
					className={`my-2 md:my-8 mx-auto ${isInline ? "max-w-xs" : "w-full sm:w-1/2"} shadow-lg`}
					style={{ aspectRatio: width / height }}
				/>
			);
		},
	},
	block: {
		h1: ({ children }) => <h1 className='text-4xl font-bold my-4'>{children}</h1>,
		h2: ({ children }) => <h2 className='text-3xl font-bold my-4'>{children}</h2>,
		h3: ({ children }) => <h3 className='text-2xl font-bold my-4'>{children}</h3>,
		blockquote: ({ children }) => (
			<blockquote className='border-l-4 pl-4 my-4 italic text-gray-700 border-gray-300'>{children}</blockquote>
		),
		normal: ({ children }) => <p className='text-sm md:text-md my-4 text-justify'>{children}</p>,
	},
	list: {
		bullet: ({ children }) => <ul className='list-disc ml-8 my-4'>{children}</ul>,
		Number: ({ children }) => <ol className='list-decimal ml-8 my-4'>{children}</ol>,
		li: ({ children }) => <li className='mb-2'>{children}</li>,
	},
	listItem: {
		bullet: ({ children }) => <li className='text-xs'>{children}</li>,
		checkmarks: ({ children }) => <li className='text-xs'>{children}</li>,
	},
	marks: {
		link: ({ children, value }) => {
			const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
			return (
				<Link href={value.href} rel={rel} className='text-blue-500 hover:text-blue-700'>
					{children}
				</Link>
			);
		},
	},
};

export default function BlogList({ params: { slug } }) {
	const [postData, setPost] = useState();
	const [loadingContentErrorMsg, setLoadingContentErrorMsg] = useState("");
	const [isLoadingContent, setIsLoadingContent] = useState(true);

	useEffect(() => {
		client
			.fetch(
				`*[_type == "post" && slug.current == '${slug}']
					{
						title,
						publishedAt,
						"authorName":author->name,
						"authorImage":author->image.asset->url,
						"postImage":mainImage.asset->url,
						body,
					}`
			)
			.then((result) => {
				setPost(result[0]);
				setIsLoadingContent(false);
			})
			.catch((err) => {
				console.log(`error: ${err}`);
				setPost(null);
				setLoadingContentErrorMsg(err?.toString());
				setIsLoadingContent(false);
			});

		return () => {
			setIsLoadingContent(false);
		};
	}, []);
	return (
		<section id='post' className='bg-gray-20'>
			<div className='mx-auto w-5/6 flex flex-col'>
				{isLoadingContent === false && loadingContentErrorMsg === "" && postData !== undefined && (
					<div className='mx-auto w-full pb-4'>
						<img src={urlFor(postData.postImage)} className='' />
						<h1 className='text-2xl pt-3'>{postData.title}</h1>
						<div className='flex justify-start space-x-2 py-3'>
							<CalendarIcon className='size-4' />
							<p className='italic font-light text-xs'>{new Date(postData.publishedAt).toDateString()}</p>
							<img src={postData.authorImage} className='rounded-full size-4 ' />
							<p className='italic font-light text-xs'>{postData.authorName}</p>
						</div>
						<PortableText value={postData.body} components={portComp} />
					</div>
				)}
			</div>
		</section>
	);
}
