export function isWebp() {
  function textWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  textWebP(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}

export function ibg() {
  let ibg = document.querySelectorAll(".ibg");
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage = `url(${ibg[i]
        .querySelector("img")
        .getAttribute("src")})`;
    }
  }
}

export function toggleClassActive() {
  var el = document.querySelector(".icon-menu");
  if (el) {
    document.querySelector(".icon-menu").addEventListener("click", () => {
      document.querySelector(".icon-menu").classList.toggle("_active");
      document.querySelector(".header__menu").classList.toggle("_active");
      document.querySelector(".menu__patch").classList.toggle("_active");
    });
  }
}

export function addVideo() {
  window.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".video-block__video");

    videos.forEach(function (video) {
      video.addEventListener("click", function () {
        if (video.classList.contains("_active")) {
          return;
        }
        video.classList.add("_active");

        const src = video.dataset.src;
        video.insertAdjacentHTML(
          "afterbegin",
          `<iframe src="${src}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        );
      });
    });
  });
}

export function closeMenu() {
  document.addEventListener("scroll", function (event) {
    const activeMenu = document.querySelector("._active");
    if (activeMenu && event.target == document) {
      document.querySelector(".icon-menu").classList.toggle("_active");
      document.querySelector(".header__menu").classList.toggle("_active");
      document.querySelector(".menu__patch").classList.toggle("_active");
    }
  });
}

export function filterReleases(page) {
  if (document.URL.includes(page)) {
    const filterBox = document.querySelectorAll(
      ".releases__releases-item-container"
    );
    const navItems = document.querySelectorAll(".navigation-list__item");
    document
      .querySelector(".releases__navigation")
      .addEventListener("click", (event) => {
        if (event.target.tagName !== "LI") return false;
        let filterData = event.target.dataset.filter;

        navItems.forEach((elem) => {
          elem.classList.remove("nav-active");
        });
        event.target.classList.add("nav-active");

        filterBox.forEach((elem) => {
          elem.classList.remove("hide");
		  elem.style.display = 'block';
          if (!elem.classList.contains(filterData) && filterData !== "all") {
            elem.classList.add("hide");	
			setTimeout(() => {
				elem.style.display = 'none';
			}, 300)
          }
        });
      });
  }
}

export function scrollToElement(anchors, pageName) {
  anchors.forEach(function (item) {
    if (item && document.URL.includes(pageName)) {
      item.addEventListener("click", function (e) {
        e.preventDefault();

        let coordY = document
          .querySelector(
            item
              .getAttribute("href")
              .slice(item.getAttribute("href").lastIndexOf("#"))
          )
          .getBoundingClientRect().top;

        window.scrollBy({
          top: coordY,
          behavior: "smooth",
        });
      });
    }
  });
}
