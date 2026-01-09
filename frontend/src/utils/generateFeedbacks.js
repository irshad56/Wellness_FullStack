import fs from "fs";
import path from "path";

// Resolve absolute path
const practitionersPath = path.resolve("src/data/practitioners.json");

// Read practitioners JSON safely (Node v24 compatible)
const practitioners = JSON.parse(
  fs.readFileSync(practitionersPath, "utf-8")
);

const patientNames = [
  "Rahul Mehta", "Anita Verma", "John Carter", "Sneha Iyer",
  "Arjun Patel", "Emily Watson", "Neha Singh", "Michael Brown",
  "Pooja Sharma", "Daniel Lee", "Karthik R", "Sara Ali"
];

const comments = [
  { text: "Very professional and caring.", minRating: 4 },
  { text: "Treatment was highly effective.", minRating: 4 },
  { text: "Saw improvement within a few sessions.", minRating: 4 },
  { text: "Explained everything clearly.", minRating: 4 },
  { text: "Highly recommend this practitioner.", minRating: 5 },
  { text: "Felt comfortable and well guided.", minRating: 4 },
  { text: "Excellent holistic approach.", minRating: 5 },
  { text: "Pain relief was faster than expected.", minRating: 4 },
  { text: "Sessions were well structured.", minRating: 4 },
  { text: "Great experience overall.", minRating: 5 }
];

// Helper to generate realistic ratings
const generateRating = (min = 3) => {
  return Math.floor(Math.random() * (6 - min)) + min; // min → 5
};

let feedbacks = [];
let idCounter = 1;

practitioners.forEach(practitioner => {
  const feedbackCount = Math.floor(Math.random() * 6) + 10; // 10–15 feedbacks

  for (let i = 0; i < feedbackCount; i++) {
    const selectedComment =
      comments[Math.floor(Math.random() * comments.length)];

    feedbacks.push({
      id: `f-${String(idCounter).padStart(4, "0")}`,
      practitionerId: practitioner.id,
      patientName:
        patientNames[Math.floor(Math.random() * patientNames.length)],
      rating: generateRating(selectedComment.minRating),
      comment: selectedComment.text
    });

    idCounter++;
  }
});

// Write feedbacks.json
fs.writeFileSync(
  "src/data/feedbacks.json",
  JSON.stringify(feedbacks, null, 2)
);

console.log("✅ feedbacks.json generated successfully with ratings");