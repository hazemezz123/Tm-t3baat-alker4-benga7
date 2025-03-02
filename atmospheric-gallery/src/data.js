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
    // Fallback to a placeholder image
    return `https://source.unsplash.com/random/800x600?sig=${id}`;
  }
};

// Function to generate image data
const generateImageData = () => {
  // Base image data
  const baseImages = [
    {
      id: 101,
      alt: "منظر جبلي مع بحيرة",
      categories: ["mountains", "water", "ramadan"],
    },
    {
      id: 102,
      alt: "غروب الشمس فوق المحيط",
      categories: ["water", "sky", "ramadan"],
    },
    {
      id: 103,
      alt: "مسار غابة الخريف",
      categories: ["forest", "ramadan"],
    },
    {
      id: 104,
      alt: "جبال ضبابية",
      categories: ["mountains", "forest"],
    },
    {
      id: 105,
      alt: "شلال الغابة",
      categories: ["forest", "water"],
    },
    {
      id: 106,
      alt: "شلال استوائي",
      categories: ["water", "forest"],
    },
    {
      id: 107,
      alt: "أضواء الشمال",
      categories: ["sky", "ramadan"],
    },
    {
      id: 108,
      alt: "منظر صحراوي",
      categories: ["desert"],
    },
    {
      id: 109,
      alt: "حقل الريف",
      categories: ["forest"],
    },
    {
      id: 110,
      alt: "جبال مغطاة بالثلوج",
      categories: ["mountains"],
    },
    {
      id: 111,
      alt: "شاطئ عند غروب الشمس",
      categories: ["water", "sky", "ramadan"],
    },
    {
      id: 112,
      alt: "سماء ليلية مرصعة بالنجوم",
      categories: ["sky"],
    },
    {
      id: 113,
      alt: "غابة مغطاة بالثلوج",
      categories: ["forest", "mountains"],
    },
    {
      id: 114,
      alt: "غابة مغطاة بالثلوج",
      categories: ["forest", "mountains"],
    },
    {
      id: 115,
      alt: "غابة مغطاة بالثلوج",
      categories: ["forest", "mountains"],
    },
    {
      id: 116,
      alt: "منظر طبيعي للجبال",
      categories: ["mountains", "sky"],
    },
    {
      id: 117,
      alt: "شاطئ رملي ذهبي",
      categories: ["water", "sky"],
    },
    {
      id: 118,
      alt: "غروب الشمس على البحر",
      categories: ["water", "sky", "ramadan"],
    },
    {
      id: 119,
      alt: "واحة صحراوية",
      categories: ["desert", "water"],
    },
    {
      id: 120,
      alt: "فانوس رمضان تقليدي",
      categories: ["ramadan"],
    },
    {
      id: 121,
      alt: "مسجد في ليلة رمضان",
      categories: ["ramadan", "sky"],
    },
    {
      id: 122,
      alt: "غابة خضراء كثيفة",
      categories: ["forest"],
    },
    {
      id: 123,
      alt: "بحيرة بين الجبال",
      categories: ["mountains", "water"],
    },
    {
      id: 124,
      alt: "كثبان رملية ذهبية",
      categories: ["desert"],
    },
    {
      id: 125,
      alt: "شلال في غابة استوائية",
      categories: ["water", "forest"],
    },
    {
      id: 126,
      alt: "سماء ليلية مع هلال رمضان",
      categories: ["sky", "ramadan"],
    },
    {
      id: 127,
      alt: "جبال ثلجية شاهقة",
      categories: ["mountains"],
    },
    {
      id: 128,
      alt: "مائدة إفطار رمضانية",
      categories: ["ramadan"],
    },
    {
      id: 129,
      alt: "نهر يتدفق عبر الغابة",
      categories: ["water", "forest"],
    },
    {
      id: 130,
      alt: "منظر بانورامي للصحراء",
      categories: ["desert", "sky"],
    },
    {
      id: 131,
      alt: "زينة رمضان التقليدية",
      categories: ["ramadan"],
    },
    {
      id: 132,
      alt: "غابة في فصل الخريف",
      categories: ["forest"],
    },
    {
      id: 133,
      alt: "شروق الشمس على الجبال",
      categories: ["mountains", "sky"],
    },
    {
      id: 134,
      alt: "ساحل صخري",
      categories: ["water"],
    },
    {
      id: 135,
      alt: "واحة خضراء في الصحراء",
      categories: ["desert", "water"],
    },
    {
      id: 136,
      alt: "سحب بيضاء في سماء زرقاء",
      categories: ["sky"],
    },
    {
      id: 137,
      alt: "مسار في غابة خضراء",
      categories: ["forest"],
    },
    {
      id: 138,
      alt: "قمة جبل مغطاة بالثلوج",
      categories: ["mountains"],
    },
    {
      id: 139,
      alt: "أمواج المحيط الهادرة",
      categories: ["water"],
    },
    {
      id: 140,
      alt: "فوانيس رمضان ملونة",
      categories: ["ramadan"],
    },
    {
      id: 141,
      alt: "صحراء تحت ضوء القمر",
      categories: ["desert", "sky"],
    },
    {
      id: 142,
      alt: "غابة صنوبر",
      categories: ["forest", "mountains"],
    },
    {
      id: 143,
      alt: "بحيرة جبلية هادئة",
      categories: ["water", "mountains"],
    },
    {
      id: 144,
      alt: "هلال رمضان في سماء النجوم",
      categories: ["sky", "ramadan"],
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

// Add 30 more images for testing pagination
const moreImages = addMoreImages(113, 30, {
  mountains: true,
  water: true,
  forest: true,
  sky: true,
  desert: true,
  ramadan: true,
});

// Add the new images to the existing array
images.push(...moreImages);
