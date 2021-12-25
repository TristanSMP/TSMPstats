import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState, Fragment, useRef, Component } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { getUUIDFromUsername } from "../utils/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mcmmo from "./api/mcmmo";
import skinview3d from "skinview3d";
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

const skillNameMap = {
  repair: "Repair",
  fishing: "Fishing",
  axes: "Axes",
  swords: "Swords",
  powerLevel: "Power Level",
  alchemy: "Alchemy",
  Herbalism: "Herbalism",
  mining: "Mining",
  acrobatics: "Acrobatics",
  woodcutting: "Woodcutting",
  excavation: "Excavation",
  unarmed: "Unarmed",
  archery: "Archery",
  taming: "Taming",
};

const User: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [mcmmoData, setmcmmoData] = useState<mcmmoData>();
  const [loading, setLoading] = useState(true);
  const [fake, setFake] = useState(false);
  const [noExists, setNoExists] = useState(false);
  const [uuid, setUUID] = useState("");
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
            setUUID(uuid);
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
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blurple drop-shadow-2xl" />
      </div>
    );
  }

  while (fake) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white text-4xl drop-shadow-2xl">
        Hey it seems like this username doesn&apos;t exist.
      </div>
    );
  }

  while (noExists) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white text-4xl drop-shadow-2xl">
        Hey it seems like this username doesn&apos;t exist.
      </div>
    );
  }

  return (
    <>
      <head>
        <title>{username} - TSMPstats</title>
        <meta property="uuid" content={uuid} />
      </head>

      <section className="">
        <div className="flex items-center justify-center h-screen">
          <div className="py-8 text-center text-white text-3xl px-10 m-10 font-extrabold">
            <canvas
              id="skinviewer"
              className="w-full h-full"
              ref={(canvas) => {
                let skinViewer = new skinview3d.SkinViewer({
                  canvas: canvas!,
                  width: 300,
                  height: 400,
                  skin: `https://crafatar.com/skins/${uuid}`,
                });

                // Control objects with your mouse!
                let control = skinview3d.createOrbitControls(skinViewer);
                control.enableRotate = true;
                control.enableZoom = false;
                control.enablePan = false;

                // Add an animation
                let walk = skinViewer.animations.add(
                  skinview3d.WalkingAnimation
                );
                // Add another animation
                // And run for now!
                let run = skinViewer.animations.add(
                  skinview3d.RunningAnimation
                );

                // Set the speed of an animation
                run.speed = 0.5;
              }}
            />
            {username}
          </div>
          <div className="relative flex flex-col min-w-0 rounded-lg break-words bg-gray-900 ">
            <div className="py-3 px-6 mb-0 bg-gray-200 rounded-t-lg text-gray-900">
              <strong>McMMO Stats</strong>
            </div>
            <div className="flex-auto p-8 py-1 bg-gray-800">
              {
                // for every skill in the mcmmo data object we create a div with the skill name and the skill level
                Object.keys(mcmmoData!).map((skill) => {
                  if (skill == "error") {
                    return;
                  }

                  return (
                    <>
                      <div className="flex flex-wrap no-gutters items-center">
                        <div className="relative flex-grow max-w-full flex-1 px-8 lg:order-1 pr-4 pl-4 text-gray-300">
                          <p>{skillNameMap[skill]}:</p>
                        </div>
                        <div
                          className="w-full lg:order-2 relative lg:flex-grow lg:flex-1"
                          style={{ fontSize: "90%" }}
                        >
                          <p className="text-gray-900 font-extrabold text-xl font-mono">
                            {mcmmoData![skill] > 0 ? mcmmoData![skill] : "-"}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
