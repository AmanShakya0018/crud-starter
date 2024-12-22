// import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";


async function getposts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error) {
    console.log("Error while fetching data: " + error);
    return [];
  }
}

export default async function Home() {
  const posts = await getposts();

  return (
    <div className="text-lg pt-20 text-white flex flex-row justify-around">
      <div>
        <h1 className="text-4xl text-black font-bold dark:text-white pb-4">All Posts</h1>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (

          posts.map((post) => (
            <div key={post.id} className="mb-4">
              <h2 className="text-2xl text-black font-bold dark:text-white">{post.title}</h2>  {/* Display post title */}
              <p className="text-black dark:text-white">{post.content}</p>  {/* Display post content */}
            </div>
          ))
        )}
      </div>
      <div className="pl-40">
        <div className="flex flex-col space-y-2">
          <Button>
            <Link href="/posts/create">
              Create
            </Link>
          </Button>
          <Button>
            <Link href="/posts/myposts">
              My Posts
            </Link>
          </Button>
        </div>
      </div>
    </div>

  );
}
