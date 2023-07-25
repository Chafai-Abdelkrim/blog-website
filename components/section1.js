import Image from "next/image";
import Link from "next/link";
import Author from "./_child/author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import fetcher from "../lib/fetcher";
import Error from "./_child/error";
import Spinner from "./_child/spinner";

export default function section1() {
  const { data, isLoading, isError } = fetcher("api/trending");

  if (isLoading) return <Spinner></Spinner>;
  if (isError) return <Error></Error>;

  SwiperCore.use([Autoplay]);

  const bg = {
    background: "url('/images/banner.png') no-repeat",
    backgroundPosition: "right",
  };
  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>

        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
        >
          {data.map((value, index) => (
            <SwiperSlide key={index}>
              <Slide data={value}></Slide>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Slide({ data }) {
  const { id, title, category, img, published, description, author } = data;

  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href={`/posts/${id}`} legacyBehavior>
          <a>
            <Image src={img || "/"} width={600} height={600} />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col p-4">
        <div className="cat flex flex-col py-3 pl-4">
          <Link href={`/posts/${id}`} legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              {category || "Unknown"}
            </a>
          </Link>
          <Link href={`/posts/${id}`} legacyBehavior>
            <a className="text-gray-800 hover:text-gray-600">
              {published || "Unknown"}
            </a>
          </Link>
        </div>
        <div className="title text-center md:text-left">
          <Link href={`/posts/${id}`} legacyBehavior>
            <a className="text-2xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">
              {title || "No Title"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3 text-center md:text-left">{description || " No description"}</p>
        {author ? <Author {...author}></Author> : <></>}
      </div>
    </div>
  );
}
