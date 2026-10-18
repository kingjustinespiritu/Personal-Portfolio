import { useEffect, useRef, useState } from 'react';
import projects from './projects.js';

const sections = [
  {
    id: 'about',
    eyebrow: 'A little about me',
    title: 'ABOUT ME',
    navTitle: 'ABOUT',
    description: [
      "Hi! I'm a Bachelor of Science in Information Technology student at Central Luzon State University, passionate about technology, web development, and problem-solving. I enjoy exploring new technologies and creating digital solutions that combine functionality with clean, user-friendly design.",
      "I have an experience working with HTML, CSS, Java, C, and PHP, and I'm continuously improving my skills through academic projects and personal learning. My goal is to grow as an IT professional, gain practical experience, and build projects that showcase my creativity, technical knowledge, and dedication to continuous learning.",
    ],
  },
  {
    id: 'projects',
    eyebrow: 'Selected work',
    title: 'PROJECTS',
    description: 'Projects coming soon.',
  },
  {
    id: 'techstack',
    eyebrow: 'Tools I use',
    title: 'TECH STACK',
    description: 'Tech stack details coming soon.',
  },
  {
    id: 'contact',
    eyebrow: 'Let’s connect',
    title: 'CONTACT',
    description: 'Contact details coming soon.',
  },
];

const navLinks = sections.map(({ id, title, navTitle }) => ({ id, title: navTitle || title }));
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

