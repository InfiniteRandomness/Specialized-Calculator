# Specialized Calculator

A specialized calculator for computing Absorption Coefficient and Prowess Rating with precise mathematical calculations.

## Key Features

- Client-side calculations
- Supports multiple input parameters (armor and damage)
- Rounds results to high precision (6 decimal places for Absorption Coefficient, 2 for Prowess Rating)
- Instant, responsive calculation interface
- Fully client-side (no server required)

## Formulas Used

- **Damage Absorption**: `(1 - AC) * 100%` where `AC = (base^2) / ((base + armor)^2)`
- **Prowess Rating (PR)**: `PR = (damage * (base + armor)^2) / (base^2)`

Where `base = 250`

## Usage

1. Enter positive values for Armor and Damage
2. Click Calculate to see results
3. Use Clear to reset the form

## Deployment

This calculator can be used directly in any modern web browser by opening the `index.html` file.