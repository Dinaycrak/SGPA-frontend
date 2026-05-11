<footer class="site-footer">
  <div class="footer-divider"></div>

  <div class="footer-grid">
    <div class="footer-column footer-brand">
      <h4>SGPA</h4>
      <p>
        Academic Project Management System focused on tracking,
        organizing, and consulting projects within the institutional environment.
      </p>
    </div>

    <div class="footer-column">
      <h4>CONTACT</h4>
      <p>58th Street #55-24A Barranquilla, Colombia</p>
      <p>Email: promocion@ul.edu.co</p>
      <p>Phone: (+57) 314 8962734</p>
    </div>

    <div class="footer-column">
      <h4>USEFUL LINKS</h4>
      <a href="/">Home</a>
      <a href="/login">System login</a>
      <a href="/">Data processing policy</a>
      <a href="/">User support</a>
    </div>

    <div class="footer-column">
      <h4>MODULES</h4>
      <a href="/coordinator">Coordinator</a>
      <a href="/teacher">Teacher</a>
      <a href="/students">Student</a>
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
    background: linear-gradient(135deg, var(--sgpa-blue-dark), var(--sgpa-blue));
    color: #ffffff;
    padding: 56px 24px 34px;
    border-top: 5px solid var(--sgpa-yellow);
  }

  .footer-divider {
    max-width: 1280px;
    margin: 0 auto 34px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(242, 183, 5, 0.55), transparent);
  }

  .footer-divider.bottom {
    margin-top: 34px;
    margin-bottom: 24px;
  }

  .footer-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr 1fr;
    gap: 32px;
  }

  .footer-column h4 {
    margin: 0 0 18px;
    color: #ffffff;
    font-size: 0.92rem;
    letter-spacing: 0.08em;
    font-weight: 950;
  }

  .footer-column p,
  .footer-column a {
    display: block;
    margin: 0 0 10px;
    color: rgba(255, 255, 255, 0.78);
    text-decoration: none;
    line-height: 1.65;
    font-size: 0.95rem;
  }

  .footer-column a:hover {
    color: var(--sgpa-yellow);
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
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.16);
    font-weight: 950;
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
  }

  .social-link:hover {
    transform: translateY(-2px);
    background: var(--sgpa-yellow);
    color: var(--sgpa-blue-dark);
  }

  @media (max-width: 1080px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 640px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
  }
</style>