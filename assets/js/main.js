function scroll_header() {
    const nav = document.getElementById("main-nav");
    if (window.pageYOffset >= 80) {
        nav.classList.add('scroll-header');
    }
    else {
        nav.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scroll_header);
document.addEventListener('DOMContentLoaded', loadMediaPartner);

/*===========================================================OVERVIEW AND MILESTONE SECTION===============================================*/
let valueDisplays = document.querySelectorAll('.num');
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute('data-val'));
    // console.log(endValue);
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;
        if (startValue == endValue) {
            clearInterval(counter);
        }
    }, duration)
});

/*============================================================TIMELINE section======================================================================*/
function qs(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}
  
const sections = qs('.line_section', true);
const timeline = qs('.timeline');
const line = qs('.line');
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * .8;
  
function scrollHandler(e) {
    const {
      scrollY
    } = window;
    up = scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;
  
    const dist = targetY - timelineRect.top;
    // console.log(dist);
  
    if (down && !full) {
      set = Math.max(set, dist);
      line.style.bottom = `calc(100% - ${set}px)`;
    }
  
    if (dist > timeline.offsetHeight + 50 && !full) {
      full = true;
      line.style.bottom = `-50px`;
    }
  
    sections.forEach(item => {
      // console.log(item);
        const rect = item.getBoundingClientRect(); //     console.log(rect);
  
        if (rect.top + item.offsetHeight / 5 < targetY) {
            item.classList.add('show-me');
        }
    }); // console.log(up, down);
  
    prevScrollY = window.scrollY;
}
 
scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler);

let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

let dd = document.getElementById('dd');
let hh = document.getElementById('hh');
let mm = document.getElementById('mm');
let ss = document.getElementById('ss');

let daydot = document.querySelector('.day_dot');
let hr_dot = document.querySelector('.hr_dot');
let min_dot = document.querySelector('.min_dot');
let sec_dot = document.querySelector('.sec_dot');

let endDate = '04/10/2025, 00:00:00';
// date format: mm/dd/yy

let x = setInterval(function () {
    let countdown = new Date(endDate).getTime();
    let now = new Date().getTime();
    let distance = countdown - now;

    // time calculation for days, hours, minutes and seconds'
    let d = Math.floor(distance / (1000 * 60 * 60 * 24))
    let h = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    let m = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))
    let s = Math.floor(distance % (1000 * 60) / (1000))

    // output the result in element with id
    days.innerHTML = d + "<br><span>Days</span>";
    hours.innerHTML = h + "<br><span>Hours</span>";
    minutes.innerHTML = m + "<br><span>Minutes</span>";
    seconds.innerHTML = s + "<br><span>Seconds</span>";

    // animate stroke
    dd.style.strokeDashoffset = 440 - (440 * d) / 365;
    hh.style.strokeDashoffset = 440 - (440 * h) / 24;
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;

    // animate circle dots
    daydot.style.transform = `rotateZ(${d * 0.986}deg)`;
    hr_dot.style.transform = `rotateZ(${h * 15}deg)`;
    min_dot.style.transform = `rotateZ(${m * 6}deg)`;
    sec_dot.style.transform = `rotateZ(${s * 6}deg)`;
});

/*============================================================TIMELINE END======================================================================*/

if(screen.width<500){
    var radius = 360;
}
else{
    var radius = 360;

}
var autoRotate = true;
var rotateSpeed = -90;
var imgWidth = 190;
var imgHeight = 230;

setTimeout(init, 1000);

var odrag = document.getElementById('drag');
var ospin = document.getElementById('spin');
var aImg = document.getElementsByClassName('image');
var aEle = [...aImg];
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

var container = document.getElementsByClassName('hostnpartners');



