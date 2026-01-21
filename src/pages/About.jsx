import '../styles/pages.css'

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About Delicious Bites</h1>
      </section>

      <article className="about-content">
        <section>
          <h2>Our Story</h2>
          <p>
            Delicious Bites was founded with a simple mission: to make cooking accessible and enjoyable for everyone. 
            We believe that great food doesn't have to be complicated or require fancy ingredients. Instead, it's about 
            passion, simplicity, and sharing delicious moments with loved ones.
          </p>
        </section>

        <section>
          <h2>What We Do</h2>
          <p>
            We curate and share authentic, tested recipes from our community of food lovers around the world. Every recipe 
            has been carefully selected and tested to ensure it's not only delicious but also practical for home cooks of 
            all skill levels.
          </p>
        </section>

        <section>
          <h2>Our Values</h2>
          <ul className="values-list">
            <li>
              <strong>Simplicity</strong> - We believe cooking should be simple and fun, not stressful.
            </li>
            <li>
              <strong>Quality</strong> - We only share recipes we've personally tested and loved.
            </li>
            <li>
              <strong>Community</strong> - Food brings people together. We love hearing from our readers!
            </li>
            <li>
              <strong>Sustainability</strong> - We promote cooking with whole foods and minimal waste.
            </li>
          </ul>
        </section>

        <section>
          <h2>The Team</h2>
          <p>
            Delicious Bites is run by food enthusiasts who are passionate about sharing their favorite recipes and 
            culinary discoveries. We're always looking for new recipes to feature and would love to hear your favorites!
          </p>
        </section>

        <section className="contact-section">
          <h2>Get In Touch</h2>
          <p>
            Have a recipe to share? Want to collaborate? We'd love to hear from you!
          </p>
          <p>
            Email us at: <a href="mailto:hello@deliciousbites.com">hello@deliciousbites.com</a>
          </p>
        </section>
      </article>
    </div>
  )
}

export default About
