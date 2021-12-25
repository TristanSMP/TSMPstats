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

const Verify: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [mcmmoData, setmcmmoData] = useState<mcmmoData>();
  const [loading, setLoading] = useState(true);
  const [fake, setFake] = useState(false);
  const [noExists, setNoExists] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      async function handleRequests() {
        const username = router.query.username as string;
        const uuid = await getUUIDFromUsername(username);
        if (uuid) {
          const mcmmo = await axios.get<mcmmoData>(`/api/mcmmo?uuid=${uuid}`);
          if (mcmmo.data.powerLevel) {
           setmcmmoData(mcmmo.data);
            setUsername(username);
          } else {
           

setNoExists(true);

          }

          setLoading(false);
        } else {
          setFake(true);
        }
      }
      handleRequests();
    }
  }, [router.isReady, router]);

  while (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blurple" />
      </div>
    );
  }

  while (fake) {
    return (
      <div className="flex justify-center items-center">
        Hey it seems like this username doesn&apos;t exist.
      </div>
    );
  }

  while (noExists) {
    return (
      <div className="flex justify-center items-center">
        Hey it seems like this username doesn&apos;t exist.
      </div>
    );
  }

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

export default Verify;
