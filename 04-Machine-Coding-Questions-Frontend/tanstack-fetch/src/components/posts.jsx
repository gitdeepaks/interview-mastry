import { useQuery } from "@tanstack/react-query"

export const Posts = ()=>{
    const {isLoading,error,data} = useQuery({
        queryKey:['posts'],
        queryFn:()=>fetch('https://jsonplaceholder.typicode.com/posts').then(res=>res.json())
    })

    if (isLoading) {
        return <div className="">loading...</div>
        
    }

    if (error) {
        return <div className="">Error....</div>
    }

    
    return <div className="">
        <h1>Posts</h1>
        <ul>
            {data.map(post=>(
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    </div>
}