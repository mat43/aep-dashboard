# AEP Safety Observation Dashboard

I'm thrilled to share that my team earned **first place at HackOHI/O 2024**, held on October 19-20th, by creating this project for the American Electric Power (AEP) Safety Observation Challenge. This repository contains the dashboard component of our solution, designed to streamline and visualize safety report data.

## Project Overview

For this hackathon, our team addressed a real-world challenge faced by AEP: handling and analyzing large datasets of safety reports from site visits to prioritize and address potential hazards effectively.

### Solution Highlights

1. **Data Transformation & Organization**  
   - We began by converting AEP's raw CSV dataset into a SQLite database.
   - Additional fields were added to capture scores and categories for each report, improving organization and enabling more effective analysis.

2. **Risk Assessment with the InternLM2.5 Language Model**  
   - Using InternLM2.5, we assessed each report’s risk level and categorized it into one of 13 key safety categories relevant to AEP.
   - The model assigned a confidence score to each category, helping prioritize reports by severity and relevance.

3. **Interactive Dashboard**  
   - We built this intuitive dashboard using **Nuxt.js** to provide AEP with a powerful tool for data visualization and exploration.
   - Key features include:
     - Visual insights into hazard categories
     - Search functionality for specific fields
     - User-friendly layout to facilitate data analysis

## Dashboard Features

- **Category Summaries**: Display high-level overviews of categorized safety hazards.
- **Search & Filter**: Easily locate specific reports by various fields.
- **Confidence Scoring**: Assess the model’s certainty for each report classification.
- **User-Friendly Interface**: Prioritize simplicity to help AEP quickly identify high-risk entries.

## Team

This project was built by:
- [Mathew Sinadinos](https://github.com/mat43)  
- [Ethan Jones](https://github.com/Collatdmg)  
- [Trevor Pribis](https://github.com/tjbuddy100)  

We deepened our understanding of language models, data engineering, and collaborative problem-solving under tight time constraints.

### Acknowledgment

Thank you, HackOHI/O and AEP, for this opportunity to learn, innovate, and showcase our work!

## Video Explanation

For a full video explanation of our project, watch it on YouTube: [here](https://www.youtube.com/watch?v=n5ZxjT5SYxI&source_ve_path=MjM4NTE).

## Getting Started

### Prerequisites

- **Node.js** and **NPM**

### Installation

1. Clone this repository:
```bash
git clone https://github.com/mat43/aep-dashboard.git
```
   
2. Navigate into the project directory:
  ```bash
  cd aep-dashboard
```

3. Install dependencies:
  ```bash
  npm install
```

### Running the Dashboard

To start the development server:
```bash
npm run dev
```
This will launch the dashboard on `localhost:3000` by default.
