export async function mockTranscribe(audioDuration: number): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const sampleOrders = [
    "One large pepperoni pizza, extra cheese, with a side of garlic bread and a Diet Coke.",
    "Two burgers with fries, one without onions, and two chocolate milkshakes.",
    "Medium iced coffee, no sugar, with almond milk and a blueberry muffin.",
    "Caesar salad with grilled chicken, dressing on the side, and a glass of lemonade.",
    "Pasta carbonara, house salad, and a bottle of sparkling water.",
    "Three tacos, one vegetarian, chips and guacamole, and two iced teas.",
    "Grilled salmon with steamed vegetables, rice pilaf, and a glass of white wine.",
    "Chicken tikka masala, garlic naan, vegetable samosas, and mango lassi.",
  ];
  
  return sampleOrders[Math.floor(Math.random() * sampleOrders.length)];
}