function init(delayTime) {
    for (let i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY("
            + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
    odrag.style.transform = "rotateX(0deg)";
}

function applyTransform(obj) {
    if (tY > 0) tY = 0;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX("
        + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
    ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 0;

if (autoRotate) {
    var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    var sX = e.clientX,
        sY = e.clientY;


    this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;

        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;

        applyTransform(odrag);
        sX = nX;
        sY = nY;
    };

    this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
            desX *= 0.99;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;

            applyTransform(odrag);
            playSpin(false);


            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }

        }, 17);

        this.onpointermove = this.onpointerup = null;
    };

    return false;
}

/*============================================================ MEDIA PARTNERS ======================================================================*/

function loadMediaPartner() {
    const mediaPartnersData = {
        name: ["GOOGLE DEVELOPER GROUPS ON CAMPUS UNIVERSITY MALAYA", 
               "MONASH SCHOOL OF IT (SOIT)",
               "UNIVERSITY MALAYA ENTREPENUERSHIP SECRETARIAT (UMES)",
               "GOOGLE DEVELOPER STUDENT CLUB (GDSC)",
               "HELP INFORMATION TECHNOLOGY STUDENT COUNCIL (ITSC)",
               "APU Forensic & Cybersecurity Research Centre - Student Section (FSEC-SS)",
               "ENGINEERING SOCIETY OF UNIVERSITI MALAYA",
               "PERSATUAN MAHASISWA TEKNOLOGI KOMPUTER (PETAKOM)",
               "INSTITUTION OF MECHANICAL ENGINEERS UNIVERSITI MALAYA STUDENT CHAPTER (IMechE UM SC)",
               "GOOGLE DEVELOPER GROUPS ON CAMPUS UNIVERSITI SAINS MALAYSIA (GDGoC USM)",
               "PERSATUAN MAHASISWA FAKULTI KOMPUTERAN DAN INFORMATIK (PMFKI)",
               "PROGRAMMIMG LEAGUE NATIONAL (PLN)",
               "i-UM DISRUPT",
               "INTELLIGENCE MACHINE CLUB UKM (I-MACHINE)",
               "IT Society MMU",
               "MALAYSIAN YOUTH FINTECH ASSOCIATION (MYFinT)",
               "UNIVERSITI MALAYA STARTUP COMMUNITY (UMSCOM)",
               "INTERACTIVE MULTIMEDIA CLUB (IMeC)",
               "Google Developer Groups on Campus UTM (GDGoC UTM)",
               "UTAR COMPUTER SOCIETY (UTAR COMPSOC)",
               "AGENTS OF TECH",
               "Google Developer Group on Campus Universiti Putra Malaysia (GDGoC UPM)",
               "MAJLIS PERWAKILAN FAKULTI KOMPUTER SAINS DAN TEKNOLOGI MAKLUMAT (ComCil) UPM",
               "UMALAYA RADII",
               "SUNWAY ANALYTICS SOCIETY (SAS)",
               "PERSATUAN MAHASISWA FAKULTI TEKNOLOGI DAN SAINS MAKLUMAT UKM (PERTAMA)",
               "I.D.E.A. FAIR USM ",
               "MYTECH Career Fair 2025",
               "ROBOTICS ENGINEERING COMMUNITY (REC UM)",
               "DEVELOPER STUDENT CLUBS UNIVERSITI KUALA LUMPUR (DSC UNIKL)",
               "Sunway's Cybersecurity Club (Sunway CSC)",
               "Google Developer Groups on Campus (GDGoC) Sunway University ",
               "UTAR MBOT STUDENT CHAPTER (UTAR MBOT)",
               "UNIVERSITY MALAYA DATA ANALYTICS CLUB(UMDAC)",
               "XMUM Artificial Intelligence Club (MINDS)",
               "APU Artificial Intelligence Club (APU AIC)",
               "COMPUTER SCIENCE SOCIETY USM (CSS USM)",
               "SUNWAY BLOCKCHAIN CLUB (SBCC)",
               "MazeCraze 2025",
               "ENGINEERING STUDENTS&apos; SOCIETY IIUM (ENGINIUS)",
               "COMPUTER FORENSIC CLUB (CFC)",
               "INFORMATION and COMMUNICATION TECHNOLOGY STUDENTS&apos; SOCIETY (ICTSS)",
               "UniLah",
               "SYNTECH Organization UTP (SYNTECH)",
               "GOOGLE DEVELOPER GROUPS ON CAMPUS (GDGOC) INTERNATIONAL ISLAMIC UNIVERSITY MALAYSIA (IIUM)",
               "UITM BLOCKCHAIN ASSOCIATION (UBA)",
               "PERSATUAN EKONOMI UNIVERSITI MALAYA (PEKUMA)",
        ],
        description: ["Google Developer Group (GDG) on Campus Universiti Malaya is a program presented by Google Developers. GDG on Campus UM is a university-based community group for UM undergraduates and graduates interested in growing as a developer.\n\nBy joining GDG on Campus UM, students grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and communities. We aim to make Google technologies accessible to anyone. As long as you have the enthusiasm to learn and the passion for knowledge, you would fit right into our GDG on Campus culture!", 
                      "Monash School of IT is a student association club that aims to organize events to increase networking and learning opportunities while supporting students in their studies and well-being. We strive to create a welcoming environment where students can connect with peers, gain valuable skills, and navigate their academic and career journey with confidence.",
                      "University Malay Entrepenuership Secretariat is a secretariat directly under PKPP HEP UM supervision. This club focus solely on emphasizing entrepenuership ecosystem around University Malaya and helping student in needs by guiding in developing their business and startups towards commercialisation phase.",
                      "Google Developer Student Club (GDSC) SEGi University is a student community supported by Google Developers dedicated to learning and building solutions for the community.",
                      "We are the Information Technology Student Council (ITSC) from HELP University, committed to empowering students through knowledge, business, and recreation. Our focus includes enhancing skills, fostering entrepreneurship, and promoting creativity to drive professional growth and community well-being. Through these efforts, ITSC cultivates learning, collaboration, and leadership to build a strong and innovative IT community.",
                      "The APU Forensics and Cyber Security Research Center - Student Section (FSeC-SS) is a student chapter of FSec-SS that addresses market demands and future technology needs through nurturing collaborative industry research and developing graduates&apos; employability skills set in the areas of digital forensics, cybersecurity and privacy. By providing a platform for the exchange of ideas, shared challenges and research solutions between academia, industry and the international cybersecurity community, FSeC promotes and supports the development of talent and creative thinking towards cybersecurity. ",
                      "Founded in 1958, the Engineering Society of Universiti Malaya (ESUM) is the largest and most influential society within the Faculty of Engineering,  supported by both academia and industry. In consortium with the Institution of Engineers Malaysia Universiti Malaya Student Section (IEM UM SS) established during the 2022/2023 session, ESUM continues to elevate engineering education and student development, fostering a robust bridge between academic learning and professional practice.",
                      "Persatuan Mahasiswa Teknologi Komputer (PETAKOM) epitomizes the spirit of innovation and collaboration at Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA). With a vibrant community of tech enthusiasts, PETAKOM serves as a catalyst for transformative change in the field of computer technology. Through its dynamic events, interactive workshops, and hands-on projects, PETAKOM cultivates a culture of creativity, critical thinking, and problem-solving. Committed to excellence and driven by passion, PETAKOM empowers its members to harness the power of technology for the greater good, paving the way for a brighter, more technologically advanced future.",
                      "IMechE UM SC, established in the Faculty of Engineering of Universiti Malaya with over 500 active members, is an entirely non-profitable, self-sustaining student-run society. With the vision of “improving the world through engineering”, we strive to deliver a platform to provide exposure and networking opportunities to the students through a series of impactful events, which includes industrial visits, industrial talks, case study competitions, etc. and was awarded the Best Student Chapter for sessions 2020/2021 and 2022/2023 by IMechE Malaysia Branch and Best Student Chapter of the Year 2022 by IMechE International Young Members&apos; Committee.",
                      "Google Developer Groups (GDG) on Campus, previously known as Google Developer Student Clubs, is a part of the Google Developer Groups (GDGs) community where developers can connect, learn, and grow. GDG on Campus USM shares a vision of advancing students' personal and professional development by broadening their knowledge and refining their soft skills. We emphasise fostering peer-to-peer learning environments, providing a supportive platform and exposing students to Google technologies that complement their academic pursuits with valuable skill sets. We also offer a platform for cultivating a culture of growth that enhances interpersonal connections among students. Students from all undergraduate and graduate with an interest in growing as a developer are welcome.",
                      "PMFKI : We are the proud representatives of the students from the Faculty of Computing and Informatics (FKI) at the main campus in Kota Kinabalu, Sabah. We are on a mission to deliver impactful programs and initiatives that foster student innovation, personal growth, and community building, while bridging the gap between academic learning and industry practices. Guided by our vision To be a leading student association that champions the welfare of Faculty of Computing and Informatics (FKI) students while gaining widespread recognition through impactful programs and initiatives. PMFKI lives by its slogan : Nurturing Innovation, Building Connections, we strive to inspire creativity, collaboration, and success in everything we do.",
                      "The most anticipated annual programming competition for university students in Malaysia.",
                      "An annual innovation competition held by the student council of Second Residential College, Universiti Malaya.",
                      "Intelligence Machine Club is 1 of 8 Special Interest Group in FTSM UKM, with primary focus on artificial intelligence (AI) and machine learning (ML). Other than that, our club provides a platform for members to explore advancements in these fields, collaborate on projects, and share knowledge. We also conduct workshops for students aged 9-15 years old, which introduce coding and AI basics every years, and organize site visits for our club member to prominent tech companies in Malaysia. By fostering innovation and bridging academia with industry, we aim to nurture the next generation of tech leaders. In conclusion, based on 3 objective that we held or handle it focus on, 1)Input to our club members (by site visit exposure and teaching), 2)Output from our club members to community(teaching AI and ML to middleschool and highschool students and 3)Had a great bonding with our club member for better and fun work flow in our club.",
                      "IT Society MMU Cyberjaya is a faculty-based university club run by a large group of students who are passionate about computer science and technology. Based in Cyberjaya and closely affiliated with the esteemed Faculty of Computing and Informatics at MMU Cyberjaya Campus, we organize plenty of tech talks, workshops, tech events, and industry visits for young-budding students!",
                      "The Malaysian Youth FinTech Association (MYFinT) is a youth-led, non-profit organization and the official youth arm of the FinTech Association of Malaysia (FAOM). Targeting individuals from 18-year-old college students to young professionals up to 35, MYFinT is dedicated to acting as an umbrella society that facilitates the growth of Malaysia&apos;s FinTech industry.",
                      "Universiti Malaya Startup Community (UMSCOM) is a club that aims to provide students with startup knowledge and showcase student&apos;s startup projects.",
                      "Interactive Multimedia Club (IMEC) at Universiti Kebangsaan Malaysia (UKM) is a student-led organization dedicated to fostering creativity and innovation in multimedia and technology. IMEC provides a platform for students to develop skills in areas such as graphic design, video production, animation, and interactive content creation. Through workshops, events, and team-building activities, the club promotes collaboration and practical learning among members. IMEC also encourages participation in multimedia-related competitions and projects, helping students build portfolios and industry-ready skills. The club serves as a hub for like-minded individuals passionate about blending technology and creativity.",
                      "Google Developer Groups on Campus at Universiti Teknologi Malaysia strives to enhance the educational, professional, social, and a peer-to-peer learning environment of UTM by being including any and every student at UTM, by transferring knowledge to students, by preparing them for what they might need in job market, and by helping them find their passion in something that they love doing in tech. And we aspire to create a safe space where students with diverse majors and can connect, learn new technical and leadership skills, and grow both as individuals and as a community! ",
                      "“Meet Intelligence Here” We are UTAR Computer Society! A community that brings together like-minded tech enthusiasts, aiming to develop a healthy yet intensive coding environment in UTAR Kampar through tech-driven interesting events. Our goal? To sharpen your skills, boost industry knowledge, and help you grow professionally.",
                      "AoT provides events to get people equipped with 21th Century tech skillset.",
                      "Google Developer Group (GDG) UPM is a powerful community of developers at the University of Putra Malaysia (UPM). We bring together tech enthusiasts to learn, collaborate, and create through events, workshops, and hands-on projects. As part of the global GDG network, we focus on giving developers the skills and tools they need to build innovative solutions. Our mission is to connect, learn, and grow with developers to make a real impact in their communities and the world.",
                      "The Computer Science and Information Technology Faculty Representative Council (ComCil) at Universiti Putra Malaysia (UPM) connects students, lecturers, and staff of FCSIT. ComCil promotes academic success and personal growth by overseeing four clubs: Network Club (NC), Multimedia Club (MMC), Software Engineering Club (SEC), and Computer Science Club (CSC). These clubs help students develop leadership and soft skills, preparing them for professional careers while strengthening the faculty&apos;s community. Through various initiatives and activities, ComCil fosters a holistic learning environment, ensuring students gain both technical expertise and essential interpersonal skills needed for future success.",
                      "Umalayaradio specializing in marketing, publicity, and event management to spread creativity and knowledge in Universiti Malaya. Known for our top-notch newsletter, we keep students informed while also organizing major events. From promotions to production, we make campus events unforgettable.",
                      "Based in Sunway University, SAS bridges academia & industry, fostering data analytics skills & opportunities.",
                      "Persatuan Mahasiswa Fakulti Teknologi dan Sains Maklumat, (PERTAMA) Universiti Kebangsaan Malaysia merupakan sebuah badan kepimpinan pelajar bagi mahasiswa/i Fakulti Teknologi dan Sains Maklumat. PERTAMA bertindak sebagai pengantara bagi mahasiswa/i FTSM dan pentadbiran fakulti. Persatuan ini juga menjalankan pelbagai aktiviti bagi pelajar di Fakulti Teknologi dan Sains Maklumat bertujuan bagi merapatkan hubungan sesama pelajar, pensyarah dan juga masyarakat sekeliling sebagai persediaan kepada mahasiswa/i FTSM bagi menghadapi cabaran sebenar di alam pekerjaan kelak. PERTAMA berfungsi bukan hanya kepada aspek kebajikan semata-mata malahan meliputi segenap aspek yang mendekatkan mahasiswa/i FTSM terhadap pelbagai isu semasa dan menyeselaikan permasalahan yang timbul dalam kalangan mahasiswa/i FTSM.",
                      "I.D.E.A. Fair USM is a platform for Innovation, Design, Engineering, and Arts. Since our first debut in 2015, we&apos;ve attracted more visitors each year, providing Malaysian youth with opportunities to showcase their talents and explore STEM fields.",
                      "MYTECH 2025 originated as a small fair in 2019, initiated by PEKOM (Persatuan Komputer Universiti Malaya) and FCSIT (Faculty of Computer Science and Information Technology). Over the years, it has grown into a significant career fair, connecting students with leading tech companies. Our goal is to provide students with valuable networking opportunities, industry insights, and a direct pathway to internships and potential careers. Through physical engagement, we bridge the gap between students and the professional tech industry, empowering future talents to thrive in their careers.",
                      "Robotics Engineering Community, REC is a robotics club established in April 2019 at Universiti Malaya. The community is now led by a group of engineering students who aim at fostering a platform for engineering students to expand their interests and skills such as in robot designing, programming, complex thinking skills, and teamwork, hoping to be more inclusive of different engineering fields in the future.\n\nREC has accumulated 4 years of experience in the Robocon competition, as the established goals of REC are not only sharing knowledge but actively seeking challenges of their own. Robocon members can learn more esoteric knowledge in the preparatory phase and build their skills on a solid foundation of knowledge in math and science principles.",
                      "Developer Student Clubs UniKL provides students with resources to develop skills in web, mobile, and AI.",
                      "Our club hopes to create a safe space for Cybersecurity & Linux enthusiasts, by organizing exciting events, such as debates, workshops, and conferences on Sunway campus!",
                      "We&apos;re a club where students can join our events like workshops and hands on session with Google technologies ",
                      "UTAR MBOT STUDENT CHAPTER is a society that focuses on providing students with technology-related knowledge and skills outside university&apos;s syllabus, mainly in computer science field. Our vision is to make our software engineering students future-ready for tech work and to make UTAR a better place for future software engineering students.",
                      "We ignite data analytics careers with essential knowledge,hands-on projects,skill development, and industry insights.",
                      "The XMUM Artificial Intelligence Club (MINDS) is a student-led organization at Xiamen University Malaysia dedicated to exploring and advancing artificial intelligence. MINDS (Machine Intelligence And Data Science) provides a platform for students to develop AI-related skills through workshops, projects, and competitions. Members gain hands-on experience with AI technologies, network with industry professionals, and engage in research initiatives.",
                      "🌟 Dive into the world of AI with APU AIC! 🚀✨ Join us as we embark on a journey of exciting activities and immersive experiences. From thrilling competitions that challenge your AI skills to enlightening seminars that unravel the latest industry trends, there's something for everyone. 💡",
                      "Computer Science Society USM is a progressive student-led organization committed to providing unparalleled support to USM Computer Science students through visionary and transformative initiatives.",
                      "We aim to give students the opportunity to learn, network, and innovate in the blockchain space.",
                      "MazeCraze 2025 is a robotics competition focusing on autonomous navigation and intelligent control systems. Participants will form teams of 4 to 5 to design and program autonomous robotic cars that navigate a dynamic maze, aiming for  tackling in-maze challenges. The competition emphasizes hardware programming, sensor fusion, control algorithms, and embedded systems, pushing participants to develop innovative solutions and enhance their robotics skills in a real-world setting.",
                      "The Engineering Students&apos; Society of IIUM (ENGINIUS) represents engineering students within the university&apos;s Kulliyyah of Engineering. It fosters a dynamic academic and social environment by organizing programs that enhance both professional and personal growth. More than just an organization, ENGINIUS is a supportive community dedicated to nurturing future engineers. Through its commitment to academic excellence, professional development, and student welfare, it plays a vital role in shaping competent, ethical, and innovative engineers. By equipping students with essential skills and values, ENGINIUS ensures they contribute positively to society and the engineering field.",
                      "The Computer Forensic Club (CFC) at Management & Science University (MSU) is a student-led organization under the Faculty of Information Science and Engineering (FISE), specifically within the Information Science and Computing Department. Despite its name, CFC is a club that covers all aspects of IT, including software development, networking, data analysis, artificial intelligence, and emerging technologies. The club organizes IT-related events, workshops, industry talks, and hands-on training to enhance students&apos; skills and knowledge in the tech field. CFC serves as a platform for students to collaborate, innovate, and gain real-world IT experience, preparing them for future careers in the technology industry.",
                      "The Information and Communication Technology Student Society (ICTSS) at IIUM represents students of the Kulliyyah of Information and Communication Technology (KICT). ICTSS aims to empower future IT professionals by enhancing communication skills, fostering leadership, and providing industry exposure. With a focus on integration, responsibility, and virtue, the society organizes various programs, workshops, and events to support students&apos; academic and professional growth. ICTSS also serves as a platform for networking and collaboration, bridging the gap between students, alumni, and industry experts. Through its initiatives, ICTSS strives to create a vibrant and dynamic ICT community within IIUM.",
                      "UniLah is the everything company for students—events, discounts, jobs, and more. We run media, campus events, and brand collabs to connect students with top opportunities. 🚀",
                      "Science and Technology (SYNTECH) Organization is a dynamic tech club dedicated to cultivating talents and crafting remarkable projects. We provide a welcoming, inclusive environment where members, whether beginners or experts, can thrive.",
                      "GDG on Campus IIUM is a vibrant community that empowers students to explore technology, enhance their skills, and innovate through hands-on workshops, collaborative projects, and networking opportunities. Whether you're a beginner or an experienced developer, join us to learn, grow, and build impactful solutions together! ",
                      "UiTM Blockchain Association is a student-led club based in UiTM Jasin, Melaka, dedicated to nurturing student talent in blockchain development. We empower students with hands-on experience, industry connections, and cutting-edge knowledge in Web3 technologies.",
                      "University of Malaya Economics Society (Persatuan Ekonomi Universiti Malaya in BM) or more fondly known as PEKUMA has a long and distinguished history dating back to its formation in year 1975. For over four decades, PEKUMA has been actively involved in organizing activities for undergraduates; primarily those of the Faculty of Economics and Administration, University of Malaya.",
        ]   
    }

    const mediaPartners = document.getElementById("media-partner-carousel");
    for (let index = 0; index < mediaPartnersData.name.length; index++) {
        const div = document.createElement('div');
        div.id = `carousel-item${index}`;
        div.classList.add('carousel-item', 'justify-content-center', 'align-content-center', 'text-center', 'pb-4', 'pt-4', 'h-100');
        if(index == 0) {
            div.classList.add('active');
        }
        mediaPartners.appendChild(div);

        const title = document.createElement('h3');
        title.innerHTML = mediaPartnersData.name[index];
        title.classList.add('text-white', 'fw-bold', 'mb-4');
        div.appendChild(title);

        const img = document.createElement('img');
        img.src = `assets\\images\\media-partner\\${index + 1}MP.png`;
        img.alt = mediaPartnersData.name[index];
        img.classList.add('img-fluid', 'mb-4', 'bg-white');
        if(index == 1  || index == 21 || index == 30 || index == 35 || index == 37 || index == 38){
            img.classList.remove('bg-white');
        }
        div.appendChild(img);

        const description = document.createElement('p');
        description.innerHTML = mediaPartnersData.description[index];
        description.classList.add('media-partner-description', 'text-wrap');
        div.appendChild(description);
    }
};


