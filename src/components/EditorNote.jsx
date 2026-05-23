import Reveal from "./Reveal";

export default function EditorNote() {
  return (
    <Reveal>
      <section className="editor_note" id="editor-note">

        <h2 className="editor_note_heading">
          Никаких <em>очков</em>. Никаких стриков напоказ.
        </h2>
        <div className="editor_note_columns">
          <p>
            HabitGrid — это не игра. Здесь нет уровней, нет наград,
            нет мотивационных всплесков. Только сетка, которая помнит,
            как ты прожил день.
          </p>
          <p>
            Закрашенная клетка — не победа. Это просто вечер,
            прошедший в согласии с тем, кем ты хочешь быть.
            Пустая — не поражение. Это просто факт.
          </p>
        </div>
      </section>
    </Reveal>
  );
}
