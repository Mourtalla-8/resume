// Language toggle for the resume. French is the default; the selected language is persisted.
(() => {
  const storageKey = "resume-language";
  const defaultLanguage = "fr";
  const supportedLanguages = ["en", "fr"];
  const toggle = document.querySelector(".language-toggle");
  const downloadFab = document.querySelector(".download-fab");

  if (!toggle) return;

  const content = {
    en: {
      documentTitle: "Resume - MOURTALLA TOURE",
      metaDescription:
        "Resume of Mourtalla Toure - Software Engineer focused on backend development, APIs, and data analysis.",
      skipLink: "Skip to main content",
      role: "Software Engineer",
      domain: "Junior",
      contactLabel: "Contact information",
      educationHeading: "FORMATION/EDUCATION",
      educationTitles: [
        "Bachelor's in Computer Science - Application Development (Web, Mobile & Gaming)",
        "Data Engineering",
        "Data Analysis Certificate",
        "Baccalaureate in Secondary Education",
      ],
      educationDates: ["Nov 2023 – Present", "Feb 2026 – Present", "Completed Oct 2024", "Obtained June 2023"],
      educationSchools: [
        "Cheikh Hamidou Kane Digital University (UNCHK)",
        "FORCE-N",
        "FORCE-N",
        "Lycée Technique Ahmadou Bamba de Diourbel",
      ],
      educationDescriptions: [
        "Bachelor's degree focused on practical web, mobile, and game application development.",
        "Professional training focused on data pipelines, processing, and engineering practices.",
        "Training covering the foundations of data exploration, interpretation, and reporting.",
        "In Economics and Management Science and Technologies (STEG).",
      ],
      educationMore: "Online courses - MOOCs & self-directed learning",
      educationCredential: "View details",
      projectsHeading: "PROJECTS",
      projectLinks: "View project",
      projectsMore: "View more projects on GitHub",
      projects: [
        {
          date: "May 2026",
          title: "jwebgen - Jakarta Servlet/JSP Scaffolding CLI",
          stack: "Node.js · Java · Jakarta Servlet · JSP · Maven · npm · Shell & Node Scripts",
          tasks: [
            "Development and publication of a cross-platform CLI for Jakarta Servlet/JSP project scaffolding and deployment automation",
          ],
        },
        {
          date: "Oct 2025",
          title: "CEC - Equal Opportunity Card Management Platform",
          stack: "Angular · Node.js · Express · MongoDB",
          tasks: [
            "Developed REST APIs, database models, and an Angular administration dashboard",
          ],
        },
        {
          date: "Jan 2025",
          title: "GOTA - Telecom Operators & Subscribers Management",
          stack: "Python",
          tasks: [
            "Developed a Python application for telecom operators, telecom subscribers, and CRUD workflows",
          ],
        },
        {
          date: "Jan 2025",
          title: "User Settings Panel",
          stack: "HTML · CSS · Bootstrap",
          tasks: [
            "Created a responsive profile and security settings interface with HTML, CSS, and Bootstrap",
          ],
        },
      ],
      sidebarLabel: "Profile sidebar",
      summaryHeading: "SUMMARY",
      summary:
        "Junior Software Engineer working across backend and frontend development, APIs, databases, and data. Curious and committed to continuous learning, I build clean, maintainable software and adapt quickly to new technologies and project requirements.",
      strengthsHeading: "STRENGTHS",
      strengths: [
        "Strong problem-solving and analytical thinking",
        "Clear communication and effective teamwork",
        "Quick learner with a structured, detail-oriented approach",
      ],
      skillsHeading: "SKILLS",
      skillGroups: [
        ["Languages & Scripting", "Python, JavaScript, TypeScript, PHP, Java, C++, Swift, Bash"],
        ["Backend & APIs", "Node.js, Nest.js, Next.js, Express, Django, FastAPI, Laravel, JEE, REST, GraphQL, gRPC"],
        ["Frontend & Mobile", "HTML/CSS, Tailwind, Bootstrap, Angular, Vue, React, React Native"],
        ["Data & Storage", "SQL, NoSQL, MongoDB, Database Modeling, Data Analysis, Data Engineering"],
        ["Architecture & Design", "Software Architecture, System Design, Data Structures & Algorithms, UML, Design Patterns"],
        ["DevOps & Collaboration", "Git, GitHub, GitHub Actions (CI/CD), Docker, Linux, Notion, Project Management, Agile/Scrum, Agent Coding"],
      ],
      languagesHeading: "LANGUAGES",
      spokenLanguages: [
        ["English", "Intermediate"],
        ["French", "Fluent"],
        ["Wolof", "Fluent"],
      ],
      interestsHeading: "INTERESTS",
      interests: [
        [
          "E-sport",
          "",
        ],
        [
          "Tech Industry Evolution",
          "",
        ],
      ],
      download: "Download",
      downloadLabel: "Download resume as PDF",
      downloadFile: "Resume_Mourtalla_Toure_Software_Engineer.pdf",
      toggleLabel: "Switch language to French",
      newTab: "opens in new tab",
    },
    fr: {
      documentTitle: "Resume - MOURTALLA TOURE",
      metaDescription:
        "Resume de Mourtalla Toure - Ingénieur logiciel orienté backend, APIs et analyse de données.",
      skipLink: "Aller au contenu principal",
      role: "Ingénieur logiciel",
      domain: "Junior",
      contactLabel: "Coordonnées",
      educationHeading: "FORMATION/EDUCATION",
      educationTitles: [
        "Licence en informatique - Développement d'applications (web, mobile et jeux)",
        "Ingénierie des données",
        "Certificat en analyse de données",
        "Diplôme de bachelier de l'enseignement du second degré",
      ],
      educationDates: ["Nov. 2023 – Aujourd'hui", "Fév. 2026 – Aujourd'hui", "Obtenu en oct. 2024", "Obtenu en juin 2023"],
      educationSchools: [
        "Université Numérique Cheikh Hamidou Kane (UNCHK)",
        "FORCE-N",
        "FORCE-N",
        "Lycée Technique Ahmadou Bamba de Diourbel",
      ],
      educationDescriptions: [
        "Formation axée sur le développement pratique d'applications web, mobiles et de jeux.",
        "Formation professionnelle consacrée aux pipelines, au traitement et à l'ingénierie des données.",
        "Formation portant sur l'exploration, l'interprétation et la restitution des données.",
        "Diplôme de bachelier de l'enseignement du second degré en Sciences et Technologies de l'Économie et de la Gestion.",
      ],
      educationMore: "Cours en ligne - MOOCs et apprentissage autonome",
      educationCredential: "Voir les détails",
      projectsHeading: "PROJETS",
      projectLinks: "Voir le projet",
      projectsMore: "Voir plus de projets sur GitHub",
      projects: [
        {
          date: "Mai 2026",
          title: "jwebgen - CLI de génération de projets Jakarta Servlet/JSP",
          stack: "Node.js · Java · Jakarta Servlet · JSP · Maven · npm · scripts Shell et Node",
          tasks: [
            "Développement et publication d'un CLI multiplateforme pour générer des projets Jakarta Servlet/JSP et automatiser leur déploiement",
          ],
        },
        {
          date: "Oct. 2025",
          title: "CEC - Plateforme de gestion de la Carte d'égalité des chances",
          stack: "Angular · Node.js · Express · MongoDB",
          tasks: [
            "Développement d'API REST, de modèles de données et d'un tableau de bord d'administration Angular",
          ],
        },
        {
          date: "Janv. 2025",
          title: "GOTA - Gestion des opérateurs télécoms et des abonnés",
          stack: "Python",
          tasks: [
            "Développement d'une application Python de gestion des opérateurs télécoms, des abonnés télécoms et des workflows CRUD",
          ],
        },
        {
          date: "Janv. 2025",
          title: "User Settings Panel",
          stack: "HTML · CSS · Bootstrap",
          tasks: [
            "Création d'une interface responsive de profil et de paramètres de sécurité avec HTML, CSS et Bootstrap",
          ],
        },
      ],
      sidebarLabel: "Colonne de profil",
      summaryHeading: "PROFIL",
      summary:
        "Ingénieur logiciel junior intervenant en développement backend et frontend, ainsi qu'avec les APIs, les bases de données et la data. Curieux et engagé dans l'apprentissage continu, je conçois des logiciels propres et maintenables et je m'adapte rapidement aux nouvelles technologies et aux exigences des projets.",
      strengthsHeading: "ATOUTS",
      strengths: [
        "Résolution de problèmes et esprit analytique",
        "Communication claire et travail d'équipe efficace",
        "Apprentissage rapide avec une approche structurée et rigoureuse",
      ],
      skillsHeading: "COMPÉTENCES",
      skillGroups: [
        ["Langages et scripts", "Python, JavaScript, TypeScript, PHP, Java, C++, Swift, Bash"],
        ["Backend et API", "Node.js, Nest.js, Next.js, Express, Django, FastAPI, Laravel, JEE, REST, GraphQL, gRPC"],
        ["Frontend et mobile", "HTML/CSS, Tailwind, Bootstrap, Angular, Vue, React, React Native"],
        ["Données et stockage", "SQL, NoSQL, MongoDB, Modélisation de bases de données, Data Analysis, Data Engineering"],
        ["Architecture et conception", "Architecture logicielle, System Design, Structures de données et algorithmes, UML, Design Patterns"],
        ["DevOps et collaboration", "Git, GitHub, GitHub Actions (CI/CD), Docker, Linux, Notion, Gestion de projet, Agile/Scrum, Agent Coding"],
      ],
      languagesHeading: "LANGUES",
      spokenLanguages: [
        ["Anglais", "Intermédiaire"],
        ["Français", "Courant"],
        ["Wolof", "Courant"],
      ],
      interestsHeading: "CENTRES D'INTÉRÊT",
      interests: [
        [
          "E-sport",
          "",
        ],
        [
          "Tech Industry Evolution",
          "",
        ],
      ],
      download: "Télécharger",
      downloadLabel: "Télécharger le CV en PDF",
      downloadFile: "Resume_Mourtalla_Toure_Ingenieur_Logiciel.pdf",
      toggleLabel: "Passer en anglais",
      newTab: "s'ouvre dans un nouvel onglet",
    },
  };

  function savedLanguage() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function storeLanguage(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // Ignore storage errors; the toggle still works for the current page view.
    }
  }

  function setText(selector, text) {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  }

  function setAttribute(selector, attribute, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
  }

  function setLeadingText(element, text) {
    if (!element) return;

    const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) {
      textNode.nodeValue = text;
      return;
    }

    element.prepend(document.createTextNode(text));
  }

  function translateEducation(translations) {
    document.querySelectorAll(".education-entry").forEach((entry, index) => {
      const title = entry.querySelector("h3 a") || entry.querySelector("h3");
      setLeadingText(title, translations.educationTitles[index]);
      const dateLink = entry.querySelector("p:last-of-type a");
      const date = dateLink || entry.querySelector("p:last-of-type");
      if (date) {
        setLeadingText(date, translations.educationDates[index]);
      }
      setTextIn(entry, ".education-school", translations.educationSchools[index] || "");
      setTextIn(entry, ".education-description", translations.educationDescriptions[index] || "");
      setLeadingText(entry.querySelector(".education-credential"), translations.educationCredential);
    });
  }

  function translateProjects(translations) {
    document.querySelectorAll(".project-item").forEach((project, index) => {
      const projectContent = translations.projects[index];
      if (!projectContent) return;

      setTextIn(project, ".project-date time", projectContent.date);
      setTextIn(project, "h3", projectContent.title);
      setTextIn(project, ".project-stack", projectContent.stack);
      project.querySelectorAll(".project-tasks li").forEach((item, itemIndex) => {
        item.textContent = projectContent.tasks[itemIndex] || "";
      });
      setLeadingText(project.querySelector("a[href*='github.com']"), translations.projectLinks);
    });
  }

  function setTextIn(root, selector, text) {
    const element = root.querySelector(selector);
    if (element) element.textContent = text;
  }

  function translateList(selector, values) {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.textContent = values[index] || "";
    });
  }

  function translateSkillGroups(translations) {
    document.querySelectorAll(".skill-group").forEach((group, index) => {
      const [heading, text] = translations.skillGroups[index] || [];
      setTextIn(group, "h3", heading || "");
      setTextIn(group, "p", text || "");
    });
  }

  function translateSpokenLanguages(translations) {
    document.querySelectorAll(".languages .langues > div").forEach((language, index) => {
      const [name, level] = translations.spokenLanguages[index] || [];
      const paragraphs = language.querySelectorAll("p");
      if (paragraphs[0]) paragraphs[0].textContent = name || "";
      if (paragraphs[1]) paragraphs[1].textContent = level || "";
    });
  }

  function translateInterests(translations) {
    document.querySelectorAll(".interest-item").forEach((interest, index) => {
      const [heading, text] = translations.interests[index] || [];
      setTextIn(interest, "h3", heading || "");
      setTextIn(interest, "p", text || "");
    });
  }

  function translateHiddenNewTabLabels(translations) {
    document.querySelectorAll(".visually-hidden").forEach((element) => {
      element.textContent = element.textContent.replace(
        /\((opens in new tab|s'ouvre dans un nouvel onglet)\)/g,
        `(${translations.newTab})`
      );
    });
  }

  function applyLanguage(language) {
    const activeLanguage = supportedLanguages.includes(language) ? language : defaultLanguage;
    const translations = content[activeLanguage];
    const metaDescription = document.querySelector('meta[name="description"]');

    document.documentElement.lang = activeLanguage;
    document.title = translations.documentTitle;
    if (metaDescription) metaDescription.content = translations.metaDescription;

    setText(".skip-link", translations.skipLink);
    setText(".job-title p:first-child", translations.role);
    setText(".job-title p:last-child", translations.domain);
    setAttribute(".contact-info", "aria-label", translations.contactLabel);
    setAttribute(".left", "aria-label", translations.sidebarLabel);
    setText("#education-heading", translations.educationHeading);
    setText(".education-more", translations.educationMore);
    setText("#projects-heading", translations.projectsHeading);
    setText("#summary-heading", translations.summaryHeading);
    setText(".summary p", translations.summary);
    setText("#strengths-heading", translations.strengthsHeading);
    setText("#skills-heading", translations.skillsHeading);
    setText("#languages-heading", translations.languagesHeading);
    setText("#interests-heading", translations.interestsHeading);
    setLeadingText(document.querySelector(".projects-more a"), translations.projectsMore);
    setLeadingText(document.querySelector(".download-text"), translations.download);
    setAttribute(".download-fab", "aria-label", translations.downloadLabel);
    if (downloadFab && translations.downloadFile) {
      downloadFab.href = translations.downloadFile;
      downloadFab.setAttribute("download", translations.downloadFile);
    }

    translateEducation(translations);
    translateProjects(translations);
    translateList(".strengths-list li", translations.strengths);
    translateSkillGroups(translations);
    translateSpokenLanguages(translations);
    translateInterests(translations);
    translateHiddenNewTabLabels(translations);

    toggle.dataset.lang = activeLanguage;
    toggle.setAttribute("aria-label", translations.toggleLabel);
    toggle.setAttribute("aria-pressed", String(activeLanguage === "fr"));
  }

  let scrollTicking = false;

  function updateToggleVisibility() {
    const shouldHide = window.scrollY > 80 && !toggle.matches(":focus-visible");
    toggle.classList.toggle("is-hidden", shouldHide);
  }

  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;

      requestAnimationFrame(() => {
        scrollTicking = false;
        updateToggleVisibility();
      });
    },
    { passive: true }
  );

  toggle.addEventListener("focus", () => toggle.classList.remove("is-hidden"));

  const initialLanguage = supportedLanguages.includes(savedLanguage()) ? savedLanguage() : defaultLanguage;
  applyLanguage(initialLanguage);
  updateToggleVisibility();

  toggle.addEventListener("click", () => {
    const nextLanguage = toggle.dataset.lang === "fr" ? "en" : "fr";
    applyLanguage(nextLanguage);
    storeLanguage(nextLanguage);
  });
})();
