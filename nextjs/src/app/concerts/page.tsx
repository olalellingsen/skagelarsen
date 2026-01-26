import React from "react";
import { client } from "@/sanity/client";
import { CONCERTS_QUERY } from "@/app/queries";
import { Concert } from "../types";
import { ConcertCard } from "../components/ConcertCard";

export default async function page() {
  const concerts = await client.fetch<Concert[]>(CONCERTS_QUERY);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingConcerts = concerts.filter((concert) => {
    const concertDate = new Date(concert.date);
    concertDate.setHours(0, 0, 0, 0);
    return concertDate >= today;
  });

  const previousConcerts = concerts.filter((concert) => {
    const concertDate = new Date(concert.date);
    concertDate.setHours(0, 0, 0, 0);
    return concertDate < today;
  });

  return (
    <main className="content">
      {upcomingConcerts.length > 0 && (
        <section>
          <h2>Upcoming concerts</h2>
          <ul>
            {upcomingConcerts.map((concert) => (
              <ConcertCard
                key={concert._id}
                concert={concert}
                upcoming={true}
              />
            ))}
          </ul>
          <br />
        </section>
      )}

      <br />
      {previousConcerts.length > 0 && <h2>Previous concerts</h2>}
      {(() => {
        const concertsByYear = previousConcerts.reduce(
          (acc, concert) => {
            const year = new Date(concert.date).getFullYear();
            if (!acc[year]) acc[year] = [];
            acc[year].push(concert);
            return acc;
          },
          {} as Record<number, Concert[]>,
        );

        const years = Object.keys(concertsByYear)
          .map(Number)
          .sort((a, b) => b - a);

        return years.map((year) => (
          <div key={year}>
            <h3 className="mt-4 font-medium">{year}</h3>
            <ul>
              {concertsByYear[year].map((concert) => (
                <ConcertCard
                  key={concert._id}
                  concert={concert}
                  upcoming={false}
                />
              ))}
            </ul>
          </div>
        ));
      })()}
    </main>
  );
}
