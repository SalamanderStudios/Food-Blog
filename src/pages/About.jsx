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
            B.O.R.G. Night started as "Burger Night", a simple tradition among a group of friends who met every week at their favorite burger joint. 
            What began as a casual meetup at the same spot became a cherished ritual; a time to reconnect, laugh, and enjoy good food together.
          </p>
          <p>
            After 7 years of burgers and friendship, the group decided to evolve the tradition. Instead of going to the same place, 
            they began exploring the world through food. Each week, they randomly select a country and cook a traditional dish from that nation's cuisine. 
            As the tradition expanded, "Burger Night" evolved into "Borger Night," and eventually became what it is today: B.O.R.G. Night or "Bites Of Random Geography", a celebration 
            of global flavors, cultural discovery, and most importantly the bonds that food creates.
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
            comfort zone, discover new flavors, and create meaningful memories around the dinner table, just like we do at B.O.R.G. Night. Bonus points if you
            break out a board game or cards after dinner as is tradition for us!
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

        <section>
          <h2>How We Rate</h2>
          <p>
            In our group of half a dozen friends, we each rate every recipe on a scale of 1-5. Here's what our ratings mean:
          </p>
          <ul className="values-list">
            <li>
              <strong>3 out of 5</strong> - A good meal. We enjoyed it and would make it again.
            </li>
            <li>
              <strong>4 out of 5</strong> - A great meal. This one really impressed us and we'll definitely come back to it.
            </li>
            <li>
              <strong>5 out of 5</strong> - One of our favorite meals we have made. This is a keeper that stands out among all our B.O.R.G. Night adventures.
            </li>
          </ul>
          <p>
            The B.O.R.G. Rating you see on each recipe is our group's consensus rating. Your Reader's Rating helps us know what resonates with our audience!
          </p>
        </section>

        <section className="contact-section">
          <h2>Get In Touch</h2>
          <p>
            Have a recipe to share? Want to collaborate? We'd love to hear from you!
          </p>
          <p>
            Email us at: <a href="mailto:jtsalamander7@gmail.com">jtsalamander7@gmail.com</a>
          </p>
        </section>
      </article>
    </div>
  )
}

export default About
