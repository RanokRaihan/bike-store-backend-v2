const productData = [
  {
    brand: "Yamaha",
    model: "WR250F",
    price: 280000,
    discount: 5,
    category: "Mountain",
    description:
      "The Yamaha WR250F is a rugged off-road motorcycle designed for mountain trails and rough terrains. It features a lightweight frame, high ground clearance, and excellent suspension.",
    quantity: 3,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738552633/bike-store/Yamaha-WR250F.png",
  },
  {
    brand: "KTM",
    model: "EXC 350",
    price: 320000,
    discount: 4,
    category: "Mountain",
    description:
      "The KTM EXC 350 is a high-performance dirt bike built for mountain adventures. It features a powerful 350cc engine, advanced suspension, and off-road tires.",
    quantity: 2,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738552881/bike-store/KTM-EXC-350.png",
  },
  {
    brand: "Honda",
    model: "CRF450L",
    price: 350000,
    discount: 6,
    category: "Mountain",
    description:
      "The Honda CRF450L is a dual-sport motorcycle designed for mountain trails and off-road adventures. It features a 450cc engine, long-travel suspension, and durable build.",
    quantity: 4,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738553315/bike-store/Honda-CRF450L.png",
  },
  {
    brand: "Suzuki",
    model: "DR-Z400S",
    price: 300000,
    discount: 3,
    category: "Mountain",
    description:
      "The Suzuki DR-Z400S is a versatile dual-sport motorcycle perfect for mountain trails. It features a 398cc engine, lightweight frame, and excellent off-road capabilities.",
    quantity: 5,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738553464/bike-store/Suzuki-DR-Z400S.png",
  },
  {
    brand: "Kawasaki",
    model: "Ninja 400",
    price: 250000,
    discount: 5,
    category: "Road",
    description:
      "The Kawasaki Ninja 400 is a sporty road motorcycle with a 399cc engine, sleek design, and excellent handling for city and highway rides.",
    quantity: 4,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738553637/bike-store/Kawasaki-Ninja-400.png",
  },
  {
    brand: "Yamaha",
    model: "YZF-R3",
    price: 220000,
    discount: 4,
    category: "Road",
    description:
      "The Yamaha YZF-R3 is a lightweight sportbike with a 321cc engine, aggressive styling, and smooth performance for road enthusiasts.",
    quantity: 3,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738553742/bike-store/Yamaha-YZF-R3.jpg",
  },
  {
    brand: "Honda",
    model: "CBR500R",
    price: 270000,
    discount: 6,
    category: "Road",
    description:
      "The Honda CBR500R is a sporty road motorcycle with a 471cc engine, comfortable ergonomics, and excellent fuel efficiency for daily commutes.",
    quantity: 2,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738553915/bike-store/Honda-CBR500R.webp",
  },
  {
    brand: "Suzuki",
    model: "GSX-S750",
    price: 320000,
    discount: 7,
    category: "Road",
    description:
      "The Suzuki GSX-S750 is a powerful road motorcycle with a 749cc engine, sporty design, and advanced electronics for a thrilling ride.",
    quantity: 3,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738554077/bike-store/Suzuki-GSX-S750.png",
  },
  {
    brand: "Royal Enfield",
    model: "Himalayan",
    price: 230000,
    discount: 4,
    category: "Hybrid",
    description:
      "The Royal Enfield Himalayan is a versatile adventure motorcycle with a 411cc engine, rugged build, and capabilities for both on-road and off-road rides.",
    quantity: 5,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738554173/bike-store/Royal-Enfield-Himalayan.jpg",
  },
  {
    brand: "BMW",
    model: "F 850 GS",
    price: 2800000,
    discount: 8,
    category: "Hybrid",
    description:
      "The BMW F 850 GS is a hybrid adventure motorcycle with an 853cc engine, advanced electronics, and capabilities for both city and off-road adventures.",
    quantity: 2,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738554247/bike-store/BMW-F850-GS.png",
  },
  {
    brand: "KTM",
    model: "390 Adventure",
    price: 260000,
    discount: 5,
    category: "Hybrid",
    description:
      "The KTM 390 Adventure is a hybrid adventure motorcycle with a 373cc engine, lightweight frame, and excellent performance for both road and trail rides.",
    quantity: 4,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738554328/bike-store/KTM-390-Adventure.png",
  },
  {
    brand: "Triumph",
    model: "Tiger 900",
    price: 3100000,
    discount: 7,
    category: "Hybrid",
    description:
      "The Triumph Tiger 900 is a premium hybrid adventure motorcycle with an 888cc engine, advanced features, and capabilities for long-distance touring and off-roading.",
    quantity: 3,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738554403/bike-store/Triumph-Tiger-900.png",
  },
  {
    brand: "Zero",
    model: "SR/F",
    price: 2800000,
    discount: 6,
    category: "Electric",
    description:
      "The Zero SR/F is a high-performance electric motorcycle with instant torque, a sleek design, and a range of up to 200 miles on a single charge.",
    quantity: 2,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738557882/bike-store/Zero-SR-F.webp",
  },
  {
    brand: "Harley-Davidson",
    model: "LiveWire",
    price: 3500000,
    discount: 8,
    category: "Electric",
    description:
      "The Harley-Davidson LiveWire is a premium electric motorcycle with a futuristic design, instant acceleration, and advanced technology for a thrilling ride.",
    quantity: 1,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738557969/bike-store/Harley-LiveWire.webp",
  },
  {
    brand: "Energica",
    model: "Ego",
    price: 3000000,
    discount: 5,
    category: "Electric",
    description:
      "The Energica Ego is a high-performance electric motorcycle with a sporty design, fast charging, and a range of up to 150 miles on a single charge.",
    quantity: 2,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738558053/bike-store/Energica-Ego.png",
  },
  {
    brand: "Tesla",
    model: "Cyclotron",
    price: 4000000,
    discount: 10,
    category: "Electric",
    description:
      "The Tesla Cyclotron is a futuristic electric motorcycle with cutting-edge technology, autonomous features, and a range of up to 250 miles on a single charge.",
    quantity: 1,
    image:
      "https://res.cloudinary.com/ranokraihan/image/upload/v1738478934/motorcycle-store/Tesla-Cyclotron.png",
  },
];

const stat = {
  imageNames: productData.map((product) => product.image.split("/").pop()),
  brandNames: productData.map((product) => product.brand),
  count: productData.length,
};

console.log(stat);

const statResult = {
  imageNames: [
    "Yamaha-WR250F.png",
    "KTM-EXC-350.png",
    "Honda-CRF450L.png",
    "Suzuki-DR-Z400S.png",
    "Kawasaki-Ninja-400.png",
    "Yamaha-YZF-R3.png",
    "Honda-CBR500R.png",
    "Suzuki-GSX-S750.png",
    "Royal-Enfield-Himalayan.png",
    "BMW-F850-GS.png",
    "KTM-390-Adventure.png",
    "Triumph-Tiger-900.png",
    "Zero-SR-F.png",
    "Harley-LiveWire.png",
    "Energica-Ego.png",
    "Tesla-Cyclotron.png",
  ],
  brandNames: [
    "Yamaha",
    "KTM",
    "Honda",
    "Suzuki",
    "Kawasaki",
    "Yamaha",
    "Honda",
    "Suzuki",
    "Royal Enfield",
    "BMW",
    "KTM",
    "Triumph",
    "Zero",
    "Harley-Davidson",
    "Energica",
    "Tesla",
  ],
  count: 16,
};
