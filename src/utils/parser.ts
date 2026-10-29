import {
  PortfolioData,
  JsonResume,
  ContentBlock,
  DomAstNode,
  NavItem,
  CtaButton,
  SkillItem,
  ProjectItem,
  EducationItem,
  ContactFormField,
  SocialLink,
  AboutSectionPart,
} from '../types/portfolio';

export function parseHtmlToPortfolioData(htmlString: string): PortfolioData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Title & Meta
  const title = doc.querySelector('title')?.textContent?.trim() || 'Portfolio';
  const lang = doc.documentElement.getAttribute('lang') || 'en';

  // Navigation
  const navItems: NavItem[] = [];
  const navLinks = doc.querySelectorAll('.navbar .nav-link, nav a');
  navLinks.forEach((link) => {
    const text = link.textContent?.trim();
    const href = link.getAttribute('href') || '#';
    if (text && !text.includes('Toggle') && text.length > 0) {
      navItems.push({ label: text, href });
    }
  });

  // Hero Section
  const heroSection = doc.querySelector('.hero, #home, header');
  let name = 'Tanishq Selukar';
  let headline = '2nd Year Electronics And Computer Science Student';
  let bio = 'I am a passionate student interested in Web Development, Programming and Technology.';
  const ctaButtons: CtaButton[] = [];

  if (heroSection) {
    const h1 = heroSection.querySelector('h1');
    const spanName = heroSection.querySelector('h1 span');
    if (spanName && spanName.textContent) {
      name = spanName.textContent.trim();
    } else if (h1) {
      const h1Text = h1.textContent?.replace(/Hello,?\s*(I'm|I am)?/i, '').trim();
      if (h1Text) name = h1Text;
    }

    const h3 = heroSection.querySelector('h3, h2, .lead');
    if (h3 && h3.textContent) {
      headline = h3.textContent.trim();
    }

    const heroP = heroSection.querySelector('p');
    if (heroP && heroP.textContent) {
      bio = heroP.textContent.trim();
    }

    const heroBtns = heroSection.querySelectorAll('a.btn, button.btn');
    heroBtns.forEach((btn) => {
      const text = btn.textContent?.trim() || '';
      const href = btn.getAttribute('href') || '#';
      const className = btn.getAttribute('class') || '';
      let variant: 'primary' | 'outline' | 'secondary' = 'primary';
      if (className.includes('outline')) variant = 'outline';
      else if (className.includes('secondary')) variant = 'secondary';
      if (text) {
        ctaButtons.push({ text, href, variant });
      }
    });
  }

  // About Section
  const aboutSection = doc.querySelector('#about, .about');
  let aboutTitle = 'About Me';
  let aboutSubtitle = 'Know more about me';
  const aboutSections: AboutSectionPart[] = [];

  if (aboutSection) {
    const aTitle = aboutSection.querySelector('.section-title h2, h2');
    if (aTitle && aTitle.textContent) aboutTitle = aTitle.textContent.trim();

    const aSub = aboutSection.querySelector('.section-title p');
    if (aSub && aSub.textContent) aboutSubtitle = aSub.textContent.trim();

    const aboutCols = aboutSection.querySelectorAll('.col-md-6, .about-col, .about-content');
    if (aboutCols.length > 0) {
      aboutCols.forEach((col) => {
        const h4 = col.querySelector('h4, h3')?.textContent?.trim() || 'About';
        const paragraphs: string[] = [];
        col.querySelectorAll('p').forEach((p) => {
          const t = p.textContent?.trim();
          if (t) paragraphs.push(t);
        });
        if (paragraphs.length > 0) {
          aboutSections.push({ title: h4, content: paragraphs });
        }
      });
    } else {
      const paragraphs: string[] = [];
      aboutSection.querySelectorAll('p').forEach((p) => {
        const t = p.textContent?.trim();
        if (t && t !== aboutSubtitle) paragraphs.push(t);
      });
      aboutSections.push({ title: 'Overview', content: paragraphs });
    }
  }

  // Skills Section
  const skillsSection = doc.querySelector('#skills, .skills');
  const skills: SkillItem[] = [];
  if (skillsSection) {
    const cards = skillsSection.querySelectorAll('.skill-card, .card');
    cards.forEach((card, idx) => {
      const name = card.querySelector('h4, h5, .card-title')?.textContent?.trim() || 'Skill';
      const desc = card.querySelector('p, .card-text')?.textContent?.trim() || '';
      const iconEl = card.querySelector('i');
      let icon = 'bi-code-slash';
      if (iconEl) {
        const cls = Array.from(iconEl.classList).find((c) => c.startsWith('bi-'));
        if (cls) icon = cls;
      }
      let category = 'Technical';
      if (name.toLowerCase().includes('html') || name.toLowerCase().includes('css')) category = 'Frontend';
      else if (name.toLowerCase().includes('bootstrap') || name.toLowerCase().includes('tailwind')) category = 'Framework';
      else if (name.toLowerCase().includes('javascript') || name.toLowerCase().includes('python')) category = 'Programming';

      skills.push({
        id: `skill-${idx + 1}`,
        name,
        icon,
        category,
        description: desc,
      });
    });
  }

  // Education Section
  const eduSection = doc.querySelector('#education, .education');
  const education: EducationItem[] = [];
  if (eduSection) {
    const eduCards = eduSection.querySelectorAll('.education-card, .card');
    eduCards.forEach((card, idx) => {
      const degree = card.querySelector('h4, h5')?.textContent?.trim() || 'Degree';
      const institution = card.querySelector('h6, .institution, .school')?.textContent?.trim() || 'University';
      const period = card.querySelector('.text-muted, .period, .date')?.textContent?.trim() || '2025 - Present';
      let desc = '';
      const pElements = card.querySelectorAll('p');
      pElements.forEach((p) => {
        if (!p.classList.contains('text-muted') && !p.classList.contains('period')) {
          desc += (desc ? ' ' : '') + p.textContent?.trim();
        }
      });
      education.push({
        id: `edu-${idx + 1}`,
        degree,
        institution,
        period,
        description: desc,
      });
    });
  }

  // Projects Section
  const projectsSection = doc.querySelector('#projects, .projects');
  const projects: ProjectItem[] = [];
  if (projectsSection) {
    const projectCards = projectsSection.querySelectorAll('.project-card, .card');
    projectCards.forEach((card, idx) => {
      const pTitle = card.querySelector('.card-title, h4, h5')?.textContent?.trim() || `Project ${idx + 1}`;
      const pDesc = card.querySelector('.card-text, p')?.textContent?.trim() || '';
      const tags: string[] = [];
      card.querySelectorAll('.badge, .tag, .pill').forEach((badge) => {
        const badgeText = badge.textContent?.trim();
        if (badgeText) tags.push(badgeText);
      });
      projects.push({
        id: `project-${idx + 1}`,
        title: pTitle,
        description: pDesc,
        tags: tags.length ? tags : ['Web Development'],
      });
    });
  }

  // Contact Section
  const contactSection = doc.querySelector('#contact, .contact');
  let contactTitle = 'Contact Me';
  let contactSubtitle = 'Feel free to get in touch with me';
  const formFields: ContactFormField[] = [];
  let submitBtnText = 'Send Message';
  let successMsg = 'Thank you! Your message has been submitted successfully.';

  if (contactSection) {
    const cTitle = contactSection.querySelector('.section-title h2, h2');
    if (cTitle && cTitle.textContent) contactTitle = cTitle.textContent.trim();

    const cSub = contactSection.querySelector('.section-title p');
    if (cSub && cSub.textContent) contactSubtitle = cSub.textContent.trim();

    const form = contactSection.querySelector('form');
    if (form) {
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach((input, idx) => {
        const type = input.tagName.toLowerCase() === 'textarea' ? 'textarea' : input.getAttribute('type') || 'text';
        const placeholder = input.getAttribute('placeholder') || '';
        const prevLabel = input.previousElementSibling?.tagName.toLowerCase() === 'label'
          ? input.previousElementSibling.textContent?.trim()
          : input.closest('.mb-3, .form-group')?.querySelector('label')?.textContent?.trim();
        const label = prevLabel || placeholder || `Field ${idx + 1}`;
        const id = input.getAttribute('id') || `field-${idx + 1}`;
        const rows = input.tagName.toLowerCase() === 'textarea' ? parseInt(input.getAttribute('rows') || '4', 10) : undefined;

        formFields.push({
          id,
          label,
          type,
          placeholder,
          required: input.hasAttribute('required'),
          rows,
        });
      });

      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn && submitBtn.textContent) {
        submitBtnText = submitBtn.textContent.trim();
      }

      const alertMsg = form.querySelector('.alert, #formMessage');
      if (alertMsg && alertMsg.textContent) {
        successMsg = alertMsg.textContent.trim();
      }
    }
  }

  // Footer Section
  const footerSection = doc.querySelector('footer');
  let footerAuthor = name;
  let footerTagline = headline;
  const socialLinks: SocialLink[] = [];
  let copyright = `© ${new Date().getFullYear()} ${name}. All Rights Reserved.`;

  if (footerSection) {
    const fH5 = footerSection.querySelector('h5, h4');
    if (fH5 && fH5.textContent) footerAuthor = fH5.textContent.trim();

    const fP = footerSection.querySelectorAll('p');
    if (fP.length > 0 && fP[0].textContent) {
      footerTagline = fP[0].textContent.trim();
    }
    if (fP.length > 1 && fP[fP.length - 1].textContent) {
      copyright = fP[fP.length - 1].textContent.trim();
    }

    const socialAnchors = footerSection.querySelectorAll('.social-icons a, a');
    socialAnchors.forEach((a) => {
      const icon = a.querySelector('i');
      if (icon) {
        const iconClass = Array.from(icon.classList).find((c) => c.startsWith('bi-')) || 'bi-link';
        let platform = 'Link';
        if (iconClass.includes('github')) platform = 'GitHub';
        else if (iconClass.includes('linkedin')) platform = 'LinkedIn';
        else if (iconClass.includes('instagram')) platform = 'Instagram';
        else if (iconClass.includes('envelope')) platform = 'Email';
        else if (iconClass.includes('twitter')) platform = 'Twitter / X';

        socialLinks.push({
          platform,
          icon: iconClass,
          url: a.getAttribute('href') || '#',
        });
      }
    });
  }

  return {
    meta: {
      title,
      version: '1.0.0',
      language: lang,
      lastUpdated: new Date().toISOString().split('T')[0],
    },
    navigation: navItems.length > 0 ? navItems : [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Education', href: '#education' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    profile: {
      name,
      headline,
      bio,
      email: 'tanishqselukar5490@gmail.com',
      location: 'Nagpur, India',
      ctaButtons: ctaButtons.length > 0 ? ctaButtons : [
        { text: 'Explore My Portfolio', href: '#about', variant: 'primary' },
        { text: 'Contact Me', href: '#contact', variant: 'outline' },
      ],
    },
    about: {
      title: aboutTitle,
      subtitle: aboutSubtitle,
      sections: aboutSections.length > 0 ? aboutSections : [
        {
          title: 'Who Am I?',
          content: [
            'I am a second-year college student studying Electronics and Computer Science. I have a strong interest in web development and software development.',
            'I am currently improving my knowledge of HTML, CSS, Bootstrap, JavaScript and programming.',
          ],
        },
        {
          title: 'My Goal',
          content: [
            'My goal is to become a skilled software developer and build creative, responsive and user-friendly websites and applications.',
            'I believe that continuous learning and practical projects are the best ways to improve my technical skills.',
          ],
        },
      ],
    },
    skills: skills.length > 0 ? skills : [
      { id: 'skill-1', name: 'HTML', icon: 'bi-filetype-html', category: 'Frontend', description: 'Creating the structure of modern web pages.' },
      { id: 'skill-2', name: 'CSS', icon: 'bi-filetype-css', category: 'Styling', description: 'Designing attractive and responsive websites.' },
      { id: 'skill-3', name: 'Bootstrap', icon: 'bi-bootstrap', category: 'Framework', description: 'Building responsive layouts using Bootstrap.' },
      { id: 'skill-4', name: 'JavaScript', icon: 'bi-filetype-js', category: 'Programming', description: 'Learning programming and web interactivity.' },
    ],
    education: education.length > 0 ? education : [
      {
        id: 'edu-1',
        degree: "Bachelor's Degree in Electronics and Computer Science",
        institution: 'RAMDEOBABA UNIVERSITY',
        period: '2025 - Present',
        description: 'Currently studying in the second year with an interest in programming, web development and computer technologies.',
      },
    ],
    projects: projects.length > 0 ? projects : [
      {
        id: 'proj-1',
        title: 'Student Portfolio',
        description: 'A personal portfolio website created using HTML, CSS and Bootstrap to showcase my skills, education and projects.',
        tags: ['HTML', 'CSS', 'Bootstrap'],
      },
      {
        id: 'proj-2',
        title: 'College Website',
        description: 'A simple responsive college website containing information about courses, departments, facilities and contact details.',
        tags: ['HTML', 'CSS', 'Bootstrap'],
      },
      {
        id: 'proj-3',
        title: 'Calculator',
        description: 'A basic calculator project developed to practice programming concepts and JavaScript functionality.',
        tags: ['JavaScript', 'CSS'],
      },
    ],
    contact: {
      title: contactTitle,
      subtitle: contactSubtitle,
      formFields: formFields.length > 0 ? formFields : [
        { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Enter your name', required: true },
        { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
        { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Enter subject', required: true },
        { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Write your message', rows: 5, required: true },
      ],
      submitButtonText: submitBtnText,
      successMessage: successMsg,
    },
    footer: {
      author: footerAuthor,
      tagline: footerTagline,
      socialLinks: socialLinks.length > 0 ? socialLinks : [
        { platform: 'GitHub', icon: 'bi-github', url: 'https://github.com' },
        { platform: 'LinkedIn', icon: 'bi-linkedin', url: 'https://linkedin.com' },
        { platform: 'Instagram', icon: 'bi-instagram', url: 'https://instagram.com' },
        { platform: 'Email', icon: 'bi-envelope', url: 'mailto:tanishqselukar5490@gmail.com' },
      ],
      copyright: copyright,
    },
  };
}

export function portfolioDataToJsonResume(data: PortfolioData): JsonResume {
  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: data.profile.name,
      label: data.profile.headline,
      email: data.profile.email || 'tanishqselukar5490@gmail.com',
      summary: `${data.profile.bio} ${data.about.sections.map((s) => s.content.join(' ')).join(' ')}`,
      location: {
        city: data.profile.location?.split(',')[0]?.trim() || 'Nagpur',
        countryCode: 'IN',
        region: 'Maharashtra',
      },
      profiles: data.footer.socialLinks.map((s) => ({
        network: s.platform,
        username: data.profile.name.toLowerCase().replace(/\s+/g, ''),
        url: s.url,
      })),
    },
    education: data.education.map((edu) => ({
      institution: edu.institution,
      area: edu.degree.replace(/Bachelor's Degree in\s*/i, ''),
      studyType: "Bachelor's Degree",
      startDate: edu.period.split('-')[0]?.trim() || '2025',
      endDate: edu.period.split('-')[1]?.trim() || 'Present',
      description: edu.description,
    })),
    skills: data.skills.map((s) => ({
      name: s.name,
      level: s.name === 'JavaScript' ? 'Learner / Developing' : 'Competent',
      keywords: [s.category, s.description],
    })),
    projects: data.projects.map((p) => ({
      name: p.title,
      description: p.description,
      keywords: p.tags,
      roles: ['Developer', 'Student Creator'],
    })),
  };
}

export function portfolioDataToBlocks(data: PortfolioData): ContentBlock[] {
  return [
    {
      id: 'block-nav',
      type: 'navigation',
      title: 'Top Navbar',
      data: { brand: 'My Portfolio', items: data.navigation },
    },
    {
      id: 'block-hero',
      type: 'hero',
      title: 'Hero Banner',
      data: {
        name: data.profile.name,
        headline: data.profile.headline,
        bio: data.profile.bio,
        actions: data.profile.ctaButtons,
      },
    },
    {
      id: 'block-about',
      type: 'about',
      title: data.about.title,
      data: {
        subtitle: data.about.subtitle,
        sections: data.about.sections,
      },
    },
    {
      id: 'block-skills',
      type: 'skills',
      title: 'Skills Matrix',
      data: { skills: data.skills },
    },
    {
      id: 'block-education',
      type: 'education',
      title: 'Education Journey',
      data: { records: data.education },
    },
    {
      id: 'block-projects',
      type: 'projects',
      title: 'Featured Projects',
      data: { items: data.projects },
    },
    {
      id: 'block-contact',
      type: 'contact',
      title: data.contact.title,
      data: {
        subtitle: data.contact.subtitle,
        fields: data.contact.formFields,
        submitText: data.contact.submitButtonText,
      },
    },
    {
      id: 'block-footer',
      type: 'footer',
      title: 'Footer',
      data: {
        author: data.footer.author,
        tagline: data.footer.tagline,
        socials: data.footer.socialLinks,
        copyright: data.footer.copyright,
      },
    },
  ];
}

export function parseHtmlToDomAst(htmlString: string): DomAstNode {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  function nodeToAst(node: Node): DomAstNode | null {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      // Skip script and style tags to keep AST clean and human-readable
      if (['script', 'style'].includes(el.tagName.toLowerCase())) {
        return null;
      }

      const attributes: Record<string, string> = {};
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i];
        attributes[attr.name] = attr.value;
      }

      const children: DomAstNode[] = [];
      node.childNodes.forEach((child) => {
        const astChild = nodeToAst(child);
        if (astChild) children.push(astChild);
      });

      return {
        type: 'element',
        tagName: el.tagName.toLowerCase(),
        attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
        children: children.length > 0 ? children : undefined,
      };
    } else if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (!text) return null;
      return {
        type: 'text',
        textContent: text,
      };
    }
    return null;
  }

  const root = doc.body;
  const ast = nodeToAst(root);

  return (
    ast || {
      type: 'element',
      tagName: 'body',
      children: [],
    }
  );
}
