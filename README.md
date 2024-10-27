# EqualEarn

EqualEarn is a dynamic data visualization project that explores employment rates by gender across various countries. By comparing male and female employment rates over time, EqualEarn provides an insightful view into global employment equality trends. Built using D3.js, this project enables users to interact with employment data through an intuitive and visually engaging interface.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Data Sources](#data-sources)
- [Technology Stack](#technology-stack)
- [Setup and Usage](#setup-and-usage)

---

### Project Overview

EqualEarn visualizes employment rates for males and females across multiple countries from 1990 to the present. Through a clear lollipop chart, users can analyze how employment rates have changed over time and evaluate the gender gap in employment across different regions. The project's goal is to make it easier for policymakers, researchers, and the general public to understand employment equality trends at a glance.

![Completed Assignment](img/completed.png)

### Features

- **Interactive Data Selection**: Select a country from the dropdown menu to instantly update the chart with that country’s employment data.
- **Gender Comparison**: View male and female employment rates side by side for each selected country.
- **Time-Based Analysis**: Observe employment rate trends from 1990 to 2023, allowing for an understanding of historical changes.
- **User-Friendly Interface**: The clean, modern design ensures a seamless user experience with readable charts and accessible data.

### Data Sources

This project uses employment rate data sourced from reputable, publicly available datasets. The data is loaded from CSV files:
- `females_data.csv`: Contains annual female employment rates by country.
- `males_data.csv`: Contains annual male employment rates by country.

### Technology Stack

- **D3.js**: For data visualization and dynamic chart rendering.
- **HTML/CSS**: Structure and styling of the web interface.
- **JavaScript**: Core functionality and interactivity.
- **Bootstrap**: Responsive layout and UI elements.

### Setup and Usage

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/EqualEarn.git
   cd EqualEarn
