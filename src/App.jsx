import { useEffect, useState } from 'react';

const sections = [
  {
    id: 'about',
    eyebrow: 'A little about me',
    title: 'About',
    description: [
      "Hi! I'm a Bachelor of Science in Information Technology student at Central Luzon State University, passionate about technology, web development, and problem-solving. I enjoy exploring new technologies and creating digital solutions that combine functionality with clean, user-friendly design.",
      "I have an experience working with HTML, CSS, Java, C, and PHP, and I'm continuously improving my skills through academic projects and personal learning. My goal is to grow as an IT professional, gain practical experience, and build projects that showcase my creativity, technical knowledge, and dedication to continuous learning.",
    ],
  },
  {
    id: 'projects',
    eyebrow: 'Selected work',
    title: 'Projects',
    description: 'Projects coming soon.',
  },
  {
    id: 'techstack',
    eyebrow: 'Tools I use',
    title: 'Tech Stack',
    description: 'Tech stack details coming soon.',
  },
  {
    id: 'contact',
    eyebrow: 'Let’s connect',
    title: 'Contact',
    description: 'Contact details coming soon.',
  },
];

const navLinks = sections.map(({ id, title }) => ({ id, title }));
const technologies = [
  { name: 'C', icon: null },
  { name: 'Java', icon: 'fa-brands fa-java' },
  { name: 'Python', image: '/images/python.svg' },
  { name: 'PHP', icon: 'fa-brands fa-php' },
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'JavaScript', icon: 'fa-brands fa-js' },
  { name: 'HTML', icon: 'fa-brands fa-html5' },
  { name: 'CSS', icon: 'fa-brands fa-css3-alt' },
  { name: 'SQL', icon: 'fa-solid fa-database' },
  { name: 'MySQL', image: '/images/mysql.svg' },
  { name: 'GitHub', icon: 'fa-brands fa-github' },
];

function ContentSection({ eyebrow, title, description, id }) {
  return (
    <section id={id} className="content-section" aria-labelledby={`${id}-title`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      {id === 'about' ? (
        <div className="about-grid">
          <div className="about-bio">
            {description.map((paragraph, index) => (
              <p className="section-description" key={`about-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
          <div className="about-details">
            <div className="about-detail"><h3>School</h3><p>Central Luzon State University</p></div>
            <div className="about-detail"><h3>Program</h3><p>Bachelor of Science in Information Technology</p></div>
            <div className="about-detail"><h3>Location</h3><p>Science City of Munoz, Nueva Ecija, PH</p></div>
          </div>
        </div>
      ) : id === 'techstack' ? (
        <div className="tech-grid">
          {technologies.map(({ name, icon, image }) => (
            <div className="tech-card" data-tech={name.toLowerCase()} key={name}>
              <span className="tech-logo" aria-hidden="true">
                {image ? <img src={image} alt="" /> : icon ? <i className={icon} /> : <span className="tech-c-logo">C</span>}
              </span>
              <span className="tech-name">{name}</span>
            </div>
          ))}
        </div>
      ) : (
        (Array.isArray(description) ? description : [description]).map((paragraph, index) => (
          <p className="section-description" key={`${id}-paragraph-${index}`}>{paragraph}</p>
        ))
      )}
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [photoUnavailable, setPhotoUnavailable] = useState(false);
  const [theme, setTheme] = useState(() => window.localStorage.getItem('portfolio-theme') || 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#f4f4f4');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const atPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

        if (atPageBottom) {
          setActiveSection('contact');
          return;
        }

        const marker = window.innerHeight * 0.4;
        let currentSection = '';
        sections.forEach(({ id }) => {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= marker) currentSection = id;
        });
        setActiveSection(currentSection);
      });
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        <a href="#home" className="logo" onClick={closeMenu}>King Justin Espiritu</a>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
        >
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
        </button>
        <nav id="site-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">
          <ul className="nav-links">
            {navLinks.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeSection === id ? 'is-active' : ''}
                  aria-current={activeSection === id ? 'location' : undefined}
                  onClick={() => {
                    setActiveSection(id);
                    closeMenu();
                  }}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="visit-btn" href="https://github.com/kingjustinespiritu" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub">
          <i className="github-icon fa-brands fa-github" aria-hidden="true" />
          <span className="github-label">Visit GitHub</span>
        </a>
      </header>

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">Welcome to my portfolio</p>
            <h1 id="hero-title">Hi, I’m <span>King Justin Espiritu</span></h1>
            <p className="hero-copy">I’m building my skills and sharing my work here. Explore my projects and tech stack.</p>
            <a className="primary-link" href="#projects">Explore my work <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a>
          </div>

          <div className="profile-column">
            <div className="profile-photo-wrap">
              {!photoUnavailable ? (
                <img
                  className="profile-photo"
                  src="/images/profile.jpg"
                  alt="King Justin Espiritu"
                  onError={() => setPhotoUnavailable(true)}
                />
              ) : (
                <div className="photo-placeholder" aria-hidden="true"><i className="fa-regular fa-user" /></div>
              )}
            </div>
            <div className="social-links" aria-label="Social media profiles">
              <a href="https://www.facebook.com/justin.espiritu.106" target="_blank" rel="noopener noreferrer" aria-label="Facebook profile">
                <i className="fa-brands fa-facebook-f" aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/in/king-justin-espiritu-ab2675329/?isSelfProfile=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {sections.map((section) => <ContentSection key={section.id} {...section} />)}
      </main>

      <footer><p>© <span>{new Date().getFullYear()}</span> King Justin Espiritu</p></footer>
    </>
  );
}

export default App;
