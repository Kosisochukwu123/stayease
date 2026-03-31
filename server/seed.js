require('dotenv').config();
const mongoose = require('mongoose');
const Hotel = require('./models/Hotel');

const hotels = [
  // ── LAGOS ──
  {
    name: 'Eko Hotel & Suites',
    city: 'Lagos', country: 'Nigeria',
    description: 'Iconic 5-star landmark on Victoria Island with sweeping Atlantic views, world-class dining, and a sprawling pool complex.',
    price: 85000, rating: 4.8, rooms: 50,
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Beach Access', 'Parking'],
    extras: {
      overview: 'Standing as Lagos\'s most iconic hospitality destination since 1977, Eko Hotel & Suites offers an unmatched blend of Nigerian heritage and contemporary luxury across its sprawling Victoria Island campus.',
      spa: 'The Eko Spa offers a full menu of treatments — from traditional Nigerian shea butter massages to hot stone therapy. Open daily 7am–10pm.',
      dining: 'Six restaurants and bars serve everything from fresh seafood at The Lagoon to authentic Nigerian delicacies at Kuramo Restaurant.',
      delicacies: [
        { name: 'Jollof Rice & Grilled Tilapia', description: 'Our signature smoky jollof paired with Atlantic-caught tilapia.', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400' },
        { name: 'Egusi Soup & Pounded Yam', description: 'Rich melon seed soup with assorted meat, served with silky pounded yam.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
        { name: 'Suya Platter', description: 'Perfectly spiced grilled beef and chicken suya with sliced onions.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400' },
      ]
    }
  },
  {
    name: 'Four Points by Sheraton Lagos',
    city: 'Lagos', country: 'Nigeria',
    description: 'Contemporary business hotel in Oniru, steps from the beach and Lagos\'s best shopping centres.',
    price: 62000, rating: 4.6, rooms: 35,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar', 'Conference Room', 'Parking'],
    extras: {
      overview: 'Perfectly positioned between Lagos\'s business district and the Atlantic coast, Four Points delivers smart, comfortable rooms with fast WiFi and great food.',
      spa: 'A curated wellness menu featuring deep tissue massage and reflexology, available by appointment.',
      dining: 'The Best Brew bar serves craft Nigerian beers and cocktails. The Eatery offers international favourites alongside local staples.',
      delicacies: [
        { name: 'Peppered Snail', description: 'Giant African land snails in rich tomato pepper sauce.', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400' },
      ]
    }
  },
  {
    name: 'The Wheatbaker Hotel',
    city: 'Lagos', country: 'Nigeria',
    description: 'Intimate boutique hotel in Ikoyi combining Nigerian art, bespoke interiors, and genuinely personal service.',
    price: 78000, rating: 4.9, rooms: 20,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'],
    extras: {
      overview: 'A beloved Lagos institution where each of the 20 rooms is individually designed by a different Nigerian artist. If you want to feel what luxury in Lagos really means, this is the address.',
      spa: 'Bespoke spa treatments using locally sourced ingredients including moringa, baobab oil, and shea butter.',
      dining: 'Glasshouse Restaurant is famous for its Sunday brunch — a Lagos institution. Seasonal menus celebrate Nigerian produce.',
      delicacies: [
        { name: 'Afang Soup', description: 'Afang leaves and waterleaf with assorted proteins — a Calabar classic.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
        { name: 'Nigerian Pancakes', description: 'Fluffy pancakes with house-made palm sugar syrup and tropical fruits.', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400' },
      ]
    }
  },

  // ── ABUJA ──
  {
    name: 'Transcorp Hilton Abuja',
    city: 'Abuja', country: 'Nigeria',
    description: 'Nigeria\'s premier 5-star hotel, favourite of heads of state and dignitaries, set in beautifully landscaped grounds in the heart of the capital.',
    price: 95000, rating: 4.7, rooms: 60,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Conference Room', 'Parking', 'Tennis Court'],
    extras: {
      overview: 'Since 1984, Transcorp Hilton has been the undisputed crown jewel of Abuja\'s hospitality scene. With nine food and beverage outlets, an award-winning spa, and impeccable service, this is where the world comes to do business in Nigeria.',
      spa: 'The Transcorp Spa is a full-service destination spa with 14 treatment rooms, a steam room, sauna, and hydrotherapy pool. Signature treatments include the "Abuja Awakening" full-body ritual.',
      dining: 'Nine dining venues including Bukka Restaurant (authentic Nigerian), Zuma Bar (rooftop cocktails), and the famous Sunday International Buffet.',
      delicacies: [
        { name: 'Tuwo Shinkafa', description: 'Northern Nigerian rice pudding with draw soup and assorted meats.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
        { name: 'Kilishi', description: 'Sun-dried spiced beef jerky, a Hausa delicacy, served as a bar snack.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400' },
        { name: 'Miyan Taushe', description: 'Pumpkin soup with groundnuts, served with tuwon shinkafa.', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400' },
      ]
    }
  },
  {
    name: 'Sheraton Abuja Hotel',
    city: 'Abuja', country: 'Nigeria',
    description: 'Elegant upscale hotel in the Central Business District with lush tropical gardens and outstanding conference facilities.',
    price: 72000, rating: 4.5, rooms: 45,
    images: [
      'https://images.unsplash.com/photo-1618842676088-c4d48a6a7e09?w=1200',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Conference Room', 'Parking'],
    extras: {
      overview: 'A favourite of business travellers visiting Abuja for its seamless blend of productivity and comfort. The 7-acre garden estate is one of the capital\'s best-kept secrets.',
      spa: 'Full-service spa with traditional hammam, hot stone massage, and an outdoor relaxation terrace.',
      dining: 'Orchid Restaurant serves Pan-African cuisine. The Pool Bar offers light bites and tropical cocktails throughout the day.',
      delicacies: [
        { name: 'Banga Soup', description: 'Palm fruit soup with fresh fish, a Niger Delta favourite.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
      ]
    }
  },
  {
    name: 'Nicon Luxury Hotel',
    city: 'Abuja', country: 'Nigeria',
    description: 'Modern luxury tower with panoramic views of the Abuja skyline, LED-lit infinity pool, and rooftop bar.',
    price: 58000, rating: 4.4, rooms: 30,
    images: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar', 'Parking'],
    extras: {
      overview: 'Nicon offers the most dramatic city views in Abuja from its glass-facade tower. The rooftop infinity pool is a signature experience.',
      spa: 'Couples massage suites with skyline views. Aromatherapy and reflexology available.',
      dining: 'Altitude Rooftop Bar serves premium cocktails from 5pm. The Sky Restaurant offers à la carte dining with panoramic views.',
      delicacies: [
        { name: 'Pepper Soup', description: 'Spiced catfish pepper soup — a Nigerian hangover cure and comfort food classic.', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400' },
      ]
    }
  },

  // ── PORT HARCOURT ──
  {
    name: 'Novotel Port Harcourt',
    city: 'Port Harcourt', country: 'Nigeria',
    description: 'The Garden City\'s finest international hotel with tropical gardens, an Olympic-sized pool, and easy access to the oil industry hub.',
    price: 55000, rating: 4.5, rooms: 40,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Conference Room', 'Parking'],
    extras: {
      overview: 'Port Harcourt\'s most established international hotel, popular with oil industry executives and leisure travellers alike. The lush 4-acre garden is the city\'s most pleasant outdoor space.',
      spa: 'Full spa services including traditional African massage using locally sourced palm kernel oil.',
      dining: 'The Garden Restaurant specialises in fresh seafood from the Niger Delta rivers. Try the fresh crayfish pepper soup — a local institution.',
      delicacies: [
        { name: 'Ofe Onugbu (Bitter Leaf Soup)', description: 'Igbo bitter leaf soup with stockfish, beef, and crayfish.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
        { name: 'Freshwater Crayfish Pepper Soup', description: 'Delicate Niger Delta crayfish in aromatic pepper broth.', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400' },
      ]
    }
  },
  {
    name: 'Hotel Presidential',
    city: 'Port Harcourt', country: 'Nigeria',
    description: 'Grand colonial-style hotel with generous rooms, private beach access, and the city\'s most celebrated Sunday buffet.',
    price: 42000, rating: 4.3, rooms: 35,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Bar', 'Conference Room', 'Parking', 'Beach Access'],
    extras: {
      overview: 'A Port Harcourt institution since 1973. The grand lobby and colonial architecture tell the story of Nigeria\'s oil boom era.',
      dining: 'The Brasserie is famous for its Sunday International Buffet, drawing Port Harcourt families every week.',
      delicacies: [
        { name: 'Rivers State Fisherman Soup', description: 'Rich and aromatic local fish soup with fresh herbs.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
      ]
    }
  },

  // ── KANO ──
  {
    name: 'Tahir Guest Palace',
    city: 'Kano', country: 'Nigeria',
    description: 'Elegant Hausa-inspired palace hotel near Kano\'s ancient city walls, offering an authentic Northern Nigerian experience.',
    price: 38000, rating: 4.4, rooms: 30,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Bar', 'Conference Room', 'Parking'],
    extras: {
      overview: 'Inspired by the great Kano Emirate palace, Tahir Guest Palace brings traditional Hausa architecture into the modern era. The hand-painted murals and intricate terracotta work are breathtaking.',
      dining: 'The Northern Kitchen serves authentic Hausa cuisine — the best tuwo shinkafa and miyan kuka in the city.',
      delicacies: [
        { name: 'Suya & Kilishi Board', description: 'Premium Kano suya and kilishi, served with sliced onions and chilli.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400' },
        { name: 'Tuwon Shinkafa & Miyan Kuka', description: 'Baobab leaf soup with rice pudding — the soul of Northern Nigerian cooking.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
      ]
    }
  },
  {
    name: 'Bolton White Hotels Kano',
    city: 'Kano', country: 'Nigeria',
    description: 'Contemporary business hotel in Kano\'s Nasarawa GRA, known for spotless rooms and reliable service.',
    price: 28000, rating: 4.1, rooms: 25,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking'],
    extras: {
      overview: 'A clean, reliable mid-range option for Kano business travellers who want consistency and value.',
      dining: 'Serves a mix of Nigerian staples and continental dishes. The grilled chicken and fried plantain combo is the staff favourite.',
      delicacies: [
        { name: 'Dan Wake', description: 'Bean flour dumplings in a tomato and groundnut sauce — a Kano street food classic.', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400' },
      ]
    }
  },

  // ── IBADAN ──
  {
    name: 'Premier Hotel Ibadan',
    city: 'Ibadan', country: 'Nigeria',
    description: 'Historic hotel on a hill overlooking Ibadan, the first skyscraper in West Africa and a symbol of Nigerian independence.',
    price: 25000, rating: 4.0, rooms: 20,
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200',
      'https://images.unsplash.com/photo-1618842676088-c4d48a6a7e09?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Bar', 'Parking', 'Conference Room'],
    extras: {
      overview: 'Built in 1961, Premier Hotel was West Africa\'s first high-rise and one of Nigeria\'s most historically significant buildings. Staying here is a lesson in Nigerian history.',
      dining: 'Classic Nigerian and continental menu. The Rooftop Terrace bar offers the best view of Ibadan\'s famous terracotta rooftops.',
      delicacies: [
        { name: 'Amala & Ewedu', description: 'Yam flour swallow with jute leaf soup and gbegiri — the Ibadan trinity.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
        { name: 'Asaro (Yam Porridge)', description: 'Creamy yam porridge with palm oil, crayfish, and vegetables.', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400' },
      ]
    }
  },
  {
    name: 'Kakanfo Inn & Conference Centre',
    city: 'Ibadan', country: 'Nigeria',
    description: 'Peaceful hillside retreat with lush gardens, well-priced rooms, and the city\'s largest conference facilities.',
    price: 18000, rating: 3.9, rooms: 28,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Conference Room', 'Parking'],
    extras: {
      overview: 'A beloved Ibadan staple for university events and family gatherings alike. The garden setting is genuinely beautiful.',
      dining: 'The Kakanfo Buffet is popular with Ibadan residents for weekend lunches. Traditional Yoruba dishes dominate the menu.',
      delicacies: [
        { name: 'Eba & Okra Soup', description: 'Garri cassava fufu with slimy okra soup and smoked fish.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
      ]
    }
  },

  // ── ENUGU ──
  {
    name: 'Nike Lake Resort',
    city: 'Enugu', country: 'Nigeria',
    description: 'Spectacular lakeside resort set on 750 acres, the largest hotel in Nigeria by land area, with its own lake, zoo, and art gallery.',
    price: 32000, rating: 4.3, rooms: 50,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Parking', 'Beach Access'],
    extras: {
      overview: 'Nike Lake Resort is unlike any hotel in Nigeria. Set on the shores of Nike Lake with 750 acres of grounds, it includes an art gallery with 7,000 artworks, a small zoo, boat rides, and a cultural village.',
      spa: 'Lakeside spa with open-air treatment pavilions. The signature "Coal City Detox" uses locally sourced clay and mineral water.',
      dining: 'The Lakeside Restaurant serves fresh lake fish — the tilapia grilled over charcoal is extraordinary.',
      delicacies: [
        { name: 'Ofe Akwu (Palm Nut Soup)', description: 'Rich Igbo palm nut soup with assorted meat and stockfish.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
        { name: 'Abacha (African Salad)', description: 'Shredded dried cassava with palm oil, garden eggs, and ugba.', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400' },
        { name: 'Grilled Lake Tilapia', description: 'Fresh tilapia from Nike Lake, grilled whole over charcoal.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400' },
      ]
    }
  },
  {
    name: 'Presidential Hotel Enugu',
    city: 'Enugu', country: 'Nigeria',
    description: 'Central Enugu hotel with mountain views, rooftop pool, and proximity to the city\'s best coal city attractions.',
    price: 22000, rating: 4.0, rooms: 22,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Bar', 'Parking'],
    extras: {
      overview: 'A solid mid-range choice in Enugu\'s city centre, walking distance from Independence Layout\'s restaurants and shops.',
      dining: 'Serves excellent Igbo food. The ofe onugbu (bitter leaf soup) is homemade daily.',
      delicacies: [
        { name: 'Onugbu (Bitter Leaf) Soup', description: 'Classic Enugu-style bitter leaf soup with beef and stockfish.', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
      ]
    }
  },
  {
    name: 'Enugu Garden Hotel',
    city: 'Enugu', country: 'Nigeria',
    description: 'Charming boutique hotel in a quiet GRA neighbourhood with a beautiful garden terrace and family-friendly atmosphere.',
    price: 15000, rating: 3.8, rooms: 15,
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200',
    ],
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Parking'],
    extras: {
      overview: 'Perfect for families and budget-conscious travellers who want a calm, green environment away from the city centre noise.',
      dining: 'Home-style Nigerian cooking. The mama-put style breakfast — with akara, ogi, and fried plantain — is a morning highlight.',
      delicacies: [
        { name: 'Akara & Ogi Breakfast', description: 'Bean cakes with smooth corn porridge — the Nigerian power breakfast.', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400' },
      ]
    }
  },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Hotel.deleteMany({});
    await Hotel.insertMany(hotels);
    console.log(`✓ Seeded ${hotels.length} hotels across 6 cities`);
    process.exit();
  })
  .catch(err => { console.error(err); process.exit(1); });