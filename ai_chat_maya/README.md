# BlueChat AI

BlueChat AI is a conversational AI-powered web application that utilizes Google's Generative AI (Gemini 1.5 Flash) model. The project includes a server-side implementation to handle AI-generated responses and a user-friendly chat interface with both light and dark modes.

## Features

- **Real-time AI Conversations**: Engage in conversations powered by Google's Generative AI model.
- **Light & Dark Mode**: Switch between visually appealing light and dark themes for the chat interface.
- **Custom Branding**: Subtle "BLUECHAT" branding in the chat container adds a stylish touch.
- **Loading Spinner**: Indicates AI response processing with an animated loading spinner.
- **Error Handling**: Provides basic error handling to ensure smooth user experience.
- **CORS Support**: Enables smooth communication between client and server with CORS and preflight request handling.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- A valid API key for Google's Generative AI (Gemini 1.5 Flash) model

### Installation

1. **Clone the Repository**:

    ```
    git clone https://github.com/anni-x1/BlueChat-AI.git
    cd BlueChat-AI
    ```

2. **Install Dependencies**:

    ```
    npm install
    ```

3. **Set Up Environment Variables**:

    Create a `.env` file in the root of the project and add your API key:

    ```
    API_KEY=your_google_generative_ai_api_key
    ```

4. **Run the Server**:

    ```
    node server.js
    ```

    The server will run on `http://localhost:59000`.

## Usage

- Send a `POST` request to `http://localhost:59000/submit` with a JSON payload containing the message you want to send to the AI model.
- Example payload:

    ```
    {
      "message": "Tell me a joke."
    }
    ```

- The server will respond with the AI's message in JSON format.

### Client-Side Integration

To integrate the server with your client-side chat interface:

1. Send a request to the `/submit` endpoint with the user's input.
2. Display the AI's response in the chat interface.

### Example Client-Side Request (JavaScript)

```
fetch('http://localhost:59000/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: 'What is the weather like today?' }),
})
    .then(response => response.json())
    .then(data => {
        console.log('AI response:', data.message);
        // Display the response in your chat UI
    })
    .catch(error => console.error('Error:', error));
```

## Future Enhancements

- **Chat History Storage**: Store and retrieve past conversations for users.
- **User Authentication**: Add user authentication to personalize the chat experience.
- **Enhanced Error Handling**: Display user-friendly error messages within the chat interface.

## Contributing

Feel free to fork the repository, create a new branch, and submit a pull request. Contributions are welcome!

