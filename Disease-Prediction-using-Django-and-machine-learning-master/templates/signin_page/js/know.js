function toggleModal() {
    const modal = document.getElementById('info-modal');
    modal.classList.toggle('hidden'); // Use a class to control visibility
}

function populateModal() {
    const disease = document.getElementById('diseasesearch');
    var temp = disease.innerText;
    console.log(temp);
    
    console.log("Fetching disease info for:", disease);
   

    // Call the Django API to fetch disease information
    fetch(`/api/disease/${temp}`)
        .then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                displayError("Disease information not found.");
                return;
            }

            document.getElementById('disease-title').innerText = data.title || "No title available";
            document.getElementById('disease-description').innerText = data.description || "No description available";
            document.getElementById('disease-extract').innerText = data.extract || "No extract available";

            const link = document.getElementById('disease-link');
            if (data.link) {
                link.href = data.link;
                link.innerText = "Read More";
                link.style.display = "inline";
            } else {
                link.style.display = "none";
            }

            toggleModal();
        })
        .catch(error => {
            console.error("Error fetching disease info:", error);
            displayError("An error occurred while fetching disease information.");
        });
}

function displayError(message) {
    const errorElement = document.getElementById('error-message');
   message= errorElement.innerText ;
    errorElement.style.display = "block"; // Assuming you have an element to show errors
}

// // Attach click event to the button
// document.getElementById('info-button').addEventListener('click',populateModal);
