document.addEventListener("DOMContentLoaded", function () {
  // Get URL parameters for guest name
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get("to") || "You";

  // Set guest name
  document.getElementById("guest-name").textContent = guestName;

  // Open invitation button
  const openBtn = document.getElementById("open-invitation");
  const invitationContainer = document.querySelector(".invitation-container");

  openBtn.addEventListener("click", function () {
    // Hide opening section
    document.querySelector(".opening-section").classList.add("hidden");

    // Show invitation container
    invitationContainer.classList.remove("hidden");

    // Scroll to top
    window.scrollTo(0, 0);

    // Play audio
    const audio = document.getElementById("wedding-audio");
    audio.volume = 0.5;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Audio played successfully
          const audioBtn = document.getElementById("audio-btn");
          audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
        })
        .catch((error) => {
          console.log("Audio play failed:", error);
        });
    }

    // Initialize animations after opening invitation
    setTimeout(() => {
      checkScroll();
      checkTimelineItems();
    }, 100);
  });

  // Audio control
  const audioBtn = document.getElementById("audio-btn");
  const audio = document.getElementById("wedding-audio");

  // Set initial state
  let isPlaying = false;

  // Check if audio is playing when page loads (if autoplay worked)
  audio.addEventListener("playing", function () {
    isPlaying = true;
    audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
  });

  audio.addEventListener("pause", function () {
    isPlaying = false;
    audioBtn.innerHTML = '<i class="fas fa-music"></i>';
  });

  audioBtn.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  });

  // Scroll down arrow
  const scrollDown = document.querySelector(".scroll-down");
  if (scrollDown) {
    scrollDown.addEventListener("click", function () {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }

  // Timeline animation
  function checkTimelineItems() {
    const timelineItems = document.querySelectorAll(".timeline-item");
    const windowHeight = window.innerHeight;

    timelineItems.forEach((item) => {
      const itemPosition = item.getBoundingClientRect().top;

      if (itemPosition < windowHeight - 100) {
        item.classList.add("visible");
      }
    });
  }

  // Scroll animation function
  function checkScroll() {
    const sections = document.querySelectorAll("section");
    const windowHeight = window.innerHeight;
    const triggerPoint = (windowHeight / 5) * 4;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerPoint) {
        // Islamic Message Section
        if (section.classList.contains("islamic-message-section")) {
          const message = section.querySelector(".islamic-message");
          message.classList.add("active");
        }

        // Bride & Groom Section
        if (section.classList.contains("bride-groom-section")) {
          const title = section.querySelector(".section-title");
          const bride = section.querySelector(".bride");
          const groom = section.querySelector(".groom");

          title.classList.add("active");
          bride.classList.add("active");
          groom.classList.add("active");
        }

        // Quran Verse Section
        if (section.classList.contains("quran-verse-section")) {
          const verse = section.querySelector(".quran-verse");
          verse.classList.add("active");
        }

        // Save the Date Section
        if (section.classList.contains("save-date-section")) {
          const title = section.querySelector(".section-title");
          const cards = section.querySelectorAll(".event-card");

          title.classList.add("active");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("active");
            }, index * 200);
          });
        }

        // Gallery Section
        if (section.classList.contains("gallery-section")) {
          const items = section.querySelectorAll(".gallery-item");
          items.forEach((item) => {
            item.classList.add("active");
          });
        }

        // Gift Section
        if (section.classList.contains("gift-section")) {
          const title = section.querySelector(".section-title");
          const cards = section.querySelectorAll(".bank-card");

          title.classList.add("active");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("active");
            }, index * 200);
          });
        }
      }
    });
  }

  // Initialize animations if invitation is already open
  if (!invitationContainer.classList.contains("hidden")) {
    checkScroll();
    checkTimelineItems();
  }

  // Event listeners for scroll
  window.addEventListener("scroll", function () {
    checkScroll();
    checkTimelineItems();
  });
});

// Copy to clipboard function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      alert("Nomor rekening berhasil disalin: " + text);
    },
    function (err) {
      console.error("Could not copy text: ", err);
    }
  );
}

function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(function() {
    // Simpan teks asli tombol
    const originalText = button.innerText;
    
    // Ubah teks tombol
    button.innerText = "Disalin!";
    button.style.backgroundColor = "#2e5a3d"; // Warna lebih gelap
    
    // Kembalikan ke teks asli setelah 2 detik
    setTimeout(function() {
      button.innerText = originalText;
      button.style.backgroundColor = "#4a8c5e";
    }, 2000);
  }).catch(function(err) {
    console.error('Gagal menyalin teks: ', err);
  });
}


