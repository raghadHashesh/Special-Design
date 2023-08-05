//local storage
let mainColor = localStorage.getItem("color");
if (mainColor !== null) {
    document.documentElement.style.setProperty('--selected-color', mainColor);
    document.querySelectorAll(".colors li").forEach((ele) => {
        ele.classList.remove("active");
        if (ele.dataset.color === mainColor) {
            ele.classList.add("active");
        }
    });

}

let landPage = document.querySelector(".land-page");
let backgroundOption = true;
let backgroundInterval;
let backgroundItem = localStorage.getItem("background-option");
if (backgroundItem !== null) {
    document.querySelectorAll(".random-ground span").forEach((ele) => {
        ele.classList.remove("active")
    });
    if (backgroundItem === 'true') {
        backgroundOption = true;
        randomImage();
        document.querySelectorAll(".yes")[0].classList.add("active");
    }
    else {
        backgroundOption = false;
        landPage.style.backgroundImage = localStorage.getItem("stoppedImage");
        document.querySelectorAll(".no")[0].classList.add("active");
    }
}
else {
    if (backgroundOption === true) {
        randomImage();
    }
}


// random background image

let images = ["web.png", "02.jpg", "Web-2.png", "04.jpg", "05.jpg"];
function randomImage() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let number = Math.floor(Math.random() * images.length);
            landPage.style.backgroundImage = 'url("imgs/' + images[number] + '")';
        }, 3000);
    }
}


//setting box
let settingIcon = document.querySelector(".setting .set-icon .setting-icon");
settingIcon.onclick = () => {
    settingIcon.classList.toggle("bx-spin");
    document.querySelector(".setting").classList.toggle("show")
}

//change colors
const color = document.querySelectorAll(".colors li");
color.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        //change the property named --selected-color which is in thr :root
        document.documentElement.style.setProperty('--selected-color', e.target.dataset.color);
        localStorage.setItem("color", e.target.dataset.color);
        active(e);
    })
})
//random background
let randomBackground = document.querySelectorAll(".option-box .random-ground span");
randomBackground.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        active(e);
        randomBackground.forEach((ele) => {
            ele.classList.remove("active");
        })
        ele.classList.add("active");
        if (ele.classList.contains("yes")) {
            backgroundOption = true;
            randomImage();
            localStorage.removeItem("stoppedImage");
            localStorage.setItem("background-option", true);
        }
        else {
            backgroundOption = false;
            localStorage.setItem("stoppedImage", landPage.style.backgroundImage);
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);
        }
    })
})

//skills
let skill = document.querySelector(".skills");
window.onscroll = () => {
    let skillOfset = skill.offsetTop;
    let skillsouterheight = skill.offsetHeight;
    let widowHeight = this.innerHeight; //window height
    let windowScrollTop = this.pageYOffset;           //window scroll top
    if (windowScrollTop > (skillOfset + skillsouterheight - widowHeight)) {
        let allSkills = document.querySelectorAll(".skill-card .skill-div span");
        allSkills.forEach((ele) => {
            ele.style.width = ele.getAttribute("data-progress");
        })
    }
}

//gallery
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach((ele) => {
    ele.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.className = 'popUp';
        document.body.appendChild(overlay);
        let popUpBox = document.createElement("div");
        popUpBox.className = 'pop-box';
        if (ele.alt !== null) {
            let imageTitle = document.createElement('h3');
            imageTitle.textContent = ele.alt;
            popUpBox.appendChild(imageTitle);
        }
        let popImage = document.createElement("img");
        popImage.src = ele.src;
        popUpBox.appendChild(popImage);
        document.body.appendChild(popUpBox);

        let close = document.createElement('span');
        close.textContent = "x";
        close.className = 'close';
        popUpBox.appendChild(close);
    })
    document.addEventListener('click', (e) => {
        if (e.target.className == 'close') {
            e.target.parentNode.remove();
            document.querySelector('.popUp').remove();
        }
    });
})

//move from bullets
const bull = document.querySelectorAll('.nav-bullet .bullet');
const linkss = document.querySelectorAll('.links li a');

function scrollTo(element) {
    element.forEach((ele) => {
        ele.addEventListener('click', (e) => {
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scrollTo(bull);
scrollTo(linkss);

//active class 
function active(ev) {
    ev.target.parentElement.querySelectorAll('.active').forEach(ele => {
        ele.classList.remove('active');
    });
    ev.target.classList.add('active');
}


//show and hide bullets
let bullets = document.querySelectorAll(".Show-bullets span");
let navbullets = document.querySelectorAll(".nav-bullet")[0];
let bulletItem = localStorage.getItem("bullets-option");
if (bulletItem !== null) {
    bullets.forEach(span => {
        span.classList.remove('active');
    });
    if (bulletItem === 'block') {
        navbullets.style.display = 'block';
        document.querySelectorAll('.yes')[1].classList.add('active');
    }
    else {
        navbullets.style.display = 'none';
        document.querySelectorAll('.no')[1].classList.add('active');
    }
}

bullets.forEach(span => {
    span.addEventListener('click', (e) => {
        active(e);
        if (span.dataset.display === 'show') {
            navbullets.style.display = 'block';
            localStorage.setItem("bullets-option", 'block');
        }
        else {
            navbullets.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');
        }
    })
})

//reset the setting box
document.querySelector('.reset').onclick = () => {
    localStorage.clear();
    window.location.reload();
}

//toggle menu
let togglebutton = document.querySelector('.toggle-menu');
let tlinks = document.querySelector('.links');
tlinks.addEventListener("click", (e) => {
    e.stopPropagation();
});

togglebutton.addEventListener('click', (e) => {
    e.stopPropagation();
    togglebutton.classList.toggle("menu-active");
    tlinks.classList.toggle("open");
});

//click out side and toggle the menu
document.addEventListener('click', (e) => {
    if (e.target !== togglebutton && e.target !== tlinks) {
        if (tlinks.classList.contains('open')) {
            togglebutton.classList.toggle("menu-active");
            tlinks.classList.toggle("open");
        }
    }
});



let sliders = document.querySelectorAll('.slide-in');
let faders = document.querySelectorAll(".fade-in");
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -180px 0px"
};
const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target)
            console.log(entry.target)
        }
    });
},
    appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader)
})

sliders.forEach(slider => {
    appearOnScroll.observe(slider)
});


//second way for moving on scroll
window.addEventListener('scroll', checkBoxes);
function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 3;
    sliders.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            box.classList.add('appear');
        } else {
            box.classList.remove('appear');
        }

    })
}