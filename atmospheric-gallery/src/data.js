// Categories with Arabic translations
export const categories = [{ id: "all", name: "الكل" }];

// Import images dynamically
// This approach allows for better code splitting and lazy loading
const importImage = (id) => {
  try {
    // Use dynamic import for better performance with many images
    return new URL(`./assets/images/img${id}.jpg`, import.meta.url).href;
  } catch (error) {
    console.error(`Error importing image img${id}.jpg:`, error);
  }
};

// Function to generate image data
const generateImageData = () => {
  // Base image data
  const baseImages = [
    {
      id: 101,
      categories: ["mountains", "water", "ramadan"],
    },
    {
      id: 102,
      categories: ["water", "sky", "ramadan"],
    },
    {
      id: 103,
      categories: ["forest", "ramadan"],
    },
    {
      id: 104,
      categories: ["mountains", "forest"],
    },
    {
      id: 105,
      categories: ["forest", "water"],
    },
    {
      id: 106,
      categories: ["water", "forest"],
    },
    {
      id: 107,
      categories: ["sky", "ramadan"],
    },
    {
      id: 108,
      categories: ["desert"],
    },
    {
      id: 109,
      categories: ["forest"],
    },
    {
      id: 110,
      categories: ["mountains"],
    },
    {
      id: 111,
      categories: ["water", "sky", "ramadan"],
    },
    {
      id: 112,
      categories: ["sky"],
    },
    {
      id: 113,
      categories: ["forest", "mountains"],
    },
    {
      id: 114,
      categories: ["forest", "mountains"],
    },
    {
      id: 115,
      categories: ["forest", "mountains"],
    },
    {
      id: 116,
      categories: ["mountains", "sky"],
    },
    {
      id: 117,
      categories: ["water", "sky"],
    },
    {
      id: 118,
      categories: ["water", "sky", "ramadan"],
    },
    {
      id: 119,
      categories: ["desert", "water"],
    },
    {
      id: 120,
      categories: ["ramadan"],
    },
    {
      id: 121,
      categories: ["ramadan", "sky"],
    },
    {
      id: 122,
      categories: ["forest"],
    },
    {
      id: 123,
      categories: ["mountains", "water"],
    },
    {
      id: 124,
      categories: ["desert"],
    },
    {
      id: 125,
      categories: ["water", "forest"],
    },
    {
      id: 126,
      categories: ["sky", "ramadan"],
    },
    {
      id: 127,
      categories: ["mountains"],
    },
    {
      id: 128,
      categories: ["ramadan"],
    },
    {
      id: 129,
      categories: ["water", "forest"],
    },
    {
      id: 130,
      categories: ["desert", "sky"],
    },
    {
      id: 131,
      categories: ["ramadan"],
    },
    {
      id: 132,
      categories: ["forest"],
    },
    {
      id: 133,
      categories: ["mountains", "sky"],
    },
    {
      id: 134,
      categories: ["water"],
    },
    {
      id: 135,
      categories: ["desert", "water"],
    },
    {
      id: 136,
      categories: ["sky"],
    },
    {
      id: 137,
      categories: ["forest"],
    },
    {
      id: 138,
      categories: ["mountains"],
    },
    {
      id: 139,
      categories: ["water"],
    },
    {
      id: 140,
      categories: ["ramadan"],
    },
    {
      id: 141,
      categories: ["desert", "sky"],
    },
    {
      id: 142,
      categories: ["desert", "sky"],
    },
    {
      id: 143,
      categories: ["desert", "sky"],
    },
    {
      id: 144,
      categories: ["desert", "sky"],
    },
  ];

  // Add URL to each image
  return baseImages.map((image) => ({
    ...image,
    url: importImage(image.id),
  }));
};

// Generate the images array
export const images = generateImageData();

// Function to add more images dynamically
// This can be used to add more images without having to manually define each one
export const addMoreImages = (startId, count, categories) => {
  const newImages = [];

  // Sample alt texts for different categories
  const altTexts = {
    mountains: [
      "منظر جبلي رائع",
      "قمة جبل مغطاة بالثلوج",
      "سلسلة جبال شاهقة",
      "جبال خضراء",
    ],
    water: ["بحيرة صافية", "شاطئ هادئ", "أمواج المحيط", "نهر متدفق"],
    forest: ["غابة كثيفة", "أشجار الخريف", "مسار في الغابة", "غابة استوائية"],
    sky: ["سماء زرقاء صافية", "غروب الشمس", "سماء مليئة بالنجوم", "سحب بيضاء"],
    desert: ["كثبان رملية", "صحراء شاسعة", "واحة صحراوية", "منظر صحراوي"],
    ramadan: ["فانوس رمضان", "هلال رمضان", "مائدة إفطار", "زينة رمضانية"],
  };

  for (let i = 0; i < count; i++) {
    const id = startId + i;

    // Select random categories for this image
    const imageCategories = [];
    const categoryKeys = Object.keys(categories);

    // Add 1-3 random categories
    const numCategories = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numCategories; j++) {
      const randomCategory =
        categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
      if (!imageCategories.includes(randomCategory)) {
        imageCategories.push(randomCategory);
      }
    }

    // Select a random alt text based on the first category
    const primaryCategory = imageCategories[0];
    const altTextsForCategory = altTexts[primaryCategory] || ["صورة جميلة"];
    const altText =
      altTextsForCategory[
        Math.floor(Math.random() * altTextsForCategory.length)
      ];

    newImages.push({
      id,
      url: importImage(id),
      alt: altText,
      categories: imageCategories,
    });
  }

  return newImages;
};

// Add the new images to the existing array
