export interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
}

export const quizPool: Question[] = [
    {
        id: 1,
        question: "Which mode of transport has the lowest carbon footprint?",
        options: ["Electric Car", "Bus", "Bicycle", "Train"],
        correct: 2,
    },
    {
        id: 2,
        question: "What percentage of global emissions come from transportation?",
        options: ["5%", "16%", "25%", "40%"],
        correct: 1,
    },
    {
        id: 3,
        question: "How much CO₂ does planting one tree absorb per year?",
        options: ["5 kg", "10 kg", "22 kg", "50 kg"],
        correct: 2,
    },
    {
        id: 4,
        question: "Which gas is most abundant in the Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Methane"],
        correct: 2,
    },
    {
        id: 5,
        question: "What is the primary cause of ocean acidification?",
        options: ["Plastic pollution", "CO₂ absorption", "Oil spills", "Overfishing"],
        correct: 1,
    },
    {
        id: 6,
        question: "Which sector consumes the most fresh water?",
        options: ["Domestic use", "Industry", "Agriculture", "Energy generation"],
        correct: 2,
    },
    {
        id: 7,
        question: "What is the 'Greenhouse Effect'?",
        options: ["Cooling of Earth", "Trapping of heat", "Growth of plants", "Ozone depletion"],
        correct: 1,
    },
    {
        id: 8,
        question: "Which renewable energy source relies on the moon's gravity?",
        options: ["Solar", "Wind", "Tidal", "Geothermal"],
        correct: 2,
    },
    {
        id: 9,
        question: "What is 'e-waste'?",
        options: ["Leftover food", "Discarded electronics", "Online spam", "Digital trash"],
        correct: 1,
    },
    {
        id: 10,
        question: "Which country produces the most solar energy?",
        options: ["USA", "Germany", "China", "India"],
        correct: 2,
    },
    {
        id: 11,
        question: "How long does a plastic bottle take to decompose?",
        options: ["50 years", "100 years", "450 years", "1000 years"],
        correct: 2,
    },
    {
        id: 12,
        question: "What does the '3 R's' rule stand for?",
        options: ["Read, Run, Rest", "Reduce, Reuse, Recycle", "Repair, Rot, Refuse", "Ride, Recycle, Race"],
        correct: 1,
    },
    {
        id: 13,
        question: "Which of these is NOT a fossil fuel?",
        options: ["Coal", "Oil", "Natural Gas", "Uranium"],
        correct: 3,
    },
    {
        id: 14,
        question: "What is 'carbon neutrality'?",
        options: ["Zero emissions", "Balancing emissions", "Ignoring emissions", "Reducing emissions by 50%"],
        correct: 1,
    },
    {
        id: 15,
        question: "Which diet typically has the lowest carbon footprint?",
        options: ["Keto", "Paleo", "Vegan", "Mediterranean"],
        correct: 2,
    }
];
