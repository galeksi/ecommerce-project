import { CartItem } from "../../types/Cart/CartItem";

export const mockCart: CartItem[] = [
  {
    amount: 1,
    product: {
      id: 1,
      title: "Generic Fresh Cheese",
      price: 100,
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      images: [
        "https://i.imgur.com/fpT4052.jpeg",
        "https://i.imgur.com/M3QKiC5.jpeg",
        "https://i.imgur.com/Dm2pPfd.jpeg",
      ],
      category: {
        id: 3,
        name: "Chaii",
        image: "https://i.imgur.com/rUWNzYa.jpeg",
      },
    },
  },
  {
    amount: 2,
    product: {
      id: 2,
      title: "Oriental Frozen Mouse Pad update 2",
      price: 18,
      description:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      images: [
        "https://i.imgur.com/O1LUkwy.jpeg",
        "https://i.imgur.com/0KlqHu9.jpeg",
        "https://i.imgur.com/RQL19O6.jpeg",
      ],
      category: {
        id: 4,
        name: "Shoes",
        image: "https://i.imgur.com/lVH533g.jpeg",
      },
    },
  },
];
