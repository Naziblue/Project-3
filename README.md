# Teleport City Scores

This project utilizes data from Teleport.org, focusing on 266 of the world's most livable and creative cities. The goal is to provide a comprehensive and interactive visualization tool to compare and evaluate the cities based on several key metrics, making it easier for users to select their next travel or relocation destination.

## Team Members

- Jacob Lackey
- Nikol Michailos
- Nazanin Beheshti

## Overview

Our visualization tool leverages data on overall Teleport scores, safety ratings, and cost of living indices. These are some of the key factors that influence one's decision to live or visit a particular city. The data-driven insights provided by our tool can be instrumental in helping users make more informed choices.

## Process

Here are the key steps we followed to create our interactive visualization tool:

1. **Data Extraction:** We used Python to extract data from the Teleport API. 

2. **Data Compilation:** The relevant metrics were gathered into a pandas DataFrame and then exported to a CSV file for further processing.

3. **Database Creation:** We created a SQL database to store the city data in a structured format, facilitating efficient data retrieval.

4. **API Setup:** The SQL database was integrated into a SQLite API via Flask, making it accessible via a web interface. This decoupled data layer provides flexibility and ensures the integrity of the original data.

5. **Data Visualization:** The city data from the API powers our JavaScript-based visualizations. This interactive tool offers a comprehensive and easily understandable view into Teleport's city data, allowing users to filter and explore cities based on their preferences.

## Summary

Our project, "Teleport City Scores," is an interactive tool that bridges the gap between raw city data and informed decisions for travel or relocation. By leveraging the power of modern data technologies, it takes into account factors such as safety, cost of living, and overall city scores to aid users in their decision-making process. With an intuitive interface and rich, insightful visualizations, we believe our tool can be a valuable resource for anyone interested in exploring, comparing, and understanding the key characteristics of some of the world's most livable and creative cities.