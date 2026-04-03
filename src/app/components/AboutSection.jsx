"use client";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";
import Image from "next/image";

const TAB_DATA = [
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className='list-disc pl-2 '>
        <li>
          <h3 className='text-md font-bold'>Senoir Full Stack Engineer (Dec 2025 - Present)</h3>
          <p className='text-sm font-light'>
            Inception a G42 Company
          </p>
          <p className='text-xs font-extralight'>Abu Dhabi, United Arab Emirates</p>
        </li>

        <li>
          <h3 className='text-md font-bold'>Senoir Full Stack Engineer (Jul 2021 - Nov 2025)</h3>
          <p className='text-sm font-light'>
            Digital Qube Marketing Consultancy (formerly eWavelength Digital Marketing)
          </p>
          <p className='text-xs font-extralight'>Abu Dhabi, United Arab Emirates</p>
        </li>
        <li>
          <h3 className='text-md font-bold'>Lead - Senior Full Stack Developer (Aug 2017 - Jun 2021)</h3>
          <p className='text-sm font-light'>Brixio (formerly ITFAQ Softwares)</p>
          <p className='text-xs font-extralight'>Dubai, United Arab Emirates</p>
        </li>
        <li>
          <h3 className='text-md font-bold'>Full Stack Web Developer (Jun 2014 - Jul 2017)</h3>
          <p className='text-sm font-light'>Al Dhafra Private Schools</p>
          <p className='text-xs font-extralight'>Abu Dhabi, United Arab Emirates</p>
        </li>
        <li className='underline last:list-none mt-4'>
          <a href='/EricThomasDizonCabigting.pdf' target='_blank' download='/EricThomasDizonCabigting.pdf'>
            View full Resume
          </a>
        </li>
      </ul>
    ),
  },
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className='list-disc pl-2'>
        <li> RAG, MCP, LLMs</li>
        <li> Python, Go Lang, C#, JavaScript, SQL, CSS, PHP, TypeScript, HTML</li>
        <li> ASP.NET Core, .NET Framework, NestJS, NextJS, Echo, Fibre, Gin, ASP.NET Web API, Umbraco, Sitecore</li>
        <li> React, jQuery, VueJS, NodeJS, ExpressJS, React Native, Redux</li>
        <li> Git, Docker, VSCode, Visual Studio, npm, shadcn/ui, Node, Neovim</li>
        <li> AWS, Microsoft Azure, Netlify, Vercel, Kubernetes (K8s), Docker</li>
        <li> MSSQL, MySQL, PostgreSQL, MongoDB, CosmosDB, DynamoDB</li>
        <li> OpenID, OAuth, JWT, Single Sign-On (SSO), Authorization, Authentication</li>
        <li> Database Migration, Backup and Restore</li>
        <li> Project Management, Communication, Leadership, Organization, Problem-solving</li>
        <li>Fullstack Web Development</li>
        <li>HTML, JS, CSS</li>
        <li>Rest API</li>
        <li>NodeJS, C#, .net</li>
        <li>React, NextJS, Angular</li>
        <li>PostgreSQL,MSSQL, MySQL, MongoDB</li>
        <li>AWS, Microsoft Azure, Netlify, Vercel</li>
        <li>Git, Docker, npm, shadcn/ui</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className='list-disc pl-2'>
        <li>
          <h3 className='text-md font-black'>Bachelor of Science in Computer Science </h3>
          <p className='text-sm font-bold'>Angeles University Foundation </p>
          <p className='text-xs font-light'>Angeles City, Philippines</p>
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("experience");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  return (
    <section className='text-white'>
      <div className='m-2 md:grid md:grid-cols-2 gap-4 items-center py-8 px-4 xl:gap-8 sm:py-16 xl:px-16'>
        <Image
          alt='coding'
          src='/images/aboutme-image2.webp'
          width={400}
          height={400}
          className='max-auto place-self-center'
        />
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
          <h2 className='text-4xl font-bold text-white mt-4 mb-4' id='about'>
            about me
          </h2>
          <p className='text-base md:text-lg mb-3'>
            {/* Hey there! I&apos;m Eric, a Lead full-stack developer with a deep understanding of software development. I have spent over a decade crafting efficient, scalable applications using a diverse range of technologies, including Golang, C#.NET, TypeScript, JavaScript, and ReactJS. My expertise extends to databases like PostgreSQL, MongoDB, MSSQL, and MySQL, ensuring I can handle data management with precision. From writing clean code to overseeing seamless deployments, I&apos;m committed to delivering high-quality software solutions. */}
            Hey there! I am Eric, an Engineering Lead at the intersection of high-scale backend architecture and Sovereign AI innovation. Currently at Inception (G42), I lead the development of intelligent, context-aware systems—leveraging LLMs, RAG, and MCP to bridge the gap between enterprise data and foundational models. With over a decade of experience across Python, TypeScript, Go, and C#, I specialize in architecting secure, high-availability platforms that turn complex data into actionable intelligence. I do not just ship code; I build the infrastructure for the next generation of AI.
          </p>

          <p className='text-base md:text-lg'>
            Throughout my career, I&apos;ve had the privilege of working on projects across various industries, including government, hospitality, and e-commerce. This diverse experience has allowed me to develop a strong understanding of different business needs and tailor my approach accordingly. Whether it&apos;s building secure systems for government agencies, creating user-friendly interfaces for hospitality businesses, or optimizing online platforms for e-commerce, I am equipped to deliver solutions that drive results.
          </p>

          <div className='flex flex-row mt-8'>
            <TabButton selectTab={() => handleTabChange("experience")} active={tab === "experience"}>
              {" "}
              Experience{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange("skills")} active={tab === "skills"}>
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange("education")} active={tab === "education"}>
              {" "}
              Education{" "}
            </TabButton>
          </div>
          <div className='mt-8'>{TAB_DATA.find((t) => t.id === tab).content}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
