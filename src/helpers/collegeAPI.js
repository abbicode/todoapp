const fetchCollegeData = async () => {
  const url = "https://api.data.gov/ed/collegescorecard/v1/schools";
  const apiKey = "vcWEZiScp9Sl90Iw278yRaqSScBRJtnvzbfxiH7y"; // Replace with your actual API key
  const fields = "id,school,latest";

  try {
    const response = await fetch(`${url}?api_key=${apiKey}&fields=${fields}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching college data:", error);
  }
};
module.exports = { fetchCollegeData };

// latest.cost.avg_net_price.overall
// "latest.student.FAFSA_applications":
// latest.student.demographics.women