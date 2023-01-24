import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const stores = [
  {
    _id: new mongoose.Types.ObjectId(),
    storeName: "Walmart",
    posts: [],
  },  
  {
    _id: new mongoose.Types.ObjectId(),
    storeName: "Kroger",
    posts: [],
  },
]
export const users = [
  {
    _id: userIds[0],
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "password",
    storeName: "Walmart"
  },
  {
    _id: userIds[1],
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    password: "password",
    storeName: "Walmart"
  },
  {
    _id: userIds[2],
    firstName: "Bob",
    lastName: "Johnson",
    email: "bobjohnson@example.com",
    password: "password",
    storeName: "Walmart"
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[0],
    incidentType: "Theft",
    description: "Two men stole several items from the electronics section.",
    image: "https://example.com/incident1.jpg",
    store: stores[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    incidentType: "Theft",
    description: "A woman was seen leaving the store with a cart full of unpaid groceries.",
    image: "https://example.com/incident2.jpg",
    store: stores[1]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2],
    incidentType: "Assault",
    description: "A group of teenagers were caught shoplifting in the clothing section.",
    image: "https://example.com/incident3.jpg",
    store: stores[1]._id
  },
];