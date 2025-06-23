function areRectanglesColliding(rect1, rect2) {
  // Destructure the rectangles for clarity
  const [x1A, y1A, x2A, y2A] = rect1; // Rectangle A
  const [x1B, y1B, x2B, y2B] = rect2; // Rectangle B

  // If one rectangle is to the left of the other
  if (x2A < x1B || x2B < x1A) return false;

  // If one rectangle is above the other
  if (y2A < y1B || y2B < y1A) return false;

  // Otherwise, they overlap
  return true;
}

export { areRectanglesColliding };
