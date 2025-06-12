export const fetchData = async (prompt, respond) => {
    const data = {
        message: prompt.usr_input
    };

    try {
        const response = await fetch('http://localhost:58000/api/chat/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        respond(json.message);
    } catch (error) {
        console.error('Error fetching data:', error);
        respond(`Error: ${error.message}`);  // Provide more detailed error feedback
    }
};

    