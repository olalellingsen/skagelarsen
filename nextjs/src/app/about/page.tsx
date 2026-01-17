import { client } from "@/sanity/client";
import React from "react";
import type { About } from "../types";
import PortableTextSection from "../components/PortableTextSection";

async function About() {
  const data = await client.fetch<About>(
    `*[_type == "about"][0]{
      richText
    }`,
    {},
    { next: { revalidate: 60 } }
  );
  return (
    <main className="content">
      <h1>About</h1>
      <PortableTextSection
        content={{ _type: "richText", content: data.richText }}
      />
    </main>
  );
}

export default About;