import '../styles/pages.css'

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About B.O.R.G. Night</h1>
      </section>

      <article className="about-content">
        <section>
          <h2>Our Story</h2>
          <p>
            B.O.R.G. Night started as "Burger Night"—a simple tradition among a group of friends who met every week at their favorite burger joint. 
            What began as a casual meetup at the same spot became a cherished ritual—a time to reconnect, laugh, and enjoy good food together.
          </p>
          <p>
            After 7 years of burgers and friendship, the group decided to evolve the tradition. Instead of going to the same place, 
            they began exploring the world through food. Each week, they randomly select a country and cook a traditional dish from that nation's cuisine. 
            As the tradition expanded, "Burger Night" evolved into "Borger Night," and eventually became what it is today: B.O.R.G. Night—"Bites Of Random Geography"—a celebration 
            of global flavors, cultural discovery, and the bonds that food creates.
          </p>
          <p>
            Now, we're sharing these culinary adventures with you. Every recipe on this blog represents a journey to a new country and culture, 
            one delicious dish at a time.
          </p>
        </section>

        <section>
          <h2>What We Do</h2>
          <p>
            Each week, we randomly select a country and cook a traditional dish from that nation's cuisine. We document these culinary adventures 
            and share the recipes here so you can explore the world through food alongside us. Our goal is to inspire you to step outside your 
            comfort zone, discover new flavors, and create meaningful memories around the dinner table—just like we do at B.O.R.G. Night.
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
          </ul>
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
