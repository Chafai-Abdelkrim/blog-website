import Link from "next/link";
import Image from "next/image";
import Author from "./author";
import fetcher from "@/lib/fetcher";
import Spinner from "./spinner";
import Error from "./error";

export default function related() {
  const { data, isLoading, isError } = fetcher("api/popular");

  if (isLoading) return <Spinner></Spinner>;
  if (isError) return <Error></Error>;

  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-3xl py-10">Related</h1>

      <div className="flex flex-col gap-10">
        {data.map((vlaue, index) => (
          <Post key={index} data={vlaue}></Post>
        ))}
      </div>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, published } = data;

  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={`/posts/${id}`}>
          <Image src={img || ""} className="rounded" width={300} height={200} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={`/posts/${id}`} legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              {category || "Unknown"}
            </a>
          </Link>
          <Link href={`/posts/${id}`} legacyBehavior>
            <a className="text-gray-800 hover:text-gray-600">
              - {published || "Unknown"}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${id}`} legacyBehavior>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {title || "No Title"}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
