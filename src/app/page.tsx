import { CarouselHome } from "@/components/common/carrousel/CarouselHome";
import { Faq } from "@/components/home/Faq";
import { HomeLayout } from "@/components/layouts/HomeLayout";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Home() {
  return (
    <HomeLayout>
      <>
        <div className="w-full  bg-white relative min-h-screen">
          <main
            className="flex w-full min-h-screen flex-col items-center justify-start md:p-24 p-16 bg-hero bg-cover bg-no-repeat bg-top aspect-video  bg-s
              z-10
              relative
              overflow-hidden before:content-['']
              before:absolute
              before:inset-0
              before:block
              before:bg-black
              
              before:opacity-75
              before:z-[-5] max-w-9xl mx-auto
            "
            style={{
              backgroundSize: "1600px 1600px",
              backgroundPosition: "center -300px",
            }}
          >
            <div className="flex flex-col w-full xl:max-w-6xl ">
              <div className="z-10 max-w-5xl w-full items-center justify-center lg:flex py-5"></div>
              <div className="flex flex-col items-center pt-24">
                <p
                  className="md:text-8xl font-black font-titleVariant text-4xl text-center text-white"
                  style={{
                    lineHeight: "1.1",
                    letterSpacing: "0.02em",
                    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <br />
                </p>
                <p className="w-full max-w-7xl text-center text-balance text-2xl text-white/80 shadow-md drop-shadow-md font-bold font-paragraph">
                  Está diseñado para brindarte una solución integral para tus
                  necesidades de intercambio de criptomonedas.
                </p>
                <Link
                  href="/register"
                  className="w-full max-w-[300px] py-4 mt-5 text-xl text-center font-semibold text-black bg-primary rounded-md font-paragraph"
                >
                  ¡ÚNETE AHORA!
                </Link>
              </div>
            </div>
          </main>
        </div>
      </>
    </HomeLayout>
  );
}
