document.getElementById('scrapeButton').addEventListener('click', async function () {
  const keyword = document.getElementById('searchKeyword').value;
  
  if (!keyword) {
    alert("Please enter a search keyword.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const products = await response.json();

    displayResults(products);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("There was an error fetching the data. Please try again.");
  }
});

function displayResults(products) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (products.length === 0) {
    resultsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(product => {
    if (product.title && product.rating !== "No rating" && product.imageUrl !== "No image URL") {
      const productElement = document.createElement('div');
      productElement.classList.add('result-item');
      
      productElement.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>Rating: ${product.rating}</p>
        <p>${product.reviews}</p>
      `;

      resultsContainer.appendChild(productElement);
    }
  });
}
