window.onload = function () {
  const container = document.querySelector('.circular-progress-container')
  const svg = document.querySelector('.progress-svg')
  const progressBar = document.querySelector('.progress-pie')
  const totalLength = progressBar.getTotalLength()

  setTopValue(svg)

  progressBar.style.strokeDasharray = totalLength
  progressBar.style.strokeDashoffset = totalLength


  window.addEventListener('scroll', () => {
    setProgress(container, progressBar, totalLength)
  })

  window.addEventListener('resize', () => {
    setTopValue(svg)
  })
}

function setTopValue(svg) {
  svg.style.top = document.documentElement.clientHeight * 0.5 - (svg.getBoundingClientRect().height * 0.5) + 'px'
}


function setProgress(container, progressBar, totalLength) {
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop

  const percentage = scrollTop / (scrollHeight - clientHeight)
  progressBar.style.strokeDashoffset = totalLength - totalLength * percentage
}





$(".navbar-toggler").click(() => {
  !$(".wiki-navbar").hasClass("navbar-dark-opaque")
    && $(".wiki-navbar").toggleClass("navbar-dark-opaque")
})



var fab = document.querySelector(".fab")
const wikiSections = document.getElementsByClassName("wiki-section-start")
const sections = []
for (var i = 0; i < wikiSections.length; i++) {
  sections.push(wikiSections[i].id)
}

for (var i = 0; i < sections.length; i++) {
  var sectionID = sections[i]

  var heading = document.getElementById(sectionID).textContent
  var node = document.createElement("a")
  node.setAttribute("class", "side-nav-menu-item")
  node.setAttribute("href", `#${sectionID}`)
  node.innerHTML = heading
  document.querySelector(".side-nav-menu").appendChild(node)
}

var sideMenuItems = document.getElementsByClassName("side-nav-menu-item")
var waypoints = $(".wiki-section-start").waypoint({
  handler: function (direction) {
    var currentIndex = sections.indexOf(this.element.id)
    if (direction == "down") {
      setNextLink(currentIndex)
    } // eg. 2 down means current section is 2, so next should be 3, so currentIndex + 1 is used in setNextLink
    else if (direction == "up") {
      setCurrentLink(currentIndex)
    } // eg. 2 up means current section is 1, so next should be 2, so currentIndex used as it is.
  },
  offset: 280,
  group: "wiki-sections"
})


const setNextLink = (currentIndex) => {
  var nextSectionID
  if (currentIndex != sections.length - 1) {            // check if not last section
    nextSectionID = `#${sections[currentIndex + 1]}`
    fab.setAttribute("href", nextSectionID)
  } else {
    fab.setAttribute("href", "#")
    setTopButton()
  }
  sideMenuItems[currentIndex].classList.add("side-nav-menu-item-active")
  currentIndex != 0 && sideMenuItems[currentIndex - 1].classList.remove("side-nav-menu-item-active")
}

const setCurrentLink = (currentIndex) => {
  var prevSectionID
  prevSectionID = `#${sections[currentIndex]}`
  fab.setAttribute("href", prevSectionID)
  currentIndex != 0 && sideMenuItems[currentIndex - 1].classList.add("side-nav-menu-item-active")
  sideMenuItems[currentIndex].classList.remove("side-nav-menu-item-active")
  if (currentIndex == sections.length - 1) {
    hideTopButton()
  }
}

setCurrentLink(0)


const setTopButton = () => {
  $(".fab-next-section").css("display", "none")
  $(".fab-top-section").css("display", "inline")
}

const hideTopButton = () => {
  $(".fab-top-section").css("display", "none")
  $(".fab-next-section").css("display", "inline")
}





var $window = $(window)
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

if (window.innerWidth > 768) {

  var $sidebar = $(".side-nav")
  var $sidebarHeight = $sidebar.innerHeight()
  var $footerOffsetTop = $(".footer").offset().top
  var $sidebarOffset = $sidebar.offset()
  var $wikiContent = $(".wiki-content")
  $wikiContent.css({ "bottom": $sidebarHeight, })
}