/*============================================================ FOOTER ======================================================================*/
// Make the icon glow when hover the footer text
// const tnc = document.getElementById('tnc');
// const doc_icon = document.getElementById('doc-icon');
// const flw_us = document.getElementById('flw-us');
// const social_icon = document.getElementById('social-icon');

// tnc.addEventListener('mouseover', () => {
//     doc_icon.classList.add('icon-glow');
// });
// flw_us.addEventListener('mouseover', () => {
//     social_icon.classList.add('icon-glow');
// });

// tnc.addEventListener('mouseout', () => {
//     doc_icon.classList.remove('icon-glow');
// });
// flw_us.addEventListener('mouseout', () => {
//     social_icon.classList.remove('icon-glow');
// });

function scrollTop(){
    const scrollY = window.pageYOffset
    const nav = document.getElementsByClassName('um_header')
    if(scrollY >= 80){
        nav.classList.add('header_transparent')
    }
    else{
        nav.classList.remove('header_transparent')
    }
}
window.addEventListener('scroll',scrollTop)



/*============================================================ ??? ======================================================================*/
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var konamiCodePosition = 0;
document.addEventListener('keydown', function (e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];
    if (key == requiredKey) {
        konamiCodePosition++;
        if (konamiCodePosition == konamiCode.length) {
            activated();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});
function activated() {
    alert("You activated the easter egg!");
    window.location.href = "./assets/index2.html"
}
