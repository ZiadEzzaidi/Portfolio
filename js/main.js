document.addEventListener('DOMContentLoaded', function () {
  // Skills data
  const skills = [
    { name: 'AWS', category: 'Cloud', level: 85, icon: '☁️' },
    { name: 'Docker', category: 'DevOps', level: 80, icon: '🐳' },
    { name: 'Kubernetes', category: 'DevOps', level: 75, icon: '⚡' },
    { name: 'Terraform', category: 'IaC', level: 85, icon: '🏗️' },
    { name: 'Linux', category: 'OS', level: 90, icon: '🐧' },
    { name: 'Python', category: 'Language', level: 80, icon: '🐍' },
    { name: 'Bash', category: 'Scripting', level: 85, icon: '💻' },
    { name: 'CI/CD', category: 'DevOps', level: 80, icon: '🔄' },
    { name: 'Ansible', category: 'Automation', level: 75, icon: '⚙️' },
    { name: 'Jenkins', category: 'DevOps', level: 70, icon: '🔨' },
    { name: 'Git', category: 'VCS', level: 85, icon: '📝' },
    { name: 'CloudFormation', category: 'IaC', level: 75, icon: '📋' },
  ];

  // Populate skills grid
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = skills
      .map(
        skill => `
      <div class="skill-card">
        <div class="skill-icon">${skill.icon}</div>
        <h3>${skill.name}</h3>
        <div class="skill-category">${skill.category}</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: ${skill.level}%"></div>
        </div>
        <div class="skill-level">${skill.level}%</div>
      </div>
    `
      )
      .join('');
  }

  // Project data
  const projects = [
    {
      id: 1,
      title: 'Client Task Portal',
      description:
        'Serverless project & task management platform with client portal access, real-time updates, and secure file sharing capabilities.',
      tech: ['React', 'AWS', 'Lambda', 'DynamoDB', 'Cognito'],
      repo: '#',
      specs: [
        'Frontend: React on AWS S3/CloudFront',
        'Backend: Serverless (Lambda/API Gateway)',
        'Database: DynamoDB',
        'Auth: Cognito',
        'CI/CD: GitHub Actions',
      ],
    },
    {
      id: 2,
      title: 'AWS Infrastructure Kit',
      description:
        'Production-grade AWS infrastructure templates for scalable web applications, featuring automated deployment and security best practices',
      tech: ['AWS', 'Terraform', 'CloudFormation', 'CI/CD'],
      repo: '#',
      specs: [
        'Multi-AZ VPC with public/private subnets',
        'Auto-scaling EC2 instances with load balancing',
        'RDS with automated backups and encryption',
        'CloudFront CDN with S3 origin',
        'Comprehensive monitoring with CloudWatch',
        'Security: IAM roles, SSM Parameter Store, WAF',
      ],
    },
    {
      id: 3,
      title: 'Sunglass Poker',
      description:
        "Full-stack Texas Hold'em poker application with real-time multiplayer functionality and responsive design",
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      repo: 'https://github.com/ZiadEzzaidi/Sunglass_Poker',
      specs: [
        'Frontend: React with modern hooks and context',
        'Backend: Node.js with Express framework',
        'Database: MongoDB with optimized queries',
        'Real-time communication via Socket.io',
        'Responsive design for mobile and desktop',
      ],
    },
  ];

  // Create cards
  const grid = document.querySelector('.projects-grid');
  grid.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.innerHTML = `
      <div class="project-header">
        <h3>${project.title}</h3>
        <button class="expand-btn" aria-expanded="false">+</button>
      </div>
      <div class="project-details">
        <p>${project.description}</p>
        <div class="tech-stack">
          ${project.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
        <ul class="specs">
          ${project.specs.map(s => `<li>${s}</li>`).join('')}
        </ul>
        <a href="${project.repo}" class="repo-link">View Repository</a>
      </div>
    `;
    grid.appendChild(card);
  });

  // Handle expand/collapse
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();

      const card = this.closest('.project-card');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // First collapse all other cards
      document.querySelectorAll('.project-card').forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('expanded')) {
          otherCard.classList.remove('expanded');
          const otherBtn = otherCard.querySelector('.expand-btn');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.textContent = '+';
        }
      });

      // Then toggle current card
      this.setAttribute('aria-expanded', !isExpanded);
      this.textContent = isExpanded ? '+' : '−';
      card.classList.toggle('expanded');
    });
  });

  // Mobile navigation toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // Navbar background on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Animate skill progress bars when they come into view
  const observerCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.skill-progress');
        if (progressBar) {
          progressBar.style.width = progressBar.style.width || '0%';
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
  });

  document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
  });
});
