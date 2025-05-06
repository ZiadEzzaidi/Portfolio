document.addEventListener("DOMContentLoaded", function () {
  // Project data
  const projects = [
    {
      id: 1,
      title: "Client Task Portal",
      description:
        "Serverless project & task tracker for freelancers with client access, real-time updates, and file sharing.",
      tech: ["React", "AWS", "Lambda", "DynamoDB", "Cognito"],
      repo: "#",
      specs: [
        "Frontend: React on AWS S3/CloudFront",
        "Backend: Serverless (Lambda/API Gateway)",
        "Database: DynamoDB",
        "Auth: Cognito",
        "CI/CD: GitHub Actions",
      ],
    },
    {
      id: 2,
      title: "AWS Infrastructure Kit",
      description:
        "Automated production-ready AWS environments for web apps using Infrastructure as Code",
      tech: ["AWS", "Terraform", "CloudFormation", "CI/CD"],
      repo: "#",
      specs: [
        "VPC, EC2, RDS, S3, CloudFront setup",
        "Terraform/CloudFormation templates",
        "CI/CD pipeline integration",
        "Security: IAM, CloudWatch, SSM",
      ],
    },
    {
      id: 3,
      title: "Sunglass Poker",
      description: "Texas Hold'em poker game",
      tech: ["React", "Node", "MongoDB"],
      repo: "https://github.com/ZiadEzzaidi/Sunglass_Poker",
      specs: ["Frontend: React", "Backend: Node.js", "Database: MongoDB"],
    },
  ];

  // Create cards
  const grid = document.querySelector(".projects-grid");
  grid.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.id = project.id;
    card.innerHTML = `
      <div class="project-header">
        <h3>${project.title}</h3>
        <button class="expand-btn" aria-expanded="false">+</button>
      </div>
      <div class="project-details">
        <p>${project.description}</p>
        <div class="tech-stack">
          ${project.tech.map((t) => `<span>${t}</span>`).join("")}
        </div>
        <ul class="specs">
          ${project.specs.map((s) => `<li>${s}</li>`).join("")}
        </ul>
        <a href="${project.repo}" class="repo-link">View Repository</a>
      </div>
    `;
    grid.appendChild(card);
  });

  // Handle expand/collapse
  document.querySelectorAll(".expand-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();

      const card = this.closest(".project-card");
      const content = card.querySelector(".project-details");
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      // First collapse all other cards
      document.querySelectorAll(".project-card").forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains("expanded")) {
          otherCard.classList.remove("expanded");
          const otherBtn = otherCard.querySelector(".expand-btn");
          otherBtn.setAttribute("aria-expanded", "false");
          otherBtn.textContent = "+";
        }
      });

      // Then toggle current card
      this.setAttribute("aria-expanded", !isExpanded);
      this.textContent = isExpanded ? "+" : "−";
      card.classList.toggle("expanded");
    });
  });
});
