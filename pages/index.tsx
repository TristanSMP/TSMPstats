import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const Home: NextPage = () => {
  // Use scrollmagic to trigger confetti
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 360,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    });
  }, []);

  return (
    <>
      <Head>
        <title>TSMPstats</title>
      </Head>
      <div>
        {/* Splash */}
        <section className="">
          <div className="flex flex-col items-center justify-center h-screen">
            <img
              className="hover:scale-110 transition-all duration-500 ease-in-out hover:drop-shadow-2xl rounded-full"
              src="/images/TLogo.gif"
              alt="Splash"
              width={250}
              height={352}
            />
            <div className="py-8 text-center text-white text-3xl px-10 m-10 font-extrabold">
              <p>
                <span className="text-transparent text-4xl bg-clip-text bg-gradient-to-tr from-[#0011ff] to-[#00aeff] hover:text-[#000000] transition-all">
                  TSMP
                </span>{" "}
                stats coming{" "}
                <span className="text-transparent text-4xl bg-clip-text bg-gradient-to-tr from-[#8400ff] to-[#ff00d4] drop-shadow hover:text-[#000000] hover:text-5xl transition-all">
                  soon
                </span>
              </p>
            </div>
            <FontAwesomeIcon
              icon={fas.faArrowAltCircleDown}
              size="3x"
              className="text-white animate-pulse cursor-pointer"
              onClick={() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: "smooth",
                });
              }}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
