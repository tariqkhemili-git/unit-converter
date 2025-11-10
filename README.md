# Unit Converter

A small, dependency-free web utility for converting between common metric and imperial units.

Features

- Convert metres ↔ feet, litres ↔ gallons, kilograms ↔ pounds
- Live, debounced updates as you type (300ms)
- Basic validation with helpful messages

Conversion rates used

- 1 metre = 3.28084 feet
- 1 litre = 0.264172 gallons
- 1 kilogram = 2.20462 pounds

How to use

1. Open `index.html` in your browser (double-click the file or serve with a static server).
2. Enter a number in the input — conversions update automatically (debounced 300ms). There is no Convert button; the UI updates live as you type.
3. See the conversions displayed for length, volume and mass.

Notes

- This project is intentionally small and dependency-free for easy embedding.
- Values are formatted to three decimal places for readability.

Development

- Files:
  - `index.html` — simple markup and form
  - `styles.css` — presentational styles
  - `script.js` — conversion logic

Licence

- Public domain / use as you wish.
