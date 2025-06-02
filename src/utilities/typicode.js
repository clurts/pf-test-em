import queryClient from "./queryClient"
queryClient
// ! Uden tanstack:
// export async function getProjects() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users')
//     if(!response.ok){
//         throw new Error('Network response was not ok')
//     }
//     return response.json()
// }

// //! Med tanstack:
export async function getProjects() {
    return queryClient.fetchQuery({
        queryKey: ['users'],
        queryFn: async function () {
            const response = await fetch('/data.json')
            if (!response.ok) {
                throw new Error('Response was not ok')
            }
            return response.json()
        }
    })
}


export async function getProject({ params }) {
    const response = await fetch(`/data.json/${params.title}`)
    if (!response.ok) {
        throw new Error('Response was not ok')
    }
    return response.json()
}