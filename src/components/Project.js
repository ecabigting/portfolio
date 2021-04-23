import React,{useEffect, useState} from "react"
import sanityClient from "../client"

export default function Project() {
    const [projectData, setProjectData ] = useState(null);
    useEffect(()=>{
        sanityClient.fetch(`*[_type == "project"]{
            title,
            date,
            role,
            technologies,
            company,
            description,
            projectType,
            link,
            tags
        }`)
        .then((data)=>setProjectData(data))
        .catch(console.error);
    },[])
    return (
        <main className="bg-gray-100 min-h-screen p-12">
            <section className="contain mx-auto">
                <h1 className="text-5xl flex justify-center regular-text">Projects</h1>
                <h2 className="text-lg text-gray-500 flex justify-center mb-12">Projects I worked over the span of my career.</h2>
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectData && projectData.map((project,index)=>(
                        <article className="block h-128 p-8 relative rounded shadow leading-snug bg-white border-l-8 border-gray-800" key={index}>
                            <h3 className="text-gray-800 font-bold mb-2 hover:underline">
                                <a href={project.link} alt={project.title} target="_blank" rel="noopener noreferrer">{project.title}</a>
                            </h3>
                            <div className="text-gray-500 text-sm space-x-4 mb-2">
                                <span>
                                    <strong className="font-bold">Company:</strong>
                                    {" "}
                                    {project.company}
                                </span>
                            </div>
                            <div className="text-gray-500 text-xs space-x-4">
                                <span>
                                    <strong className="font-bold">Finished on:</strong>
                                    {" "}
                                    {new Date(project.date).toLocaleDateString()}
                                </span>
                                <span>
                                    <strong className="font-bold">Type:</strong>
                                    {" "}
                                    {project.projectType}
                                </span>
                                <span>
                                    <strong className="font-bold">Role:</strong>
                                    {" "}
                                    {project.role}
                                </span>
                                <p className="my-6 text-sm text-gray-700 leading-relaxed">
                                    {project.description.substring(0,200)} {"..."}
                                </p>
                                <a href={project.link} alt={project.title} target="_blank" rel="noopener noreferrer" className="text-gray-500 font-bold hover:underline">
                                    View The Project{" "}
                                    <span></span>
                                </a>
                            </div>
                            <div className="text-gray-500 text-xs mt-7">
                                {" "}
                                <span>
                                    {project.technologies && project.technologies.map((tech,index)=>(
                                        <span className="inline-flex items-center px-2 mr-1 mt-1 border border-gray-300 rounded-md text-gray-700 bg-white">{tech}</span>
                                    ))}
                                </span>
                            </div>
                        </article>
                    ))}
                </section>
            </section>
        </main>
    );
}