import { useState } from "react";
import Reveal from "./Reveal";

const COACHES = [
  {
    id: "belyaev",
    name: "Игорь Беляев",
    role: "Бокс · КМС",
    photo: "/coaches/coach-1.jpg",
    last: "беляев",
  },
  {
    id: "kasyanov",
    name: "Артём Касьянов",
    role: "ММА · BJJ purple",
    photo: "/coaches/coach-2.jpg",
    last: "касьянов",
  },
  {
    id: "tagirov",
    name: "Руслан Тагиров",
    role: "Муай-тай · клинч",
    photo: "/coaches/coach-3.jpg",
    last: "тагиров",
  },
];

function CoachCard({ coach }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="coach_card">
      <span className="coach_stamp" aria-hidden="true" />
      <div className="coach_photo_wrap">
        {!failed ? (
          <img
            src={coach.photo}
            alt={coach.name}
            className="coach_photo"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="coach_fallback" aria-hidden="true">
            <span>{coach.last}</span>
          </div>
        )}
      </div>
      <div className="coach_info">
        <span className="coach_name">{coach.name}</span>
        <span className="coach_role">{coach.role}</span>
      </div>
    </article>
  );
}

export default function CoachRoster() {
  return (
    <Reveal>
      <section className="coach_roster" id="coach-roster">

        <h2 className="coach_roster_heading">
          Всегда можем поработать <em>вживую</em>.
        </h2>
        <p className="coach_roster_sub">
          Заходите в зал — найдём пару, разберём технику, поставим удар.
          Карточка ниже — это не сайт-визитка. Это запись на встречу.
        </p>
        <div className="coach_grid">
          {COACHES.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </section>
    </Reveal>
  );
}
