let titleBg = $(".title-background");

setup_navbar(() => titleBg.outerHeight());

async function changeFieldSpecifierText() {
    const greetings = ["Core Backend Dev", "Under 20", "Started at 10"];
    let elem = document.getElementById("field-specifier-changing");
    var i = 1;
    var curtext = "";
    while (true) {
        await sleep(2000);
        while (elem.innerText.length > 0) {
            elem.innerText = elem.innerText.slice(0, elem.innerText.length - 1);
            await sleep(25);
        }

        curtext = "";
        await sleep(100);

        for (const c of greetings[i]) {
            curtext += c;
            elem.innerText = curtext;
            if (c !== " ") {
                await sleep(100);
            }
        }

        i++;
        if (i >= greetings.length) {
            i = 0;
        }
    }
}

changeFieldSpecifierText();
setupScrollShow();
setupBorderView();
setupNavbarScrollEffect();
setupTime();

// Add blur and fade-in transition to the title on page load
$(document).ready(function () {
    setTimeout(function () {
        $(".title").removeClass("initial-hidden").addClass("title-loaded");
    }, 100); // Small delay to ensure CSS is applied before transition

    // Setup parallax effects
    setupParallaxEffects();
});

function setupNavbarScrollEffect() {
    const navbar = $(".navbar");
    const scrollThreshold = 200; // Adjust this value as needed

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > scrollThreshold) {
            navbar.addClass("navbar-hidden");
        } else {
            navbar.removeClass("navbar-hidden");
        }
    });
}

function easeOut(x) {
    return 1 - Math.pow((1 - x), 3)
}

// This function returns the x-value for a given scroll value.
// takes normalized x from 0.0 to 1.0 and returns normalized y 0.0 to 1.0
function carScrollCurve(x) {
    if (x < 1) {
        return easeOut(x);
    } else {
        return 1;
    }
}

function setupParallaxEffects() {
    const picImg = $(".pic-img");
    const picOverlay = $(".pic-overlay");
    const speed = 0.4; // Adjust this value for more or less parallax effect

    // const polkaDotBackground = $(".polka-dot-background");
    // const speed2 = 0.4;

    const scrollThreshold = 390;  // For the image
    const carAnim = $("#car-anim");
    const carDesc = $("#car-desc");
    const carTyreRear = $("#tyre-rear");
    const carTyreFront = $("#tyre-front");

    function onScrollParallax() {
        const scrolled = $(this).scrollTop();

        let css_to_apply = null;
        // For the image
        if (scrolled < scrollThreshold) {
            css_to_apply = "translateY(" + -(scrolled * speed) + "px)";
        } else {
            css_to_apply = "translateY(" + -(scrollThreshold * speed) + "px)";
        }
        picImg.css("transform", css_to_apply);
        picOverlay.css("transform", css_to_apply);

        const windowHeight = $(window).height();
        const windowWidth = $(window).width();
        const bottomScrolled = scrolled + windowHeight;
        const carWidth = carAnim.width();

        const carStartPoint = carAnim.offset().top + windowHeight / 3;
        const carStopPoint = carStartPoint + windowHeight;
        const normalizedScroll = (bottomScrolled - carStartPoint) / (carStopPoint - carStartPoint);
        const outputVal = carScrollCurve(normalizedScroll);
        console.log(outputVal);
        const scaledOutput = outputVal * (carWidth + windowWidth / 2) - carWidth * 1.2;

        // get tyre radius (check css for ref later)
        const frontRadius = windowHeight * 0.33 * 0.5;
        const rearRadius = windowHeight * 0.30 * 0.5;

        const angleFront = scaledOutput / frontRadius;
        const angleRear = scaledOutput / rearRadius;

        const carProgressScreen = (scaledOutput + carWidth) / windowWidth;

        if (carProgressScreen > 0.6) {
            carDesc.css("opacity", 1);
        } else {
            carDesc.css("opacity", 0);
        }

        carAnim.css("left", scaledOutput);
        carTyreFront.css("transform", "rotate(" + angleFront + "rad)")
        carTyreRear.css("transform", "rotate(" + angleRear + "rad)")
    }

    $(window).on("scroll", onScrollParallax);
    onScrollParallax();
}

function setupTime() {
    const elem = document.getElementsByClassName("polka-dot-background-container")[0];
    if (!elem) return;

    let time = 0;

    function updateTime() {
        elem.style.setProperty('--time', time);
        time += 1;

        // Use requestAnimationFrame instead of setTimeout to avoid memory compilation traps
        requestAnimationFrame(updateTime);
    }

    requestAnimationFrame(updateTime);
}
