const MessageLibrary = {
  birthday: [
    "Wishing you a day full of laughter and a year full of dreams.",
    "Another year of making the world brighter just by being in it. Happy Birthday!",
    "Cheers to you! May your day be as incredible as the person you are.",
    "To a life well-lived and a year full of new adventures. Enjoy your day!",
    "Celebrate today like it's the start of your best chapter yet."
  ],
  romantic: [
    "You walked into my life and made everything brighter.",
    "Every moment with you is a gift I never want to stop opening.",
    "In a world full of temporary things, you are my forever.",
    "I didn't know what was missing until I found you.",
    "My heart beats a little faster every time I think of you."
  ],
  apology: [
    "I'm sorry for the hurt I caused. You mean more to me than my pride.",
    "I value our bond more than my mistakes. Please let me make it right.",
    "I'm learning, I'm growing, and I'm deeply sorry. I miss us.",
    "Words failed me, but my heart is sincere: I am truly sorry.",
    "Please forgive me for letting you down. You deserve better."
  ],
  friendship: [
    "Thanks for being the kind of friend who makes every day better.",
    "True friendship is a journey without an end. Thanks for walking with me.",
    "You're the family I chose, and I couldn't have picked better.",
    "To the person who knows my silence as well as my stories—thank you.",
    "Life is easier and much more fun with a friend like you by my side."
  ],
  motivation: [
    "The stars only shine because of the darkness. Keep going—you're reaching them.",
    "Your journey is unique, your pace is perfect. Don't stop now.",
    "Small steps lead to big destinations. Believe in your progress.",
    "You are stronger than your challenges and braver than your fears.",
    "The world needs the magic that only you can create."
  ],
  anniversary: [
    "Another year of love, laughter, and building our beautiful life together.",
    "To the person who still gives me butterflies after all these years.",
    "Happy Anniversary to the one who makes every day feel like a celebration.",
    "Through every season, you remain my favorite reason to smile.",
    "Cheers to us and the incredible story we're still writing."
  ],
  festival: [
    "May the light of this season fill your home with warmth and your heart with peace.",
    "Wishing you abundance, joy, and the company of loved ones this holiday.",
    "May the spirit of the celebration bring new hope and endless happiness.",
    "Celebrate the traditions, cherish the memories, and embrace the joy.",
    "Sending you warm wishes for a season full of magic and light."
  ],
  morning: [
    "Wake up to the endless possibilities of a brand new day. You've got this!",
    "Sending you a little sunshine to start your morning with a smile.",
    "May your coffee be strong and your day be productive and peaceful.",
    "Each morning is a fresh start. Make today count!",
    "Rise and shine! The world is waiting for your unique light."
  ],
  night: [
    "Close your eyes and let the peace of the night wrap around you. Rest well.",
    "The day is done; you did your best. Now, it's time to dream and rest.",
    "Stars above, peace below. Sleep tight and let your worries go.",
    "Wishing you a restful sleep and a morning full of new energy.",
    "Good night. May your dreams be as beautiful as your heart."
  ],
  // Global Festivals Extension
  thanksgiving: ["May your home be filled with laughter and your heart with gratitude this Thanksgiving."],
  independence_usa: ["Wishing you a sparkling 4th of July filled with pride, fireworks, and freedom!"],
  st_patricks: ["May the luck of the Irish be with you today and always. Happy St. Patrick's Day!"],
  oktoberfest: ["Prost! Wishing you a season of good cheer, great company, and the best of German tradition."],
  eid_al_fitr: ["Eid Mubarak! May this special day bring peace, happiness, and prosperity to everyone."],
  nowruz: ["Wishing you a New Year filled with the freshness of spring and the warmth of new beginnings."],
  diwali: ["May the divine light of Diwali spread into your life peace, prosperity, and good health."],
  holi: ["Let the colors of Holi spread the message of peace and happiness in your life."],
  enkutatash: ["May the new year bring blooming opportunities and a harvest of joy. Melkam Enkutatash!"],
  kwanzaa: ["Sending you light and strength as we celebrate heritage and community. Habari Gani!"],
  songkran: ["Wishing you a cool and refreshing Songkran. May your year be washed with good luck!"],
  tet: ["Chuc Mung Nam Moi! May the spring bring you vast wealth and endless happiness."],
  lunar_new_year: ["Gong Xi Fa Cai! May the new year bring you immense fortune and luck."],
  mid_autumn: ["May the glow of the full moon illuminate your path to health and togetherness."],
  carnival: ["Let the rhythm of the streets move your soul! Happy Carnival celebration to you!"],
  inti_raymi: ["Honor the sun and embrace the light of our ancestors. Wishing you a blessed Inti Raymi."]
};

