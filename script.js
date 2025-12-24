document.addEventListener('DOMContentLoaded', () => {

  const fishModel = document.getElementById('fish-model');
  const sidebarOptions = document.querySelectorAll('.sidebar-option');
  const organismCards = document.querySelectorAll('.organism-card');
  const infoCard = document.getElementById('info-card');
  const infoTitle = document.getElementById('info-title');
  const infoContent = document.getElementById('info-content');
  const closeBtn = document.getElementById('close-btn');

  const organismData = {
    'apollo': {
      title: "Apollo Fish",
      info: {
        scale: { title: "Scale Info", content: "Apollo fish have small, cycloid scales.", image: "apollofish_scale.jpg" },
        gill: { title: "Gill Structure", content: "Apollo fish have feathery gills for respiration.", image: "apollofish_gills.jpg" },
        otolith: { title: "Otolith Info", content: "Apollo fish use otoliths for balance & hearing.", image: "apollo_otolith.jpg" },
        habitat: {
          title: "Habitat",
          content: `Temperature: 24-27°C (75-81°F).  
Area: Freshwater rivers and streams in Southeast Asia.  
Depth: Benthopelagic (bottom and mid-water depths).  
pH: 6.0-7.5.  
Pressure: Not a significant factor as it lives at or near sea level.  
Sea Level: At or near sea level.`
        }
      }
    },
    'whale': {
      title: "Blue Whale",
      info: {
        scale: { title: "No Scales", content: "Smooth skin reduces drag.", image: "bluewhale_scale.png" },
        gill: { title: "No Gills", content: "Whales breathe air using lungs.", image: "bluewhale_lungs.jpg" },
        otolith: { title: "No Otoliths", content: "Inner ear has different bones instead.", image: "whale_earbone.jpg" },
        habitat: {
          title: "Habitat",
          content: `Temperature: Migrates between cold (near freezing) and warm (tropical) waters.  
Area: All of the world's oceans.  
Depth: Up to 500 meters (1,640 feet).  
pH: ~8.1 (same as average ocean pH).  
Pressure: Up to 50 times greater than at the surface.  
Sea Level: At or below sea level.`
        }
      }
    },
    'jellyfish': {
      title: "Jellyfish",
      info: {
        scale: { title: "No Scales", content: "Gelatinous body, ~95% water.", image: "jelly_scale.jpg" },
        gill: { title: "No Gills", content: "Absorb oxygen directly from water.", image: "jellyfish_breathe.jpg" },
        otolith: { title: "No Otoliths", content: "Use statocysts for balance.", image: "jelly_statocyst.jpg" },
        habitat: {
          title: "Habitat",
          content: `Temperature: Varies by species, from near-freezing to warm tropical waters.  
Area: All oceans worldwide, and some freshwater.  
Depth: From the surface down to over 1,000 meters (3,280 feet).  
pH: ~8.1 (same as average ocean pH).  
Pressure: Withstands pressure changes due to gelatinous body.  
Sea Level: At or below sea level.`
        }
      }
    }
  };

  let currentOrganism = 'apollo';
  let currentRotation = 0;

  // ---- Automatic rotation ----
  setInterval(() => {
    currentRotation += 1;
    fishModel.style.transform = `rotateY(${currentRotation}deg)`;
  }, 50);

  // ---- Sidebar Info ----
  sidebarOptions.forEach(option => {
    option.addEventListener('click', e => {
      e.preventDefault();
      const infoType = option.dataset.info;

      // Data Visualisation special case
      if (infoType === "datavisualisation") {
        showDataVisualisation();
        return;
      }

      const info = organismData[currentOrganism].info[infoType];

      infoTitle.textContent = info.title;
      infoContent.innerHTML = ""; // clear everything

      const text = document.createElement("p");
      text.textContent = info.content;
      infoContent.appendChild(text);

      if (info.image) {
        const infoImage = document.createElement('img');
        infoImage.src = info.image;
        infoImage.style.maxWidth = "100%";
        infoImage.style.marginTop = "15px";
        infoContent.appendChild(infoImage);
      }

      infoCard.classList.remove('hidden');
    });
  });

  // ---- Close Info Card ----
  closeBtn.addEventListener('click', () => {
    infoCard.classList.add('hidden');
    infoContent.innerHTML = "";
  });

  // ---- Organism Card Click ----
  organismCards.forEach(card => {
    card.addEventListener('click', () => {
      organismCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      currentOrganism = card.dataset.organism;
      fishModel.src = currentOrganism + ".png";
      currentRotation = 0;
      fishModel.style.transform = `rotateY(${currentRotation}deg)`;

      infoCard.classList.add('hidden');
    });
  });

  // ---- Data Visualisation Pop-up ----
const visualisationImages = [
    "graph_bar_categories.png",
    "graph_boxplot.png",
    "graph_histogram.png",
    "graph_line_index.png",
    "graph_pie_categories.png",
    "graph_scatter.png"
  ];

  function showDataVisualisation() {
    infoTitle.textContent = "Data Visualisation";
    infoContent.innerHTML = "";

    visualisationImages.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      infoContent.appendChild(img);

      setTimeout(() => {
        img.classList.add("show");
      }, index * 400);
    });

    infoCard.classList.remove('hidden');
  }

});
