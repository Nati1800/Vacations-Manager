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

describe("PUT /vacations/edit/:id", () => {
    it("should edit a vacation and return success status", async () => {
        const vacationId = 1; 
        const mockTokenAdmin = getToken("admin");
        const updatedVacationData = {
            destination: "New Destination",
            description: "Updated description",
            start_date: "2024-06-01",
            end_date: "2024-06-10",
            price: 1200,
            image: "new-image.jpg"
        };

        try {
            const result = await axios.put(`${URL}/vacations/edit/${vacationId}`, updatedVacationData, {
                headers: {
                    Cookie: `accessToken=${mockTokenAdmin}`, 
                },
            });

            assert.strictEqual(result.status, 200); 
            assert.strictEqual(result.data.message, "Vacation has been edited");
        } catch (error) {
            console.error("Error during PUT request:", error);
            assert.fail("Failed to edit vacation");
        }
    });

    it("should return 400 for missing inputs", async () => {
        const vacationId = 2; 
        const mockTokenAdmin = getToken("admin");
        const incompleteVacationData = {
            destination: "",
            description: "",
            start_date: "",
            end_date: "",
            price: "",
            image: ""
        };

        try {
            await axios.put(`${URL}/vacations/edit/${vacationId}`, incompleteVacationData, {
                headers: {
                    Cookie: `accessToken=${mockTokenAdmin}`,
                },
            });
            assert.fail("Request should have failed with a 400 status");
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.message, "All vacation fields are required");
        }
    });

    it("should return 401 if no token is provided", async () => {
        const vacationId = 3;
        const vacationData = {
            destination: "New Destination",
            description: "Updated description",
            start_date: "2024-06-01",
            end_date: "2024-06-10",
            price: 1200,
            image: "new-image.jpg"
        };

        try {
            await axios.put(`${URL}/vacations/edit/${vacationId}`, vacationData);
            assert.fail("Request should have failed with a 401 status");
        } catch (error) {
            assert.strictEqual(error.response.status, 401);
            assert.strictEqual(error.response.data.message, "No token found.");
        }
    });

    it("should return 403 if the user is not an admin", async () => {
        const vacationId = 4; 
        const userToken = getToken(); 
        const vacationData = {
            destination: "New Destination",
            description: "Updated description",
            start_date: "2024-06-01",
            end_date: "2024-06-10",
            price: 1200,
            image: "new-image.jpg"
        };

        try {
            await axios.put(`${URL}/vacations/edit/${vacationId}`, vacationData, {
                headers: {
                    Cookie: `accessToken=${userToken}`,
                },
            });
            assert.fail("Request should have failed with a 403 status");
        } catch (error) {
            assert.strictEqual(error.response.status, 403);
            assert.strictEqual(error.response.data.message, "Access denied. Admins only.");
        }
    });
});
