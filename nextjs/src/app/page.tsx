import { HOME_QUERY } from "./queries";
import { client, urlForImage } from "../sanity/client";
import Image from "next/image";
import { HomePage } from "./types";
import PortableTextSection from "./components/PortableTextSection";
import InstagramComponent from "./components/InstagramComponent";

export default async function IndexPage() {
  const home = await client.fetch<HomePage>(
    HOME_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <article className="content flex flex-col items-center">
      {home.image && (
        <Image
          src={urlForImage(home?.image).url()}
          alt="Home Image"
          width={600}
          height={400}
        />
      )}
      <section className="w-full min-h-32">
        <PortableTextSection
          content={{ _type: "richText", content: home.richText }}
        />
      </section>

      <InstagramComponent />
    </article>
  );
}
