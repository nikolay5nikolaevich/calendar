export default function Footer() {
  return (
    <footer className="site_footer">
      <div className="footer_top">
        <div className="footer_brand">
          <span className="footer_logo">habit<em>·</em>grid</span>
          <span className="footer_sub">Спортклуб Баки</span>
        </div>

        <nav className="footer_nav" aria-label="Футер-навигация">
          <a href="/" className="footer_link">Трекер</a>
          <a href="/progress" className="footer_link">Прогресс</a>
          <a href="#tracker" className="footer_link">Добавить привычку</a>
          <a href="#coach-roster" className="footer_link">Тренеры</a>
        </nav>

        <address className="footer_contacts">
          <span className="footer_contacts_label">Контакты</span>
          <a href="tel:+73812453310" className="footer_contact_item">
            +7 (3812) 45-33-10
          </a>
          <a href="mailto:baki@habitgrid.ru" className="footer_contact_item">
            baki@habitgrid.ru
          </a>
          <span className="footer_contact_item footer_address">
            Омск, ул. Маршала Жукова, 21
          </span>
        </address>
      </div>

      <div className="footer_bottom">
        <span className="footer_copy">© 2026 HabitGrid — Спортклуб Баки. Все права защищены.</span>
        <span className="footer_tagline">Каждый день — это выбор.</span>
      </div>
    </footer>
  );
}
