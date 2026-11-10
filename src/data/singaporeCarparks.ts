import { Carpark } from '../types/carpark';

export const INITIAL_SINGAPORE_CARPARKS: Carpark[] = [
  // CENTRAL / DOWNTOWN
  {
    id: "MBS-01",
    name: "Marina Bay Sands / Shoppes",
    address: "10 Bayfront Avenue, Singapore 018956",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2838, lng: 103.8591 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "Complimentary with $100 spend at Sands Rewards",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 2.0,
    has_ev_charging: true,
    ev_chargers: {
      total: 12,
      available: 5,
      operator: "SP Mobility",
      speed: "50kW DC Fast & 22kW AC"
    },
    rates: {
      weekday_peak: "$4.00 1st hr, $1.50/subseq 30m (7am-7pm)",
      weekday_offpeak: "$3.00 flat entry (7pm-7am)",
      saturday: "$4.00 1st hr, $1.50/subseq 30m",
      sunday_ph: "$4.00 1st hr, $1.50/subseq 30m",
      grace_period_mins: 10,
      estimated_hourly_rate: 7.0
    },
    lots: {
      car: { total: 1150, available: 320 },
      motorcycle: { total: 120, available: 45 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Marina Bay", "Tourist Spot", "Casino", "Convention Centre", "EV Charging"]
  },
  {
    id: "SUN-02",
    name: "Suntec City Mall & Convention Centre",
    address: "3 Temasek Boulevard, Singapore 038983",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2935, lng: 103.8572 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 16,
      available: 9,
      operator: "Charge+",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$2.60 1st hr, $0.70/subseq 15m (7am-5pm)",
      weekday_offpeak: "$2.80/entry (5pm-7am)",
      saturday: "$2.60 for 1st 4 hrs, $0.70/subseq 15m",
      sunday_ph: "$2.60 for 1st 4 hrs, $0.70/subseq 15m",
      grace_period_mins: 15,
      estimated_hourly_rate: 4.8
    },
    lots: {
      car: { total: 3100, available: 890 },
      motorcycle: { total: 200, available: 110 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Marina Centre", "Shopping Mall", "Esplanade MRT", "Promenade MRT"]
  },
  {
    id: "URA-TA1",
    name: "Telok Ayer Street (URA Carpark)",
    address: "Telok Ayer Street / McCallum St, Singapore 068641",
    agency: "URA",
    carpark_type: "Surface Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2798, lng: 103.8475 },
    region: "Central",
    short_term_parking: "7AM-10.30PM",
    free_parking: "SUN & PH 7.00AM - 10.30PM",
    night_parking: false,
    car_park_decks: 1,
    gantry_height: 4.5,
    has_ev_charging: false,
    rates: {
      weekday_peak: "$1.40 / 30 mins (7am-5pm)",
      weekday_offpeak: "$0.80 / 30 mins (5pm-10:30pm)",
      saturday: "$1.40 / 30 mins",
      sunday_ph: "Free (7am-10:30pm)",
      grace_period_mins: 15,
      estimated_hourly_rate: 2.8
    },
    lots: {
      car: { total: 64, available: 6 },
      heavy: { total: 0, available: 0 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["CBD", "Dining", "Telok Ayer MRT", "Free Sunday Parking"]
  },
  {
    id: "HDB-CC1",
    name: "Chinatown Complex MSCP",
    address: "Blk 335 Smith Street, Singapore 050335",
    agency: "HDB",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2824, lng: 103.8431 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "SUN & PH 7.00AM - 10.30PM",
    night_parking: true,
    car_park_decks: 5,
    gantry_height: 2.15,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 2,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$1.20 / 30 mins (7am-5pm Central Area)",
      weekday_offpeak: "$0.60 / 30 mins",
      saturday: "$1.20 / 30 mins (7am-5pm)",
      sunday_ph: "Free 7am-10:30pm",
      grace_period_mins: 15,
      estimated_hourly_rate: 2.4
    },
    lots: {
      car: { total: 240, available: 18 },
      motorcycle: { total: 50, available: 14 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Chinatown", "Hawker Food", "Central Area", "HDB EPS"]
  },
  {
    id: "CAP-01",
    name: "CapitaSpring / Market Street",
    address: "88 Market Street, Singapore 048948",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2847, lng: 103.8502 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.05,
    has_ev_charging: true,
    ev_chargers: {
      total: 8,
      available: 4,
      operator: "Shell Recharge",
      speed: "50kW DC & 22kW AC"
    },
    rates: {
      weekday_peak: "$3.60 / 30 mins (7am-6pm)",
      weekday_offpeak: "$3.50/entry (6pm-7am)",
      saturday: "$3.50/entry",
      sunday_ph: "$3.50/entry",
      grace_period_mins: 10,
      estimated_hourly_rate: 7.2
    },
    lots: {
      car: { total: 380, available: 42 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Raffles Place", "Financial District", "Green Oasis"]
  },
  {
    id: "RAF-01",
    name: "Raffles City Shopping Centre",
    address: "252 North Bridge Road, Singapore 179103",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2938, lng: 103.8532 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 2.0,
    has_ev_charging: true,
    ev_chargers: {
      total: 8,
      available: 3,
      operator: "Charge+",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$2.80 1st hr, $0.65/subseq 15m (8am-6pm)",
      weekday_offpeak: "$3.20/entry (6pm-8am)",
      saturday: "$2.80 1st 2 hrs, $0.65/subseq 15m",
      sunday_ph: "$2.80 1st 2 hrs, $0.65/subseq 15m",
      grace_period_mins: 10,
      estimated_hourly_rate: 5.4
    },
    lots: {
      car: { total: 1040, available: 198 },
      motorcycle: { total: 90, available: 32 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["City Hall MRT", "Shopping", "Hotels"]
  },
  {
    id: "FUN-01",
    name: "Funan Mall Carpark",
    address: "107 North Bridge Road, Singapore 179097",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2912, lng: 103.8504 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 10,
      available: 6,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$2.60 1st hr, $0.65/subseq 15m (6am-6pm)",
      weekday_offpeak: "$3.50/entry (6pm-6am)",
      saturday: "$2.60 1st 2 hrs, $0.65/subseq 15m",
      sunday_ph: "$2.60 1st 2 hrs, $0.65/subseq 15m",
      grace_period_mins: 10,
      estimated_hourly_rate: 5.2
    },
    lots: {
      car: { total: 400, available: 82 },
      motorcycle: { total: 60, available: 20 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Tech Mall", "Climbing Wall", "Underground Pedestrian"]
  },
  {
    id: "BUG-01",
    name: "Bugis Junction Carpark",
    address: "200 Victoria Street, Singapore 188021",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3005, lng: 103.8553 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.0,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 1,
      operator: "Charge+",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$2.50 1st hr, $0.60/subseq 15m (8am-6pm)",
      weekday_offpeak: "$3.20/entry (6pm-8am)",
      saturday: "$2.50 1st 2 hrs, $0.60/subseq 15m",
      sunday_ph: "$2.50 1st 2 hrs, $0.60/subseq 15m",
      grace_period_mins: 15,
      estimated_hourly_rate: 4.9
    },
    lots: {
      car: { total: 650, available: 45 },
      motorcycle: { total: 75, available: 18 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Bugis MRT", "Retail", "Downtown Line"]
  },

  // ORCHARD ROAD SHOPPING BELT
  {
    id: "ION-01",
    name: "ION Orchard Carpark",
    address: "2 Orchard Turn, Singapore 238801",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3040, lng: 103.8318 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 4,
    gantry_height: 2.0,
    has_ev_charging: true,
    ev_chargers: {
      total: 10,
      available: 4,
      operator: "Shell Recharge",
      speed: "50kW DC Fast & 22kW AC"
    },
    rates: {
      weekday_peak: "$3.00 1st hr, $1.50/subseq 30m (8am-5pm)",
      weekday_offpeak: "$4.00/entry (5pm-12am)",
      saturday: "$3.74 1st hr, $1.87/subseq 30m",
      sunday_ph: "$3.74 1st hr, $1.87/subseq 30m",
      grace_period_mins: 10,
      estimated_hourly_rate: 6.0
    },
    lots: {
      car: { total: 600, available: 74 },
      motorcycle: { total: 50, available: 16 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Orchard MRT", "Luxury Shopping", "EV Fast Charging"]
  },
  {
    id: "TAK-01",
    name: "Ngee Ann City (Takashimaya)",
    address: "391 Orchard Road, Singapore 238873",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3025, lng: 103.8347 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 1.95,
    has_ev_charging: true,
    ev_chargers: {
      total: 8,
      available: 2,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$2.60 1st hr, $1.30/subseq 30m (8am-5pm)",
      weekday_offpeak: "$4.50/entry (5pm-12am)",
      saturday: "$4.50 1st 2 hrs, $1.80/subseq 30m",
      sunday_ph: "$4.50 1st 2 hrs, $1.80/subseq 30m",
      grace_period_mins: 10,
      estimated_hourly_rate: 5.2
    },
    lots: {
      car: { total: 1250, available: 185 },
      motorcycle: { total: 100, available: 38 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Department Store", "Kinokuniya", "Orchard Road"]
  },
  {
    id: "PAR-01",
    name: "Paragon Shopping Centre",
    address: "290 Orchard Road, Singapore 238859",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3039, lng: 103.8359 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.0,
    has_ev_charging: true,
    ev_chargers: {
      total: 4,
      available: 1,
      operator: "Tesla Supercharger & SP",
      speed: "120kW Supercharger"
    },
    rates: {
      weekday_peak: "$3.50 1st hr, $1.80/subseq 30m (7am-5pm)",
      weekday_offpeak: "$4.80/entry (5pm-7am)",
      saturday: "$4.00 1st 2 hrs, $2.00/subseq 30m",
      sunday_ph: "$4.00 1st 2 hrs, $2.00/subseq 30m",
      grace_period_mins: 10,
      estimated_hourly_rate: 7.1
    },
    lots: {
      car: { total: 420, available: 29 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Medical Suites", "High End", "Supercharger"]
  },
  {
    id: "PS-01",
    name: "Plaza Singapura Carpark",
    address: "68 Orchard Road, Singapore 238839",
    agency: "Commercial",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3006, lng: 103.8452 },
    region: "Central",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 5,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 8,
      available: 5,
      operator: "Charge+",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$2.60 1st hr, $0.65/subseq 15m (6am-6pm)",
      weekday_offpeak: "$3.50/entry (6pm-6am)",
      saturday: "$2.60 1st 2 hrs, $0.65/subseq 15m",
      sunday_ph: "$2.60 1st 2 hrs, $0.65/subseq 15m",
      grace_period_mins: 15,
      estimated_hourly_rate: 5.2
    },
    lots: {
      car: { total: 720, available: 164 },
      motorcycle: { total: 80, available: 42 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["Dhoby Ghaut Interchange", "Golden Village", "Family Mall"]
  },

  // EAST REGION
  {
    id: "JWL-01",
    name: "Jewel Changi Airport (General Carpark 2M/B2M)",
    address: "78 Airport Boulevard, Singapore 819666",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3602, lng: 103.9898 },
    region: "East",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 14,
      available: 8,
      operator: "Shell Recharge & SP Mobility",
      speed: "60kW DC Fast"
    },
    rates: {
      weekday_peak: "$0.04 / min ($2.40/hr)",
      weekday_offpeak: "$0.04 / min ($2.40/hr)",
      saturday: "$0.04 / min ($2.40/hr)",
      sunday_ph: "$0.04 / min ($2.40/hr)",
      grace_period_mins: 10,
      estimated_hourly_rate: 2.4
    },
    lots: {
      car: { total: 2500, available: 710 },
      motorcycle: { total: 180, available: 94 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["Changi Airport", "Rain Vortex", "Terminal 1", "24/7 Dining"]
  },
  {
    id: "CAG-T3",
    name: "Changi Airport Terminal 3 Carpark 3B",
    address: "65 Airport Boulevard, Singapore 819663",
    agency: "LTA",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3556, lng: 103.9865 },
    region: "East",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 2.15,
    has_ev_charging: true,
    ev_chargers: {
      total: 8,
      available: 4,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$0.04 / min ($2.40/hr)",
      weekday_offpeak: "$0.04 / min ($2.40/hr)",
      saturday: "$0.04 / min ($2.40/hr)",
      sunday_ph: "$0.04 / min ($2.40/hr)",
      grace_period_mins: 10,
      estimated_hourly_rate: 2.4
    },
    lots: {
      car: { total: 1800, available: 420 },
      motorcycle: { total: 150, available: 70 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Airport Transit", "Terminal 3", "LTA"]
  },
  {
    id: "TP24",
    name: "Tampines Central MSCP (Blk 505 / Tampines Hub)",
    address: "Tampines Ave 4 / Blk 505, Singapore 520505",
    agency: "HDB",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3533, lng: 103.9405 },
    region: "East",
    short_term_parking: "24 HOURS",
    free_parking: "SUN & PH 7.00AM - 10.30PM",
    night_parking: true,
    car_park_decks: 6,
    gantry_height: 2.15,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 3,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$0.60 / 30 mins",
      weekday_offpeak: "$0.60 / 30 mins (max $5 night cap)",
      saturday: "$0.60 / 30 mins",
      sunday_ph: "Free (7am-10:30pm)",
      grace_period_mins: 15,
      estimated_hourly_rate: 1.2
    },
    lots: {
      car: { total: 420, available: 86 },
      motorcycle: { total: 80, available: 35 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["Our Tampines Hub", "HDB EPS", "Free Sunday Parking", "Sports"]
  },
  {
    id: "BM1",
    name: "Bedok Town Centre MSCP (Blk 207)",
    address: "Blk 207 New Upper Changi Road, Singapore 460207",
    agency: "HDB",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3242, lng: 103.9312 },
    region: "East",
    short_term_parking: "24 HOURS",
    free_parking: "SUN & PH 7.00AM - 10.30PM",
    night_parking: true,
    car_park_decks: 5,
    gantry_height: 2.15,
    has_ev_charging: false,
    rates: {
      weekday_peak: "$0.60 / 30 mins",
      weekday_offpeak: "$0.60 / 30 mins",
      saturday: "$0.60 / 30 mins",
      sunday_ph: "Free (7am-10:30pm)",
      grace_period_mins: 15,
      estimated_hourly_rate: 1.2
    },
    lots: {
      car: { total: 310, available: 41 },
      motorcycle: { total: 60, available: 22 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Bedok Mall", "Bedok Hawker Centre", "Interchange"]
  },
  {
    id: "PLQ-01",
    name: "Paya Lebar Quarter (PLQ Mall)",
    address: "10 Paya Lebar Road, Singapore 409057",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3175, lng: 103.8928 },
    region: "East",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 2,
      operator: "Shell Recharge",
      speed: "50kW DC & 22kW AC"
    },
    rates: {
      weekday_peak: "$2.20 1st hr, $0.55/subseq 15m (6am-6pm)",
      weekday_offpeak: "$3.00/entry (6pm-6am)",
      saturday: "$2.20 1st 2 hrs, $0.55/subseq 15m",
      sunday_ph: "$2.20 1st 2 hrs, $0.55/subseq 15m",
      grace_period_mins: 15,
      estimated_hourly_rate: 4.4
    },
    lots: {
      car: { total: 850, available: 195 },
      motorcycle: { total: 90, available: 40 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["Paya Lebar MRT", "Grade A Offices", "Cinemas"]
  },
  {
    id: "MP-01",
    name: "Marine Parade Central MSCP",
    address: "Blk 89 Marine Parade Central, Singapore 440089",
    agency: "HDB",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3023, lng: 103.9061 },
    region: "East",
    short_term_parking: "24 HOURS",
    free_parking: "SUN & PH 7.00AM - 10.30PM",
    night_parking: true,
    car_park_decks: 4,
    gantry_height: 2.15,
    has_ev_charging: true,
    ev_chargers: {
      total: 4,
      available: 1,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$0.60 / 30 mins",
      weekday_offpeak: "$0.60 / 30 mins",
      saturday: "$0.60 / 30 mins",
      sunday_ph: "Free (7am-10:30pm)",
      grace_period_mins: 15,
      estimated_hourly_rate: 1.2
    },
    lots: {
      car: { total: 290, available: 32 },
      motorcycle: { total: 40, available: 15 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Marine Parade MRT", "Hawker Food", "Library"]
  },

  // WEST REGION
  {
    id: "JP-01",
    name: "Jurong Point Shopping Centre",
    address: "1 Jurong West Central 2, Singapore 648886",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3404, lng: 103.7064 },
    region: "West",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.05,
    has_ev_charging: true,
    ev_chargers: {
      total: 10,
      available: 6,
      operator: "Charge+",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$1.40 1st 2 hrs, $1.15/subseq 30m (7am-5pm)",
      weekday_offpeak: "$2.35/entry (5pm-7am)",
      saturday: "$2.35 1st 2 hrs, $1.15/subseq 30m",
      sunday_ph: "$2.35 1st 2 hrs, $1.15/subseq 30m",
      grace_period_mins: 15,
      estimated_hourly_rate: 2.3
    },
    lots: {
      car: { total: 1400, available: 310 },
      motorcycle: { total: 110, available: 45 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Boon Lay MRT", "Bus Interchange", "Community Hub"]
  },
  {
    id: "JEM-01",
    name: "JEM & Westgate (Jurong East Gateway)",
    address: "50 Jurong Gateway Road, Singapore 608549",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3331, lng: 103.7436 },
    region: "West",
    short_term_parking: "24 HOURS",
    free_parking: "12pm - 2pm Weekdays (with $30 spend)",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 12,
      available: 7,
      operator: "SP Mobility",
      speed: "50kW DC & 22kW AC"
    },
    rates: {
      weekday_peak: "$1.60 1st hr, $0.50/subseq 15m (6am-6pm)",
      weekday_offpeak: "$3.00/entry (6pm-6am)",
      saturday: "$2.50 1st 2 hrs, $0.50/subseq 15m",
      sunday_ph: "$2.50 1st 2 hrs, $0.50/subseq 15m",
      grace_period_mins: 10,
      estimated_hourly_rate: 3.6
    },
    lots: {
      car: { total: 1650, available: 420 },
      motorcycle: { total: 130, available: 62 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["Jurong East MRT", "Jurong Lake District", "Suburban Hub"]
  },
  {
    id: "IMM-01",
    name: "IMM Building (Outlet Mall)",
    address: "2 Jurong East Street 21, Singapore 609601",
    agency: "Commercial",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3349, lng: 103.7468 },
    region: "West",
    short_term_parking: "24 HOURS",
    free_parking: "1st hr FREE weekdays (excl PH)",
    night_parking: true,
    car_park_decks: 6,
    gantry_height: 2.2,
    has_ev_charging: true,
    ev_chargers: {
      total: 8,
      available: 3,
      operator: "Charge+",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "1st hr FREE, $1.30/subseq 30m (8am-6pm)",
      weekday_offpeak: "$3.00/entry (6pm-8am)",
      saturday: "$2.80 1st 2 hrs, $1.30/subseq 30m",
      sunday_ph: "$2.80 1st 2 hrs, $1.30/subseq 30m",
      grace_period_mins: 15,
      estimated_hourly_rate: 2.6
    },
    lots: {
      car: { total: 1200, available: 260 },
      motorcycle: { total: 100, available: 50 },
      heavy: { total: 40, available: 12 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Outlet Mall", "1st Hr Free Parking", "Warehouse Outlet"]
  },
  {
    id: "C23",
    name: "Clementi Town Centre MSCP (Blk 447)",
    address: "Blk 447 Clementi Avenue 3, Singapore 120447",
    agency: "HDB",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3148, lng: 103.7652 },
    region: "West",
    short_term_parking: "24 HOURS",
    free_parking: "SUN & PH 7.00AM - 10.30PM",
    night_parking: true,
    car_park_decks: 5,
    gantry_height: 2.15,
    has_ev_charging: true,
    ev_chargers: {
      total: 4,
      available: 2,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$0.60 / 30 mins",
      weekday_offpeak: "$0.60 / 30 mins",
      saturday: "$0.60 / 30 mins",
      sunday_ph: "Free (7am-10:30pm)",
      grace_period_mins: 15,
      estimated_hourly_rate: 1.2
    },
    lots: {
      car: { total: 380, available: 52 },
      motorcycle: { total: 70, available: 28 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Clementi MRT", "Hawker Centre", "HDB Hub"]
  },
  {
    id: "SV-01",
    name: "The Star Vista Carpark",
    address: "1 Vista Exchange Green, Singapore 138617",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3068, lng: 103.7885 },
    region: "West",
    short_term_parking: "24 HOURS",
    free_parking: "12pm - 2pm Weekdays (with $30 min spend)",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 4,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$1.50 1st hr, $0.50/subseq 15m (6am-6pm)",
      weekday_offpeak: "$3.20/entry (6pm-6am)",
      saturday: "$2.60 1st 2 hrs, $0.50/subseq 15m",
      sunday_ph: "$2.60 1st 2 hrs, $0.50/subseq 15m",
      grace_period_mins: 10,
      estimated_hourly_rate: 3.5
    },
    lots: {
      car: { total: 800, available: 215 },
      motorcycle: { total: 60, available: 31 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["Buona Vista MRT", "Star PAC", "One-North"]
  },

  // NORTH REGION
  {
    id: "W12",
    name: "Woodlands Civic Centre MSCP",
    address: "900 South Woodlands Drive, Singapore 730900",
    agency: "HDB",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.4348, lng: 103.7865 },
    region: "North",
    short_term_parking: "24 HOURS",
    free_parking: "SUN & PH 7.00AM - 10.30PM",
    night_parking: true,
    car_park_decks: 6,
    gantry_height: 2.15,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 4,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$0.60 / 30 mins",
      weekday_offpeak: "$0.60 / 30 mins",
      saturday: "$0.60 / 30 mins",
      sunday_ph: "Free (7am-10:30pm)",
      grace_period_mins: 15,
      estimated_hourly_rate: 1.2
    },
    lots: {
      car: { total: 460, available: 94 },
      motorcycle: { total: 80, available: 42 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Woodlands Regional Centre", "Library", "Causeway Proximity"]
  },
  {
    id: "NP-01",
    name: "Northpoint City (Yishun Central)",
    address: "930 Yishun Avenue 2, Singapore 769098",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.4296, lng: 103.8362 },
    region: "North",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.05,
    has_ev_charging: true,
    ev_chargers: {
      total: 8,
      available: 5,
      operator: "Charge+",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$1.40 1st hr, $0.80/subseq 30m (7am-5pm)",
      weekday_offpeak: "$2.60/entry (5pm-7am)",
      saturday: "$2.60 1st 2 hrs, $0.80/subseq 30m",
      sunday_ph: "$2.60 1st 2 hrs, $0.80/subseq 30m",
      grace_period_mins: 15,
      estimated_hourly_rate: 3.0
    },
    lots: {
      car: { total: 1050, available: 168 },
      motorcycle: { total: 90, available: 39 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Yishun MRT", "North Wing", "South Wing"]
  },
  {
    id: "AMK1",
    name: "Ang Mo Kio Central MSCP (Blk 712)",
    address: "Blk 712 Ang Mo Kio Ave 6, Singapore 560712",
    agency: "HDB",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3698, lng: 103.8475 },
    region: "North",
    short_term_parking: "24 HOURS",
    free_parking: "SUN & PH 7.00AM - 10.30PM",
    night_parking: true,
    car_park_decks: 5,
    gantry_height: 2.15,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 3,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$0.60 / 30 mins",
      weekday_offpeak: "$0.60 / 30 mins",
      saturday: "$0.60 / 30 mins",
      sunday_ph: "Free (7am-10:30pm)",
      grace_period_mins: 15,
      estimated_hourly_rate: 1.2
    },
    lots: {
      car: { total: 390, available: 68 },
      motorcycle: { total: 60, available: 25 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["AMK Hub", "Hawker Food", "Ang Mo Kio MRT"]
  },
  {
    id: "J8-01",
    name: "Junction 8 Shopping Centre (Bishan)",
    address: "9 Bishan Place, Singapore 579837",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3508, lng: 103.8488 },
    region: "North",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.0,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 2,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$1.60 1st hr, $0.50/subseq 15m (6am-6pm)",
      weekday_offpeak: "$2.80/entry (6pm-6am)",
      saturday: "$2.60 1st 2 hrs, $0.50/subseq 15m",
      sunday_ph: "$2.60 1st 2 hrs, $0.50/subseq 15m",
      grace_period_mins: 10,
      estimated_hourly_rate: 3.6
    },
    lots: {
      car: { total: 490, available: 55 },
      motorcycle: { total: 50, available: 18 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Bishan MRT", "Circle Line Hub", "Cinemas"]
  },
  {
    id: "TPY-01",
    name: "Toa Payoh Central Hub MSCP (Blk 499)",
    address: "Blk 499 Toa Payoh Lorong 6, Singapore 310499",
    agency: "HDB",
    carpark_type: "Multi-Storey Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3328, lng: 103.8499 },
    region: "North",
    short_term_parking: "24 HOURS",
    free_parking: "SUN & PH 7.00AM - 10.30PM",
    night_parking: true,
    car_park_decks: 6,
    gantry_height: 2.15,
    has_ev_charging: true,
    ev_chargers: {
      total: 4,
      available: 2,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$0.60 / 30 mins",
      weekday_offpeak: "$0.60 / 30 mins",
      saturday: "$0.60 / 30 mins",
      sunday_ph: "Free (7am-10:30pm)",
      grace_period_mins: 15,
      estimated_hourly_rate: 1.2
    },
    lots: {
      car: { total: 480, available: 110 },
      motorcycle: { total: 70, available: 32 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["HDB Hub", "Toa Payoh MRT", "Town Centre"]
  },

  // NORTH-EAST REGION
  {
    id: "WWP-01",
    name: "Waterway Point Carpark (Punggol)",
    address: "83 Punggol Central, Singapore 828761",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.4067, lng: 103.9021 },
    region: "North-East",
    short_term_parking: "24 HOURS",
    free_parking: "12pm - 2pm Weekdays (with min spend)",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 8,
      available: 4,
      operator: "Charge+",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$1.40 1st hr, $0.80/subseq 30m (7am-5pm)",
      weekday_offpeak: "$2.60/entry (5pm-7am)",
      saturday: "$2.60 1st 2 hrs, $0.80/subseq 30m",
      sunday_ph: "$2.60 1st 2 hrs, $0.80/subseq 30m",
      grace_period_mins: 15,
      estimated_hourly_rate: 3.0
    },
    lots: {
      car: { total: 1200, available: 340 },
      motorcycle: { total: 100, available: 52 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["Punggol MRT", "Waterway", "Shaw Theatres"]
  },
  {
    id: "NEX-01",
    name: "NEX Serangoon Carpark",
    address: "23 Serangoon Central, Singapore 556083",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3503, lng: 103.8732 },
    region: "North-East",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 2.05,
    has_ev_charging: true,
    ev_chargers: {
      total: 8,
      available: 3,
      operator: "Shell Recharge",
      speed: "50kW DC Fast & 22kW AC"
    },
    rates: {
      weekday_peak: "$1.50 1st hr, $0.50/subseq 15m (7am-5pm)",
      weekday_offpeak: "$2.80/entry (5pm-7am)",
      saturday: "$2.50 1st 2 hrs, $0.50/subseq 15m",
      sunday_ph: "$2.50 1st 2 hrs, $0.50/subseq 15m",
      grace_period_mins: 10,
      estimated_hourly_rate: 3.5
    },
    lots: {
      car: { total: 850, available: 92 },
      motorcycle: { total: 80, available: 26 }
    },
    trend: "filling",
    last_updated: new Date().toISOString(),
    tags: ["Serangoon Interchange", "24/7 FairPrice Xtra", "Rooftop Park"]
  },
  {
    id: "SKG-01",
    name: "Sengkang Grand Mall Carpark",
    address: "70 Compassvale Bow, Singapore 544692",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.3828, lng: 103.8935 },
    region: "North-East",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 4,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$1.40 1st hr, $0.70/subseq 30m (7am-6pm)",
      weekday_offpeak: "$2.50/entry (6pm-7am)",
      saturday: "$2.40 1st 2 hrs, $0.70/subseq 30m",
      sunday_ph: "$2.40 1st 2 hrs, $0.70/subseq 30m",
      grace_period_mins: 15,
      estimated_hourly_rate: 2.8
    },
    lots: {
      car: { total: 420, available: 145 },
      motorcycle: { total: 50, available: 24 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Buangkok MRT", "Integrated Hub", "Hawker Centre"]
  },

  // SOUTH / HARBOURFRONT / SENTOSA
  {
    id: "VIV-01",
    name: "VivoCity Carpark",
    address: "1 HarbourFront Walk, Singapore 098585",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2642, lng: 103.8222 },
    region: "South",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 4,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 14,
      available: 6,
      operator: "SP Mobility & Charge+",
      speed: "50kW DC Fast"
    },
    rates: {
      weekday_peak: "$1.60 1st hr, $0.50/subseq 15m (7am-6pm)",
      weekday_offpeak: "$3.50/entry (6pm-7am)",
      saturday: "$2.80 1st 2 hrs, $0.60/subseq 15m",
      sunday_ph: "$2.80 1st 2 hrs, $0.60/subseq 15m",
      grace_period_mins: 15,
      estimated_hourly_rate: 3.6
    },
    lots: {
      car: { total: 2180, available: 620 },
      motorcycle: { total: 180, available: 75 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["HarbourFront MRT", "Sentosa Gateway", "Cruise Centre"]
  },
  {
    id: "SEN-01",
    name: "Sentosa Beach Station Carpark",
    address: "50 Beach View, Sentosa, Singapore 098604",
    agency: "LTA",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2514, lng: 103.8182 },
    region: "South",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 2,
    gantry_height: 2.15,
    has_ev_charging: true,
    ev_chargers: {
      total: 6,
      available: 3,
      operator: "SP Mobility",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$1.20 / 30 mins (7am-5pm)",
      weekday_offpeak: "$2.40/entry (5pm-7am)",
      saturday: "$1.20 / 30 mins",
      sunday_ph: "$1.20 / 30 mins",
      grace_period_mins: 10,
      estimated_hourly_rate: 2.4
    },
    lots: {
      car: { total: 700, available: 210 },
      motorcycle: { total: 50, available: 22 }
    },
    trend: "stable",
    last_updated: new Date().toISOString(),
    tags: ["Siloso Beach", "Palawan Beach", "Wings of Time"]
  },
  {
    id: "RWS-01",
    name: "Resorts World Sentosa Carpark",
    address: "8 Sentosa Gateway, Singapore 098269",
    agency: "Commercial",
    carpark_type: "Basement Car Park",
    parking_system: "Electronic Parking System",
    coordinates: { lat: 1.2571, lng: 103.8208 },
    region: "South",
    short_term_parking: "24 HOURS",
    free_parking: "NO",
    night_parking: true,
    car_park_decks: 3,
    gantry_height: 2.1,
    has_ev_charging: true,
    ev_chargers: {
      total: 10,
      available: 4,
      operator: "Charge+",
      speed: "22kW AC"
    },
    rates: {
      weekday_peak: "$7.00 1st hr, $2.00/subseq 30m (7am-7pm)",
      weekday_offpeak: "$7.00/entry (7pm-7am)",
      saturday: "$9.00 1st hr, $3.00/subseq 30m",
      sunday_ph: "$9.00 1st hr, $3.00/subseq 30m",
      grace_period_mins: 10,
      estimated_hourly_rate: 11.0
    },
    lots: {
      car: { total: 2800, available: 890 }
    },
    trend: "emptying",
    last_updated: new Date().toISOString(),
    tags: ["Universal Studios Singapore", "S.E.A. Aquarium", "Casino"]
  }
];
