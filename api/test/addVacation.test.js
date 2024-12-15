const axios = require('axios');
const assert = require('assert');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const URL = process.env.URL_TESTING; 


function getToken(role) {
    if (role === "admin") {
      return jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_KEY, { expiresIn: '1h' });
    }else{
      return jwt.sign({ id: 1, role: 'regular' }, process.env.JWT_KEY, { expiresIn: '1h' });
    }
  }

  

describe("POST /vacations/add", () => {
    it("should add a vacation and return success status", async () => {
        const mockTokenAdmin = getToken("admin");
        const vacationData = {
            destination: "Tel Aviv,Israel",
            description: "Visit tel aviv",
            start_date: "2024-01-01",
            end_date: "2024-01-10",
            price: 1000,
            image: "tel-aviv.jpg"
        };

        try {
            const result = await axios.post(`${URL}/vacations/add`, vacationData, {
                headers: {
                    Cookie: `accessToken=${mockTokenAdmin}`, 
                },
            });

            assert.strictEqual(result.status, 201); 
            assert.strictEqual(result.data.message, "Vacation has been created");
        } catch (error) {
            console.error("Error during POST request:", error);
            assert.fail("Failed to add vacation");
        }
    });

    it("should return 400 for missing inputs", async () => {
        const mockTokenAdmin = getToken("admin");
        const vacationData = {
            destination: "",
            description: "",
            start_date: "",
            end_date: "",
            price: "",
            image: ""
        };

        try {
            await axios.post(`${URL}/vacations/add`, vacationData, {
                headers: {
                    Cookie: `accessToken=${mockTokenAdmin}`,
                },
            });
            assert.fail("Request should have failed with a 400 status");
        } catch (error) {
            assert.strictEqual(error.response?.status, 400);
            assert.strictEqual(error.response?.data.message, "Missing Vacation Inputs");
        }
    });

    it("should return 401 if no token is provided", async () => {
        const vacationData = {
            destination: "Tel Aviv,Israel",
            description: "Visit tel aviv",
            start_date: "2024-01-01",
            end_date: "2024-01-10",
            price: 1000,
            image: "tel-aviv.jpg"
        };

        try {
            await axios.post(`${URL}/vacations/add`, vacationData);
            assert.fail("Request should have failed with a 401 status");
        } catch (error) {
            assert.strictEqual(error.response?.status, 401);
            assert.strictEqual(error.response?.data.message, "No token found.");
        }
    });

    it("should return 403 if the user is not an admin", async () => {
        const vacationData = {
            destination: "Tel Aviv,Israel",
            description: "Visit tel aviv",
            start_date: "2024-01-01",
            end_date: "2024-01-10",
            price: 1000,
            image: "tel-aviv.jpg"
        };
        const userToken = getToken();
        
        try {
            await axios.post(`${URL}/vacations/add`, vacationData, {
                headers: {
                    Cookie: `accessToken=${userToken}`,
                },
            });
            assert.fail("Request should have failed with a 403 status");
        } catch (error) {
            assert.strictEqual(error.response?.status, 403);
            assert.strictEqual(error.response?.data.message, "Access denied. Admins only.");
        }
    });
});
