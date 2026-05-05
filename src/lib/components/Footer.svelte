<footer class="site-footer">
  <div class="footer-divider"></div>

  <div class="footer-grid">
    <div class="footer-column">
      <h4>CONTACT</h4>
      <p>Calle 58 # 55 - 24A Barranquilla - Colombia</p>

      <h5>Admission Process</h5>
      <p>Mobile (+57) 314 8962734</p>
      <p>Email promocion@ul.edu.co</p>

      <h5>Transfer and Re-entry Process</h5>
      <p>Mobile (+57) 317 6688650</p>
      <p>Email kilarioss@ul.edu.co</p>
    </div>

    <div class="footer-column">
      <h4>USEFUL LINKS</h4>
      <a href="/">Directory</a>
      <a href="/">Data Protection Policy</a>
      <a href="/">DIAN Information</a>
      <a href="/">Audiovisual Room Booking</a>
      <a href="/">User Support</a>
      <a href="/">Psychological Counseling</a>
      <a href="/">Tutoring Request</a>
    </div>

    <div class="footer-column">
      <h4>ACADEMIC OFFER</h4>
      <a href="/">Professional Programs</a>
      <a href="/">Technology Programs</a>
      <a href="/">Preparatory Cycles</a>
    </div>
  </div>

  <div class="footer-divider bottom"></div>

  <div class="footer-social">
    <a href="/" aria-label="Facebook" class="social-link" title="Facebook">f</a>
    <a href="/" aria-label="Instagram" class="social-link" title="Instagram">◎</a>
    <a href="/" aria-label="WhatsApp" class="social-link" title="WhatsApp">☎</a>
    <a href="/" aria-label="YouTube" class="social-link" title="YouTube">▶</a>
  </div>
</footer>

<style>
  .site-footer {
    background: #05070d;
    color: #f8fafc;
    padding: 64px 24px 42px;
    border-top: 1px solid rgba(148, 163, 184, 0.18);
  }

  .footer-divider {
    max-width: 1280px;
    margin: 0 auto 42px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(242, 183, 5, 0.45), transparent);
  }

  .footer-divider.bottom {
    margin-top: 38px;
    margin-bottom: 30px;
  }

  .footer-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 42px;
  }

  .footer-column h4 {
    margin: 0 0 24px;
    color: #fff;
    font-size: 1rem;
    letter-spacing: 0.08em;
  }

  .footer-column h5 {
    margin: 22px 0 10px;
    color: #fff;
    font-size: 1rem;
  }

  .footer-column p,
  .footer-column a {
    display: block;
    margin: 0 0 12px;
    color: #cbd5e1;
    text-decoration: none;
    line-height: 1.7;
  }

  .footer-column a:hover {
    color: #f2b705;
  }

  .footer-social {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .social-link {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    text-decoration: none;
    background: #111827;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-weight: 900;
    transition: transform 0.2s ease, background 0.2s ease;
  }

  .social-link:hover {
    transform: translateY(-2px);
    background: #0b2d69;
  }

  @media (max-width: 1080px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
  }
</style>