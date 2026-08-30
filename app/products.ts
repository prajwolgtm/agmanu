export type ProductCategory =
  | "Motor engine oil"
  | "Motorcycle oil"
  | "Hydraulic oil"
  | "Gear & transmission"
  | "Automotive grease"
  | "Industrial oil"
  | "Cooling"
  | "Agriculture"
  | "Passenger car"
  | "Specialty fluids";

export type Product = {
  name: string;
  category: ProductCategory;
  sae?: string;
  grade?: string;
  type?: string;
  packs: Record<string, number>;
};

export const categories: Array<{ name: "All" | ProductCategory; short: string }> = [
  { name: "All", short: "All products" },
  { name: "Motor engine oil", short: "Engine" },
  { name: "Motorcycle oil", short: "Motorcycle" },
  { name: "Hydraulic oil", short: "Hydraulic" },
  { name: "Gear & transmission", short: "Gear" },
  { name: "Automotive grease", short: "Grease" },
  { name: "Industrial oil", short: "Industrial" },
  { name: "Cooling", short: "Cooling" },
  { name: "Agriculture", short: "Agriculture" },
  { name: "Passenger car", short: "Passenger car" },
  { name: "Specialty fluids", short: "Specialty" },
];

export const products: Product[] = [
  {
    name: "Dynamic Turbo",
    category: "Motor engine oil",
    sae: "15W-40",
    grade: "API CI-4",
    packs: { "1 L": 850, "4 L": 3340, "6 L": 4990, "8 L": 6620, "10 L": 8220, "15 L": 12250, "20 L": 16250, "50 L": 40250, "200 L": 159500 },
  },
  {
    name: "Platinum Plus",
    category: "Motor engine oil",
    sae: "15W-40",
    grade: "API CH-4",
    packs: { "1 L": 790, "4 L": 3100, "6 L": 4625, "8 L": 6140, "10 L": 7615, "15 L": 11350, "20 L": 15100, "50 L": 37500, "200 L": 148500 },
  },
  {
    name: "Power Guard",
    category: "Motor engine oil",
    sae: "15W-40",
    grade: "API CF",
    packs: { "1 L": 770, "4 L": 3020, "6 L": 4505, "8 L": 5980, "10 L": 7420, "15 L": 11050, "20 L": 14700, "50 L": 36500, "200 L": 144500 },
  },
  {
    name: "Ultra Max",
    category: "Motor engine oil",
    sae: "20W-50",
    grade: "API SL",
    packs: { "1 L": 740, "4 L": 2825, "8 L": 5565, "10 L": 6950, "18 L": 12400, "20 L": 13750, "50 L": 34200, "200 L": 135500 },
  },
  {
    name: "Force Heavy",
    category: "Motor engine oil",
    sae: "20W-40",
    grade: "API CF",
    packs: { "1 L": 700, "4 L": 2700, "6 L": 4026, "8 L": 5350, "10 L": 6650, "15 L": 9900, "20 L": 13200, "50 L": 32500, "200 L": 124000 },
  },
  {
    name: "Pro-40",
    category: "Motor engine oil",
    sae: "SAE 40",
    grade: "API CF",
    packs: { "1 L": 575, "2 L": 1125, "4 L": 2200, "10 L": 5750, "20 L": 10500, "50 L": 25500, "200 L": 105000 },
  },
  {
    name: "Drive Supreme",
    category: "Motor engine oil",
    sae: "10W-40",
    grade: "API SP",
    type: "Semi-synthetic",
    packs: { "1 L": 950, "3 L": 2800, "4 L": 3700 },
  },
  {
    name: "Loaded Pulse Tech",
    category: "Motor engine oil",
    sae: "5W-30",
    grade: "API SP",
    type: "Fully synthetic",
    packs: { "1 L": 920, "3 L": 2720, "4 L": 3600 },
  },
  {
    name: "Scoot Pro",
    category: "Motorcycle oil",
    sae: "10W-30",
    grade: "API SL",
    packs: { "800 mL": 565, "1 L": 700 },
  },
  {
    name: "Moto Pro",
    category: "Motorcycle oil",
    sae: "20W-40",
    grade: "API SL",
    packs: { "1 L": 580, "1.2 L": 690 },
  },
  {
    name: "Moto Max",
    category: "Motorcycle oil",
    sae: "20W-50",
    grade: "API SL",
    packs: { "1 L": 600, "1.2 L": 710 },
  },
  {
    name: "Moto Racing",
    category: "Motorcycle oil",
    sae: "15W-50",
    grade: "API SL",
    packs: { "2.5 L": 2070 },
  },
  {
    name: "2T Racer",
    category: "Motorcycle oil",
    sae: "2T",
    grade: "API TC",
    packs: { "1 L": 570 },
  },
  {
    name: "Auto Drive",
    category: "Motorcycle oil",
    sae: "20W-50",
    grade: "API SL",
    packs: { "2 L": 1380 },
  },
  {
    name: "Hydra Pro",
    category: "Hydraulic oil",
    sae: "10W",
    packs: { "1 L": 760, "4 L": 2925, "10 L": 7200, "20 L": 14100, "50 L": 34800, "200 L": 136000 },
  },
  {
    name: "Hydra Force",
    category: "Hydraulic oil",
    grade: "ISO VG 46",
    packs: { "1 L": 650, "4 L": 2500, "10 L": 6150, "20 L": 12050, "50 L": 29400, "200 L": 114000 },
  },
  {
    name: "Hydra Max",
    category: "Hydraulic oil",
    grade: "ISO VG 68",
    packs: { "1 L": 660, "4 L": 2550, "10 L": 6250, "20 L": 12250, "50 L": 29900, "200 L": 116000 },
  },
  {
    name: "ATF Drive",
    category: "Gear & transmission",
    sae: "ATF TQ",
    packs: { "1 L": 780, "4 L": 3000, "10 L": 7400, "20 L": 14500, "50 L": 35000, "200 L": 135000 },
  },
  {
    name: "Agri Drive",
    category: "Gear & transmission",
    sae: "10W-30",
    type: "UTTO",
    packs: { "1 L": 755, "4 L": 2920, "10 L": 7150, "20 L": 13900, "50 L": 33250, "200 L": 127000 },
  },
  {
    name: "Gear Max",
    category: "Gear & transmission",
    sae: "85W-140",
    grade: "API GL-5",
    packs: { "1 L": 830, "4 L": 3200, "8 L": 6300, "10 L": 7800, "20 L": 15200, "50 L": 36500, "200 L": 142000 },
  },
  {
    name: "Gear Max",
    category: "Gear & transmission",
    sae: "80W-90",
    grade: "API GL-5",
    packs: { "1 L": 810, "4 L": 3120, "8 L": 6150, "10 L": 7600, "20 L": 14800, "50 L": 35500, "200 L": 138000 },
  },
  {
    name: "Gear Pro",
    category: "Gear & transmission",
    sae: "85W-140",
    grade: "API GL-4",
    packs: { "1 L": 710, "4 L": 2750, "8 L": 5400, "10 L": 6700, "20 L": 13000, "50 L": 31000, "200 L": 120000 },
  },
  {
    name: "Gear Pro",
    category: "Gear & transmission",
    sae: "80W-90",
    grade: "API GL-4",
    packs: { "1 L": 680, "4 L": 2650, "8 L": 5200, "10 L": 6400, "20 L": 12500, "50 L": 29800, "200 L": 115000 },
  },
  {
    name: "Gear Plus",
    category: "Gear & transmission",
    sae: "EP 90",
    grade: "API GL-3",
    packs: { "1 L": 630, "4 L": 2450, "8 L": 4800, "10 L": 5950, "20 L": 11600, "50 L": 27800, "200 L": 108000 },
  },
  {
    name: "Gear Plus",
    category: "Gear & transmission",
    sae: "EP 140",
    grade: "API GL-3",
    packs: { "1 L": 675, "4 L": 2620, "8 L": 5150, "10 L": 6400, "20 L": 12400, "50 L": 29800, "200 L": 116000 },
  },
  {
    name: "Gear Base",
    category: "Gear & transmission",
    sae: "FLO Grd",
    grade: "API GL-1",
    packs: { "1 L": 520, "4 L": 2000, "10 L": 4900, "20 L": 9600, "50 L": 22800, "200 L": 88000 },
  },
  {
    name: "Axle Pro",
    category: "Gear & transmission",
    sae: "80W-90",
    grade: "API GL-5",
    packs: { "1 L": 765, "4 L": 2950, "10 L": 7300, "20 L": 14200, "50 L": 34000, "200 L": 131000 },
  },
  {
    name: "Green Core",
    category: "Automotive grease",
    grade: "NLGI 2",
    type: "Multipurpose grease",
    packs: { "200 g": 112, "500 g": 270, "1 kg": 510, "2 kg": 1000, "3 kg": 1480, "5 kg": 2420, "10 kg": 4740, "18 kg": 8420, "180 kg": 79050 },
  },
  {
    name: "White Max",
    category: "Automotive grease",
    grade: "NLGI 2",
    type: "Calcium-base grease",
    packs: { "200 g": 143, "500 g": 345, "1 kg": 650, "2 kg": 1275, "3 kg": 1885, "5 kg": 3090, "10 kg": 6045, "18 kg": 10725, "180 kg": 100750 },
  },
  {
    name: "Ultra Plex",
    category: "Automotive grease",
    grade: "NLGI 2",
    type: "Multipurpose EP grease",
    packs: { "200 g": 134, "500 g": 325, "1 kg": 610, "2 kg": 1195, "3 kg": 1770, "5 kg": 2895, "10 kg": 5670, "18 kg": 10065, "180 kg": 94550 },
  },
  {
    name: "White Lithium",
    category: "Automotive grease",
    grade: "NLGI 2",
    type: "Lithium EP grease",
    packs: { "200 g": 195, "500 g": 470, "1 kg": 890, "2 kg": 1745, "3 kg": 2580, "5 kg": 4230, "10 kg": 8275, "18 kg": 14685, "180 kg": 137950 },
  },
  {
    name: "Red Lithium",
    category: "Automotive grease",
    grade: "NLGI 2",
    type: "Lithium-complex EP grease",
    packs: { "200 g": 230, "500 g": 555, "1 kg": 1050, "2 kg": 2060, "3 kg": 3045, "5 kg": 4990, "10 kg": 9765, "18 kg": 17325, "180 kg": 162750 },
  },
  {
    name: "Cutting Oil",
    category: "Industrial oil",
    grade: "ISOUG22",
    type: "Premium cutting oil",
    packs: { "1 L": 800, "4 L": 3100, "10 L": 7650, "20 L": 15100, "50 L": 37000, "200 L": 146000 },
  },
  {
    name: "Transformer Oil",
    category: "Industrial oil",
    grade: "IEC 60296",
    type: "Premium transformer oil",
    packs: { "1 L": 650, "4 L": 2500, "10 L": 6150, "20 L": 12100, "50 L": 29500, "200 L": 116000 },
  },
  {
    name: "Spindle Oil",
    category: "Industrial oil",
    grade: "ISO VG 10 / 22",
    type: "Premium spindle oil",
    packs: { "50 L": 35700, "200 L": 132400 },
  },
  {
    name: "Compressor Oil",
    category: "Industrial oil",
    grade: "ISO VG 68",
    type: "Premium compressor oil",
    packs: { "1 L": 605, "4 L": 2350, "10 L": 5750, "20 L": 11350, "50 L": 27750, "200 L": 109000 },
  },
  {
    name: "Turbine Oil",
    category: "Industrial oil",
    grade: "ISO VG 46 / 68",
    type: "Premium turbine oil",
    packs: { "50 L": 31000, "200 L": 112400 },
  },
  {
    name: "Cool-X RTU",
    category: "Cooling",
    grade: "Ready to use",
    packs: { "1 L": 250, "4 L": 950 },
  },
  {
    name: "Cool-X 1:4",
    category: "Cooling",
    grade: "Concentrate 1:4",
    packs: { "1 L": 312, "4 L": 1188 },
  },
  {
    name: "Agro-Max",
    category: "Agriculture",
    sae: "15W-40",
    grade: "API CF",
    packs: { "3.5 L": 2000 },
  },
  {
    name: "City Drive",
    category: "Passenger car",
    sae: "20W-50",
    grade: "API SL",
    packs: { "3 L": 2100 },
  },
  {
    name: "Fork Tech",
    category: "Specialty fluids",
    type: "Fork oil",
    packs: { "175 mL": 130, "350 mL": 235 },
  },
  {
    name: "Brake Fluid DOT 3",
    category: "Specialty fluids",
    grade: "J1703",
    packs: { "250 mL": 175, "500 mL": 332 },
  },
  {
    name: "Brake Fluid DOT 4",
    category: "Specialty fluids",
    grade: "J1704",
    packs: { "250 mL": 203, "500 mL": 388 },
  },
];