const GLOBAL_FESTIVALS = [
  { id: 'thanksgiving', name: 'Thanksgiving', region: 'North America', emoji: '🦃' },
  { id: 'independence_usa', name: 'Independence Day', region: 'North America', emoji: '🇺🇸' },
  { id: 'st_patricks', name: 'St. Patrick\'s Day', region: 'Europe', emoji: '☘️' },
  { id: 'oktoberfest', name: 'Oktoberfest', region: 'Europe', emoji: '🍺' },
  { id: 'eid_al_fitr', name: 'Eid al-Fitr', region: 'Middle East', emoji: '🌙' },
  { id: 'nowruz', name: 'Nowruz', region: 'Middle East', emoji: '🌱' },
  { id: 'diwali', name: 'Diwali', region: 'India', emoji: '🪔' },
  { id: 'holi', name: 'Holi', region: 'India', emoji: '🎨' },
  { id: 'enkutatash', name: 'Enkutatash', region: 'Africa', emoji: '🌼' },
  { id: 'kwanzaa', name: 'Kwanzaa', region: 'Africa', emoji: '🕯️' },
  { id: 'songkran', name: 'Songkran', region: 'South East Asia', emoji: '💦' },
  { id: 'tet', name: 'Tet', region: 'South East Asia', emoji: '🧧' },
  { id: 'lunar_new_year', name: 'Lunar New Year', region: 'East Asia', emoji: '🏮' },
  { id: 'mid_autumn', name: 'Mid-Autumn', region: 'East Asia', emoji: '🥮' },
  { id: 'carnival', name: 'Carnival', region: 'South America', emoji: '🎭' },
  { id: 'inti_raymi', name: 'Inti Raymi', region: 'South America', emoji: '☀️' },
];

const THEMES = [
  { name: 'Romantic', bg: 'linear-gradient(135deg, #FFB7B2 0%, #FF1E56 100%)', accent: '#FFFFFF', decoration: 'hearts', font: 'Playfair Display' },
  { name: 'Minimal', bg: '#F8F9FA', accent: '#171717', decoration: 'border', font: 'Inter' },
  { name: 'Cute', bg: 'linear-gradient(135deg, #B2F2BB 0%, #A5D8FF 100%)', accent: '#1C7ED6', decoration: 'bubbles', font: 'Inter' },
  { name: 'Elegant', bg: 'linear-gradient(135deg, #1A1A1A 0%, #0F172A 100%)', accent: '#D4AF37', decoration: 'gold-foil', font: 'Georgia' },
  { name: 'Funny', bg: '#FFD43B', accent: '#FA5252', decoration: 'confetti', font: 'Arial Black' },
  { name: 'Luxury', bg: 'linear-gradient(135deg, #0B0B0B 0%, #2D3436 100%)', accent: '#D4AF37', decoration: 'diamonds', font: 'Playfair Display' },
  { name: 'Sunset', bg: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)', accent: '#000000', decoration: 'none', font: 'Inter' },
  { name: 'Ocean', bg: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)', accent: '#FFFFFF', decoration: 'none', font: 'Inter' },
];

export { MessageLibrary, GLOBAL_FESTIVALS, THEMES };
