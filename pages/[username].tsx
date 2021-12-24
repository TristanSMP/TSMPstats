import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState, Fragment, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { getUUIDFromUsername } from "../utils/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Guild {
  avatar_url: string;
  guild_id: string;
  name: string;
}
type mcmmoData = {
  repair: number;
  fishing: number;
  axes: number;
  swords: number;
  powerLevel: number;
  alchemy: number;
  Herbalism: number;
  mining: number;
  error: boolean;
  acrobatics: number;
  woodcutting: number;
  excavation: number;
  unarmed: number;
  archery: number;
  taming: number;
};

export async function getServerSideProps(context: {
  query: { username: string };
}) {
  return {
    props: {
      username: context.query.username,
      mcmmoData: await axios
        .get<mcmmoData>(
          `http://localhost:3000/api/mcmmo?uuid=${await getUUIDFromUsername(
            context.query.username
          )}`
        )
        .then((res) => res.data),
    }, // will be passed to the page component as props
  };
}

const Username: NextPage = (props) => {
  const mcmmoData = props.mcmmoData;
  const username = props.username;

  return (
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
          {username}
        </div>
        <div className="py-8 text-center text-white text-3xl px-10 m-10 font-extrabold">
          powerLevel: {mcmmoData?.powerLevel}
        </div>
      </div>
    </section>
  );
};

export default Username;