if ($window.scrollTop() > 25) {
  $(".wiki-navbar").addClass("navbar-dark-opaque")
  $(".header-progress").css("display", "inline-block")
  // $(".navbar-overlay").css("display", "none")
} else {
  $(".wiki-navbar").removeClass("navbar-dark-opaque")
  $(".header-progress").css("display", "none")
  // $(".navbar-overlay").css("display", "block")
}

$window.scroll(function () {

  if ($window.scrollTop() > 25) {
    $(".wiki-navbar").addClass("navbar-dark-opaque")
    $(".header-progress").css("display", "inline-block")
    // $(".navbar-overlay").css("display", "none")
  } else {
    $(".wiki-navbar").removeClass("navbar-dark-opaque")
    $(".header-progress").css("display", "none")
    // $(".navbar-overlay").css("display", "block")
  }
})

var $sidebar = $(".side-nav")
var $sidebarHeight = $sidebar.innerHeight()
var $footerOffset = $(".footer").offset()
var $footerHeight = $(".footer").innerHeight()
var $sidebarOffset = $sidebar.offset()
var $wikiContent = $(".wiki-content")


$window.scroll(() => {
  progressIndicator()
  if (window.innerWidth > 768) {
    if ($window.scrollTop() > ($sidebarOffset.top - 160)) {
      !$sidebar.hasClass("side-nav-fixed") && $sidebar.addClass("side-nav-fixed")
      $wikiContent.css("bottom", "0")
    } else {
      $sidebar.hasClass("side-nav-fixed") && $sidebar.removeClass("side-nav-fixed")
      $wikiContent.css("bottom", $sidebarHeight)
    }

    // if (($window.scrollTop() + $sidebarHeight + 400) > $footerOffset.top) {
    //   !$sidebar.hasClass("side-nav-fixed") && $sidebar.removeClass("side-nav-fixed")
    //   !$sidebar.hasClass("side-nav-fixed") && $sidebar.addClass("side-nav-absolute")
    //   $sidebar.css("top", (0 - $window.scrollTop() + $sidebarHeight + 400 + $footerOffset.top))
    //   console.log("going up")
    // } else {
    //   $sidebar.removeClass("side-nav-absolute")
    //   $sidebar.addClass("side-nav-fixed")
    //   $sidebar.css("top", "160")
    //   console.log("not going up")

    // }
  }
})

$window.scroll(() => {
  if (window.innerWidth > 768) {
    // console.log("footerOffset.top", $footerOffset.top)
    // console.log("sidebarHeight", $sidebarHeight)
    // console.log("window.scrollTop", $window.scrollTop())


    if (($window.scrollTop() + 160 + 40 + 250 + $sidebarHeight) > $footerOffset.top) {
      $sidebar.css("display", "none")
      $sidebar.hasClass("side-nav-fixed") && $sidebar.removeClass("side-nav-fixed")
      !$sidebar.hasClass("side-nav-absolute") && $sidebar.addClass("side-nav-absolute")
    } else {
      $sidebar.css("display", "block  ")
      $sidebar.hasClass("side-nav-absolute") && $sidebar.removeClass("side-nav-absolute")
      $sidebar.css("top", 160)
    }
  }
})

const progressIndicator = () => {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  var scrolled = (winScroll / height) * 100
  $(".header-progress-indicator").css("width", `${scrolled}%`)
}


var coll = document.getElementsByClassName("wiki-collapsible")
var i

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("wiki-collapsible-active")
    var content = this.nextElementSibling
    if (content.style.paddingBottom) {
      content.style.paddingBottom = null
    } else {
      content.style.paddingBottom = "50px"
    }
    if (content.style.maxHeight) {
      content.style.maxHeight = null
    } else {
      content.style.maxHeight = content.scrollHeight + "px"
    }
  })
}