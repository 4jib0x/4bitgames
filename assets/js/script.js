// main
document.addEventListener("DOMContentLoaded", () => {
	const sidebarLinks = document.querySelectorAll(".game-list li a");
	const slides = document.querySelectorAll(".slide");
	const banner = document.querySelector(".hero-banner");
	let autoSlideInterval;
	const autoSlideDelay = 3500;

	function activateSlide(slideId) {
		document.querySelector(".slide.active")?.classList.remove("active");
		document.querySelector(".game-list li a.active-game")?.classList.remove("active-game");

		const targetSlide = document.querySelector(`.slide[data-slide-id="${slideId}"]`);
		if (targetSlide) targetSlide.classList.add("active");

		const targetLink = document.querySelector(`.game-list li a[href="#${slideId}"]`);
		if (targetLink) targetLink.classList.add("active-game");
	}

	function nextSlide() {
		const currentActiveSlide = document.querySelector(".slide.active");
		if (!currentActiveSlide) return;
		let currentSlideIndex = Array.from(slides).indexOf(currentActiveSlide);
		let nextSlideIndex = (currentSlideIndex + 1) % slides.length;
		const nextSlideId = slides[nextSlideIndex].getAttribute("data-slide-id");
		activateSlide(nextSlideId);
	}

	function startAutoSlide() { clearInterval(autoSlideInterval); autoSlideInterval = setInterval(nextSlide, autoSlideDelay); }
	function stopAutoSlide() { clearInterval(autoSlideInterval); }

	sidebarLinks.forEach(link => {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			stopAutoSlide();
			const slideId = link.getAttribute("href").substring(1);
			activateSlide(slideId);
		});
	});

	if (banner) {
		banner.addEventListener("mouseenter", stopAutoSlide);
		banner.addEventListener("mouseleave", startAutoSlide);
	}

	const initialActiveSlide = document.querySelector(".slide.active");
	if (initialActiveSlide) {
		const initialSlideId = initialActiveSlide.getAttribute("data-slide-id");
		document.querySelector(".game-list li a.active-game")?.classList.remove("active-game");
		const initialActiveLink = document.querySelector(`.game-list li a[href="#${initialSlideId}"]`);
		initialActiveLink?.classList.add("active-game");
	} else if (slides.length > 0) {
		const firstSlideId = slides[0].getAttribute("data-slide-id");
		activateSlide(firstSlideId);
	}

	if (slides.length > 1) startAutoSlide();
});

// discover
document.addEventListener("DOMContentLoaded", () => {
	const discoverSection = document.querySelector(".discover-section");
	if (!discoverSection) return;
	const grid = discoverSection.querySelector(".discover-grid");
	const prevButton = discoverSection.querySelector(".arrow-button.prev");
	const nextButton = discoverSection.querySelector(".arrow-button.next");
	const gameCards = grid?.querySelectorAll(".game-card.discover") ?? [];
	if (!grid || !prevButton || !nextButton || gameCards.length === 0) return;
	const cardWidth = gameCards[0].offsetWidth;
	const gap = parseInt(window.getComputedStyle(grid).gap) || 20;
	const scrollStep = (cardWidth + gap) * 3;
	function updateButtonState() {
		prevButton.disabled = grid.scrollLeft <= 0;
		nextButton.disabled = grid.scrollLeft >= (grid.scrollWidth - grid.clientWidth - 1);
		prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
		nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
	}
	grid.style.overflowX = 'auto';
	grid.style.scrollBehavior = 'smooth';
	grid.style.scrollbarWidth = 'none';
	grid.style.msOverflowStyle = 'none';
	prevButton.addEventListener("click", () => { grid.scrollLeft -= scrollStep; updateButtonState(); });
	nextButton.addEventListener("click", () => { grid.scrollLeft += scrollStep; updateButtonState(); });
	grid.addEventListener('scroll', updateButtonState);
	updateButtonState();
});