function TypingHeading({ id, title }) {
  const headingRef = useRef(null);
  const [displayedTitle, setDisplayedTitle] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? title : ''
  ));

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedTitle(title);
      return undefined;
    }

    let typingTimer;
    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !wasVisible) {
        wasVisible = true;
        let characterCount = 0;
        setDisplayedTitle('');
        typingTimer = window.setInterval(() => {
          characterCount += 1;
          setDisplayedTitle(title.slice(0, characterCount));
          if (characterCount >= title.length) window.clearInterval(typingTimer);
        }, 85);
        return;
      }

      if (!entry.isIntersecting && wasVisible) {
        wasVisible = false;
        window.clearInterval(typingTimer);
        setDisplayedTitle('');
      }
    }, { threshold: 0.3 });

    observer.observe(heading);
    return () => {
      observer.disconnect();
      window.clearInterval(typingTimer);
    };
  }, [title]);

  return (
    <h2 id={id} ref={headingRef} className={id === 'contact-title' ? 'contact-title' : undefined} aria-label={title}>
      <span aria-hidden="true">{displayedTitle}</span>
      <span className="typing-cursor" aria-hidden="true" />
    </h2>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="content-section contact-section" aria-labelledby="contact-title">
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">Get in touch</p>
          <TypingHeading id="contact-title" title="LET'S WORK TOGETHER" />
          <p className="contact-intro">Have a project, opportunity, or question? I’d be glad to hear from you.</p>
          <p className="contact-summary">Reach out by email or connect with me on GitHub and LinkedIn.</p>
        </div>
        <div className="contact-methods">
          <a className="contact-card" href="mailto:kingjustinespiritu@gmail.com">
            <span className="contact-icon"><i className="fa-regular fa-envelope" aria-hidden="true" /></span>
            <span className="contact-card-copy"><span className="contact-label">Email</span><span className="contact-value">kingjustinespiritu@gmail.com</span></span>
            <span className="contact-number">01</span>
          </a>
          <a className="contact-card" href="https://github.com/kingjustinespiritu" target="_blank" rel="noopener noreferrer">
            <span className="contact-icon"><i className="fa-brands fa-github" aria-hidden="true" /></span>
            <span className="contact-card-copy"><span className="contact-label">GitHub</span><span className="contact-value">github.com/kingjustinespiritu</span></span>
            <i className="fa-solid fa-arrow-up-right-from-square contact-external" aria-hidden="true" />
            <span className="contact-number">02</span>
          </a>
          <a className="contact-card" href="https://www.linkedin.com/in/king-justin-espiritu-ab2675329/" target="_blank" rel="noopener noreferrer">
            <span className="contact-icon"><i className="fa-brands fa-linkedin-in" aria-hidden="true" /></span>
            <span className="contact-card-copy"><span className="contact-label">LinkedIn</span><span className="contact-value">linkedin.com/in/king-justin-espiritu</span></span>
            <i className="fa-solid fa-arrow-up-right-from-square contact-external" aria-hidden="true" />
            <span className="contact-number">03</span>
          </a>
          <a className="contact-message" href="mailto:kingjustinespiritu@gmail.com">
            Send me a message <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectsShowcase({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedProject]);

  const activeProject = projects[activeIndex];
  const previousIndex = projects.length > 1 ? (activeIndex - 1 + projects.length) % projects.length : -1;
  const nextIndex = projects.length > 1 ? (activeIndex + 1) % projects.length : -1;

  const renderStackCard = (project, index, position) => (
    <article className={`project-stack-card project-stack-${position}`} key={`${project.title}-${index}`}>
      <div className="project-card-badges">
        <span className="project-feature-badge">{project.badge || `#${String(index + 1).padStart(2, '0')} FEATURED`}</span>
        {project.category && <span className="project-category-badge">{project.category}</span>}
      </div>
      <div className="project-stack-main">
        {project.image ? <img className="project-stack-image" src={project.image} alt={`${project.title} preview`} /> : <span className="project-stack-mark" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
        <div className="project-stack-copy">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      </div>
      {project.technologies?.length > 0 && <ul className="project-tags" aria-label="Technologies used">{project.technologies.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}</ul>}
      {position === 'front' && (
        <div className="project-links">
          <button className="project-details-button" type="button" onClick={() => setSelectedProject(project)}>View Details <i className="fa-solid fa-arrow-right" aria-hidden="true" /></button>
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /></a>}
          {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">Source code <i className="fa-brands fa-github" aria-hidden="true" /></a>}
        </div>
      )}
    </article>
  );

  return (
    <>
      <div className="project-stack" aria-live="polite">
        {projects.length > 2 && renderStackCard(projects[previousIndex], previousIndex, 'back-left')}
        {projects.length > 1 && renderStackCard(projects[nextIndex], nextIndex, 'back-right')}
        {activeProject && renderStackCard(activeProject, activeIndex, 'front')}
      </div>
      {projects.length > 1 && (
        <div className="project-stack-controls" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button key={`${project.title}-dot`} type="button" className={index === activeIndex ? 'is-active' : ''} aria-label={`Show ${project.title}`} aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)} />
          ))}
        </div>
      )}
      {selectedProject && (
        <div className="project-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedProject(null);
        }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button className="project-modal-close" type="button" aria-label="Close project details" onClick={() => setSelectedProject(null)}>
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
            <div className="project-modal-layout">
              {selectedProject.image && <img className="project-modal-image" src={selectedProject.image} alt={`${selectedProject.title} full screenshot`} />}
              <div className="project-modal-content">
                <p className="eyebrow">Project details</p>
                <h3 id="project-modal-title">{selectedProject.title}</h3>
                <p>{selectedProject.details || selectedProject.description}</p>
                {selectedProject.technologies?.length > 0 && <ul className="project-tags" aria-label="Technologies used">{selectedProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>}
                <div className="project-links">
                  {selectedProject.demoUrl && <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /></a>}
                  {selectedProject.sourceUrl && <a href={selectedProject.sourceUrl} target="_blank" rel="noopener noreferrer">Source code <i className="fa-brands fa-github" aria-hidden="true" /></a>}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function ContentSection({ eyebrow, title, description, id }) {
  return (
    <section id={id} className={`content-section${id === 'projects' ? ' projects-section' : ''}`} aria-labelledby={`${id}-title`}>
      {id === 'projects' ? (
        <div className="projects-section-heading">
          <TypingHeading id={`${id}-title`} title="02 — PROJECTS" />
          <a href="https://github.com/kingjustinespiritu?tab=repositories" target="_blank" rel="noopener noreferrer">ALL PROJECTS <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
        </div>
      ) : (
        <>
          <p className="eyebrow">{eyebrow}</p>
          <TypingHeading id={`${id}-title`} title={title} />
        </>
      )}
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
      ) : id === 'projects' ? (
        projects.length ? (
          <ProjectsShowcase projects={projects} />
        ) : (
          <div className="projects-empty-state"><span aria-hidden="true">✳</span><p>Your projects will appear here.</p></div>
        )
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
  const toggleTheme = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty('--theme-reveal-x', `${left + width / 2}px`);
    root.style.setProperty('--theme-reveal-y', `${top + height / 2}px`);
    const changeTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark');

    if (document.startViewTransition) document.startViewTransition(changeTheme);
    else changeTheme();
  };

  return (
    <>
      <header className="header">
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
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={toggleTheme}
        >
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
        </button>
        <a className="visit-btn" href="#contact" aria-label="Hire me">
          <span className="github-label">Hire Me</span>
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

        {sections.map((section) => section.id === 'contact'
          ? <ContactSection key={section.id} />
          : <ContentSection key={section.id} {...section} />)}
      </main>

      <footer><p>© <span>{new Date().getFullYear()}</span> King Justin Espiritu</p></footer>
    </>
  );
}

export default App;
