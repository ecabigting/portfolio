import { CalendarIcon } from "@heroicons/react/20/solid";
import { PortableText } from "@portabletext/react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import React from "react";
import { getImageDimensions } from "@sanity/asset-utils";
import Link from "next/link";
import CodeBlock from "@/app/components/CodeBlock";
export const dynamic = 'force-dynamic'
let postData = undefined;
let loadingContentErrorMsg = "";
let isLoadingContent = true;
const query = (slug) => {
  return `*[_type == "post" && slug.current == '${slug}']
					{
						title,
						publishedAt,
						"authorName":author->name,
						"authorImage":author->image.asset->url,
						"postImage":mainImage.asset->url,
						body,
					}`;
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: new Date().toISOString().split('T')[0],
});

const builder = imageUrlBuilder(client);

const urlFor = (source, h, w) => {
  return builder.image(source).height(h).width(w).format("webp").fit("crop").url();
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
    code: ({ value }) => {
      const { language, code } = value;
      return <CodeBlock language={language} value={code} />;
    },
  },
  block: {
    h1: ({ children }) => <h1 className='text-4xl font-bold my-4'>{children}</h1>,

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

export async function generateMetadata({ params }) {
  const theSlug = params.slug;
  postData = await client.fetch(query(theSlug), { next: { revalidate: 1800 } });
  let foundPBody = postData[0].body
    .filter((findP) => {
      return (
        findP.style === "normal" &&
        findP._type === "block" &&
        findP.listItems === undefined &&
        findP.children !== undefined &&
        findP.children.find((obj) => {
          return obj.text.length > 10 && obj.marks.length === 0;
        })
      );
    })
    .find((obj) => obj !== false && obj !== undefined)
    .children.map((txt) => txt.text)
    .join(" ")
    .substr(0, 150);
  // console.dir(foundPBody, { dept: null });
  return {
    metadataBase: new URL("https://ericcabigting.dev"),
    alternates: {
      canonical: "/",
    },
    title: postData[0].title + " | ecabigting",
    images: [
      {
        url: urlFor(postData[0].postImage, 600, 800),
        width: 800,
        height: 600,
      },
    ],
    description: foundPBody,
    openGraph: {
      title: postData[0].title + " | ecabigting",
      description: foundPBody,
      url: `https://ericcabigting.dev/blog/${theSlug}`,
      siteName: "ecabigting - fullstack dev",
      images: [
        {
          url: urlFor(postData[0].postImage, 600, 800),
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

const BlogList = async ({ params: { slug } }) => {
  try {
    postData = await client.fetch(query(slug));
    isLoadingContent = false;
  } catch (eerr) {
    console.log(eerr);
    isLoadingContent = false;
    loadingContentErrorMsg = JSON.stringify(eerr);
  }

  return (
    <section id='post' className='bg-gray-20'>
      <div className='mx-auto w-5/6 flex flex-col'>
        {isLoadingContent === false && loadingContentErrorMsg === "" && postData !== undefined && (
          <div className='mx-auto w-full pb-4'>
            <img src={urlFor(postData[0].postImage, 500, 1920)} className='' />
            <h1 className='text-2xl pt-3'>{postData[0].title}</h1>
            <div className='flex justify-start space-x-2 py-3'>
              <CalendarIcon className='size-4' />
              <p className='italic font-light text-xs'>{new Date(postData[0].publishedAt).toDateString()}</p>
              <img src={postData[0].authorImage} className='rounded-full size-4 ' />
              <p className='italic font-light text-xs'>{postData[0].authorName}</p>
            </div>
            <PortableText value={postData[0].body} components={portComp} />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
