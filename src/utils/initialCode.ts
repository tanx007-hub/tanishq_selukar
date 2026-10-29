export const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Student Portfolio</title>

    <!-- Bootstrap CSS -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- Custom CSS -->
    <style>

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            color: #212529;
        }

        /* Navbar */
        .navbar {
            background-color: #111827;
        }

        .navbar-brand {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff !important;
        }

        .nav-link {
            color: #ffffff !important;
            margin-left: 15px;
        }

        .nav-link:hover {
            color: #38bdf8 !important;
        }

        /* Hero Section */
        .hero {
            min-height: 90vh;
            background: linear-gradient(135deg, #0f172a, #1e3a8a);
            color: white;
            display: flex;
            align-items: center;
        }

        .hero h1 {
            font-size: 52px;
            font-weight: bold;
        }

        .hero span {
            color: #38bdf8;
        }

        .hero p {
            font-size: 19px;
            color: #dbeafe;
        }

        /* Section */
        section {
            padding: 80px 0;
        }

        .section-title {
            text-align: center;
            margin-bottom: 50px;
        }

        .section-title h2 {
            font-weight: bold;
            color: #1e3a8a;
        }

        .section-title p {
            color: #6b7280;
        }

        /* About */
        .about-box {
            background-color: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }

        /* Skills */
        .skill-card {
            background-color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            transition: 0.3s;
        }

        .skill-card:hover {
            transform: translateY(-8px);
        }

        .skill-card i {
            font-size: 45px;
            color: #2563eb;
            margin-bottom: 15px;
        }

        /* Education */
        .education-card {
            background-color: white;
            border-left: 5px solid #2563eb;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.06);
        }

        /* Projects */
        .project-card {
            border: none;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transition: 0.3s;
            height: 100%;
        }

        .project-card:hover {
            transform: translateY(-8px);
        }

        .project-card .card-body {
            padding: 25px;
        }

        /* Contact */
        .contact-box {
            background-color: white;
            padding: 35px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }

        .form-control {
            padding: 12px;
            margin-bottom: 15px;
        }

        /* Footer */
        footer {
            background-color: #111827;
            color: white;
            text-align: center;
            padding: 25px 0;
        }

        .social-icons a {
            color: white;
            font-size: 22px;
            margin: 0 10px;
            text-decoration: none;
        }

        .social-icons a:hover {
            color: #38bdf8;
        }

        /* Mobile */
        @media (max-width: 768px) {

            .hero {
                text-align: center;
                padding: 60px 0;
            }

            .hero h1 {
                font-size: 38px;
            }

        }

    </style>

</head>

<body>

<!-- ================= NAVBAR ================= -->

<nav class="navbar navbar-expand-lg navbar-dark sticky-top">

    <div class="container">

        <a class="navbar-brand" href="#">
            My Portfolio
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu">

            <span class="navbar-toggler-icon"></span>

        </button>

        <div class="collapse navbar-collapse" id="navbarMenu">

            <ul class="navbar-nav ms-auto">

                <li class="nav-item">
                    <a class="nav-link" href="#home">
                        Home
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#about">
                        About
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#skills">
                        Skills
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#education">
                        Education
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#projects">
                        Projects
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#contact">
                        Contact
                    </a>
                </li>

            </ul>

        </div>

    </div>

</nav>


<!-- ================= HERO SECTION ================= -->

<section class="hero" id="home">

    <div class="container">

        <div class="row align-items-center justify-content-center">

            <div class="col-lg-9 text-center">

                <h1>
                    Hello, I'm <span>Tanishq Selukar</span>
                </h1>

                <h3 class="mt-3">
                    2nd Year Electronics And Computer Science Student
                </h3>

                <p class="mt-3">
                    I am a passionate student interested in Web Development,
                    Programming and Technology. I enjoy learning new skills
                    and creating simple and useful projects.
                </p>

                <a href="#about" class="btn btn-info btn-lg mt-3">
                    Explore My Portfolio
                </a>

                <a href="#contact"
                   class="btn btn-outline-light btn-lg mt-3 ms-2">
                    Contact Me
                </a>

            </div>

        </div>

    </div>

</section>


<!-- ================= ABOUT SECTION ================= -->

<section id="about">

    <div class="container">

        <div class="section-title">

            <h2>About Me</h2>

            <p>Know more about me</p>

        </div>

        <div class="row justify-content-center">

            <div class="col-lg-10">

                <div class="about-box">

                    <div class="row">

                        <div class="col-md-6">

                            <h4>Who Am I?</h4>

                            <p>
                                I am a second-year college student studying
                                Electronics and Computer Science. I have a strong interest
                                in web development and software development.
                            </p>

                            <p>
                                I am currently improving my knowledge of
                                HTML, CSS, Bootstrap, JavaScript and programming.
                            </p>

                        </div>

                        <div class="col-md-6">

                            <h4>My Goal</h4>

                            <p>
                                My goal is to become a skilled software
                                developer and build creative, responsive
                                and user-friendly websites and applications.
                            </p>

                            <p>
                                I believe that continuous learning and
                                practical projects are the best ways to
                                improve my technical skills.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- ================= SKILLS SECTION ================= -->

<section id="skills" class="bg-light">

    <div class="container">

        <div class="section-title">

            <h2>My Skills</h2>

            <p>Technologies I am learning</p>

        </div>

        <div class="row g-4">

            <div class="col-md-6 col-lg-3">

                <div class="skill-card">

                    <i class="bi bi-filetype-html"></i>

                    <h4>HTML</h4>

                    <p>
                        Creating the structure of modern web pages.
                    </p>

                </div>

            </div>


            <div class="col-md-6 col-lg-3">

                <div class="skill-card">

                    <i class="bi bi-filetype-css"></i>

                    <h4>CSS</h4>

                    <p>
                        Designing attractive and responsive websites.
                    </p>

                </div>

            </div>


            <div class="col-md-6 col-lg-3">

                <div class="skill-card">

                    <i class="bi bi-bootstrap"></i>

                    <h4>Bootstrap</h4>

                    <p>
                        Building responsive layouts using Bootstrap.
                    </p>

                </div>

            </div>


            <div class="col-md-6 col-lg-3">

                <div class="skill-card">

                    <i class="bi bi-filetype-js"></i>

                    <h4>JavaScript</h4>

                    <p>
                        Learning programming and web interactivity.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- ================= EDUCATION SECTION ================= -->

<section id="education">

    <div class="container">

        <div class="section-title">

            <h2>Education</h2>

            <p>My academic journey</p>

        </div>

        <div class="row justify-content-center">

            <div class="col-lg-9">

                <div class="education-card">

                    <h4>
                        Bachelor's Degree in Electronics and Computer Science
                    </h4>

                    <h6 class="text-primary">
                        RAMDEOBABA UNIVERSITY
                    </h6>

                    <p class="text-muted">
                        2025 - Present
                    </p>

                    <p>
                        Currently studying in the second year with an
                        interest in programming, web development and
                        computer technologies.
                    </p>

                </div>
            </div>

        </div>

    </div>

</section>


<!-- ================= PROJECTS SECTION ================= -->

<section id="projects" class="bg-light">

    <div class="container">

        <div class="section-title">

            <h2>My Projects</h2>

            <p>Some of my academic and personal projects</p>

        </div>

        <div class="row g-4">


            <!-- Project 1 -->

            <div class="col-md-6 col-lg-4">

                <div class="card project-card">

                    <div class="card-body">

                        <h4 class="card-title">
                            Student Portfolio
                        </h4>

                        <p class="card-text">
                            A personal portfolio website created using
                            HTML, CSS and Bootstrap to showcase my
                            skills, education and projects.
                        </p>

                        <span class="badge bg-primary">
                            HTML
                        </span>

                        <span class="badge bg-info">
                            CSS
                        </span>

                        <span class="badge bg-success">
                            Bootstrap
                        </span>

                    </div>

                </div>

            </div>


            <!-- Project 2 -->

            <div class="col-md-6 col-lg-4">

                <div class="card project-card">

                    <div class="card-body">

                        <h4 class="card-title">
                            College Website
                        </h4>

                        <p class="card-text">
                            A simple responsive college website containing
                            information about courses, departments,
                            facilities and contact details.
                        </p>

                        <span class="badge bg-primary">
                            HTML
                        </span>

                        <span class="badge bg-info">
                            CSS
                        </span>

                        <span class="badge bg-success">
                            Bootstrap
                        </span>

                    </div>

                </div>

            </div>


            <!-- Project 3 -->

            <div class="col-md-6 col-lg-4">

                <div class="card project-card">

                    <div class="card-body">

                        <h4 class="card-title">
                            Calculator
                        </h4>

                        <p class="card-text">
                            A basic calculator project developed to
                            practice programming concepts and
                            JavaScript functionality.
                        </p>

                        <span class="badge bg-warning text-dark">
                            JavaScript
                        </span>

                        <span class="badge bg-info">
                            CSS
                        </span>

                    </div>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- ================= CONTACT SECTION ================= -->

<section id="contact">

    <div class="container">

        <div class="section-title">

            <h2>Contact Me</h2>

            <p>Feel free to get in touch with me</p>

        </div>

        <div class="row justify-content-center">

            <div class="col-lg-8">

                <div class="contact-box">

                    <form id="contactForm">

                        <div class="row">

                            <div class="col-md-6">

                                <label class="form-label">
                                    Your Name
                                </label>

                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter your name">

                            </div>


                            <div class="col-md-6">

                                <label class="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Enter your email">

                            </div>

                        </div>


                        <label class="form-label">
                            Subject
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter subject">


                        <label class="form-label">
                            Message
                        </label>

                        <textarea
                            class="form-control"
                            rows="5"
                            placeholder="Write your message"></textarea>


                        <button
                            type="submit"
                            class="btn btn-primary mt-3">

                            Send Message

                        </button>

                        <div id="formMessage" class="alert alert-success mt-3 d-none" role="alert">
                            Thank you! Your message has been submitted successfully.
                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- ================= FOOTER ================= -->

<footer>

    <div class="container">

        <h5>
            Tanishq Selukar
        </h5>

        <p>
            2nd Year Electronics and Computer Science Student
        </p>

        <div class="social-icons">

            <a href="#">
                <i class="bi bi-github"></i>
            </a>

            <a href="#">
                <i class="bi bi-linkedin"></i>
            </a>

            <a href="#">
                <i class="bi bi-instagram"></i>
            </a>

            <a href="#">
                <i class="bi bi-envelope"></i>
            </a>

        </div>

        <hr>

        <p class="mb-0">
            © 2026 Tanishq Selukar. All Rights Reserved.
        </p>

    </div>

</footer>


<!-- Bootstrap JavaScript -->

<script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
</script>

<script>
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        formMessage.classList.remove("d-none");
        contactForm.reset();
    });
</script>

</body>

</html>`;
