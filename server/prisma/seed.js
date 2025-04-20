import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.menuItem.deleteMany();
  console.log('Deleted existing menu items.');

  const items = await prisma.menuItem.createMany({
    data: [
      // 1. Ragi Vegetable Chilla (From Catalog)
      {
        name: 'Ragi Vegetable Chilla',
        description: 'Savory pancakes made from ragi flour and mixed vegetables.',
        price: 12000, // 120 INR in paise
        category: 'Breakfast',
        cuisineRegion: 'North Indian',
        mealType: 'Chilla',
        dietType: 'With Onion/Garlic', // Standard version
        isVeg: true,
        calories: 320,
        protein: 7,
        carbs: 40,
        fat: 12,
        fiber: 6,
        glycemicIndex: 'Low',
        isHighProtein: false, // Below 10g threshold maybe? Adjust as needed
        isHighFiber: true,    // >= 5g
        isHeartHealthy: true, // Assuming based on description
        imageUrl: 'https://via.placeholder.com/180x180/10B981/FFFFFF?text=Ragi+Chilla',
        isFeatured: true,
        standardIngredients: 'Ragi flour, Grated carrot, Chopped spinach/methi, Finely chopped onion, Green chili, ginger, Cumin seeds, Salt, Cold-pressed oil',
      },
      // 2. Oats Idli with Tomato Chutney (From Catalog)
      {
        name: 'Oats Idli', // Simplified name for listing
        description: 'Steamed savory cakes made with oats and urad dal.',
        price: 10000, // 100 INR in paise
        category: 'Breakfast',
        cuisineRegion: 'South Indian',
        mealType: 'Idli',
        dietType: 'Without Onion/Garlic', // Default is without
        isVeg: true,
        calories: 150, // Per 2 idlis
        protein: 7,
        carbs: 22,
        fat: 3,
        fiber: 5,
        glycemicIndex: 'Low',
        isHighProtein: false,
        isHighFiber: true,
        isHeartHealthy: true, 
        imageUrl: 'https://via.placeholder.com/180x180/10B981/FFFFFF?text=Oats+Idli',
        isFeatured: true,
        standardIngredients: 'Ground oats, Urad dal, Grated carrot, Chopped coriander, Curry leaves, Green chilies, Ginger, Eno fruit salt, Salt',
      },
      // 4. Moong Dal Cheela with Paneer Stuffing (From Catalog)
      {
        name: 'Moong Dal Paneer Cheela', // Slightly more descriptive
        description: 'Protein-rich savory pancakes made from split yellow moong dal with paneer filling.',
        price: 16000, // Assuming base + paneer stuffing cost from customization? Adjust as needed.
        category: 'Breakfast',
        cuisineRegion: 'North Indian',
        mealType: 'Cheela',
        dietType: 'With Onion/Garlic', // Standard has onion
        isVeg: true,
        calories: 280, 
        protein: 20,
        carbs: 25,
        fat: 10,
        fiber: 8,
        glycemicIndex: 'Low',
        isHighProtein: true, // >= 10g
        isHighFiber: true,   // >= 5g
        isHeartHealthy: true,
        imageUrl: 'https://via.placeholder.com/180x180/10B981/FFFFFF?text=Moong+Dal+Cheela',
        isFeatured: true,
        standardIngredients: 'Split yellow moong dal, Grated paneer, Finely chopped onion, Chopped spinach, Green chilies, Ginger, Cumin powder, Coriander powder, Salt, Cold-pressed mustard oil',
      },
       // 7. Bottle Gourd and Mixed Dal Khichdi (From Catalog)
      {
        name: 'Dal Khichdi (Bottle Gourd)', // Simplified name
        description: 'Comforting one-pot meal with lentils, rice, and vegetables.',
        price: 15000, // Example price, adjust as needed
        category: 'Lunch & Dinner',
        cuisineRegion: 'North Indian', // Or general
        mealType: 'Khichdi',
        dietType: 'With Onion/Garlic', // Standard has onion
        isVeg: true,
        calories: 220, 
        protein: 10,
        carbs: 32,
        fat: 5,
        fiber: 8,
        glycemicIndex: 'Medium',
        isHighProtein: true, // >= 10g
        isHighFiber: true,   // >= 5g
        isHeartHealthy: true,
        imageUrl: 'https://via.placeholder.com/180x180/10B981/FFFFFF?text=Dal+Khichdi',
        isFeatured: false,
        standardIngredients: 'Moong dal, Toor dal, Brown rice, Bottle gourd, Tomato, Green peas, Onion, Ginger-garlic paste, Turmeric powder, Cumin seeds, Ghee, Salt',
      },
    ],
    skipDuplicates: true, 
  });

  console.log(`Created ${items.count} new menu items.`);
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });