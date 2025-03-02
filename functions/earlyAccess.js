export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    try {
      const data = JSON.parse(event.body);
      const email = data.email;
      console.log("Email:", email);
      console.log("FAUNA_SECRET_KEY:", process.env.FAUNA_SECRET_KEY);
  
      // Define the FQLx query
      const query = `
        mutation {
          create_EarlyAccess(data: { email: "${email}" }) {
            _id
            email
          }
        }
      `;
  
      // Send request using fetch
      const response = await fetch("https://db.fauna.com/graphql", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.FAUNA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
  
      const result = await response.json();
  
      if (result.errors) {
        console.error("FaunaDB Error:", result.errors);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "FaunaDB Request Failed", details: result.errors }),
        };
      }
  
      console.log("Success: Early Access email added to FaunaDB", result);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Success", data: result.data }),
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      };
    }
  };
  