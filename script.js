function solve() {
  const imageInput = document.getElementById("imageInput").files[0];
  const mathInput = document.getElementById("mathInput").value.trim();
  const output = document.getElementById("output");

  output.textContent = "Processing...";

  if (imageInput) {
    Tesseract.recognize(
      imageInput,
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      output.textContent = "Text Detected: " + text.trim();
      solveMath(text.trim());
    });
  } else if (mathInput !== "") {
    solveMath(mathInput);
  } else {
    output.textContent = "Please enter a math problem or upload an image.";
  }
}

function solveMath(expression) {
  const output = document.getElementById("output");
  try {
    const result = math.evaluate(expression);
    output.textContent += `\n✅ Answer: ${result}`;
  } catch (err) {
    output.textContent += `\n❌ Error: ${err.message}`;
  }
}
