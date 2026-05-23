import Reveal from "./Reveal";

export default function ClubIntro() {
  return (
    <section className="club_intro" id="club-intro">
      <div className="club_intro_left">
        <Reveal>
          <span className="club_intro_brand">
            Спортклуб Баки · Бокс / ММА / Муай-тай
          </span>
        </Reveal>

        <Reveal>
          <h1 className="club_intro_heading">
            Дневник <em>дисциплины</em><br />бойца.
          </h1>
        </Reveal>

        <Reveal>
          <div className="club_intro_columns">
            <p>
              Каждый закрашенный день — это вечер,
              проведённый в зале, в ринге или в работе
              над собой. Тихо. Без шума. Без бейджей.
            </p>
            <p>
              Сетка не считает шаги и не выдаёт медали.
              Она просто помнит, в каком ты ритме —
              чтобы ты помнил тоже.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="club_intro_right">
          <img src="/gym.png" alt="Зал клуба Баки" className="club_intro_photo" />
          <span className="club_intro_caption">ЗАЛ · 21:30</span>
        </div>
      </Reveal>
    </section>
  );
}
