import sanityClient from "@sanity/client"
export default sanityClient({
    projectId: "bc4fzsr5",
    dataset:"production",
    useCdn:false,
    apiVersion: new Date().toISOString().split("T")[0]
})