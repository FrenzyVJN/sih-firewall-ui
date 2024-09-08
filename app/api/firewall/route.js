// app/api/gemma2/route.js

export async function POST(request) {
    try {
      // Extract JSON from request body
      const reqBody = await request.json();
  
      // Prepare request to external API
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gemma2", // Use the appropriate model name
          prompt: reqBody.prompt, // Extract prompt from the request body
          stream: reqBody.stream !== undefined ? reqBody.stream : false // Extract stream from the request body or use default false
        }),
      });
  
      if (!response.ok) {
        // Handle non-200 response
        const errorText = await response.text(); // Get the response as text for detailed error message
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      // Check if the response content type is JSON
      const contentType = response.headers.get('Content-Type');
      let data;
  
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Handle unexpected non-JSON response
        const text = await response.text();
        data = { error: `Unexpected response format: ${text}` };
      }
  
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error('Error fetching data from Gemma2:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch data from Gemma2' }), { status: 500 });
    }
  }
  