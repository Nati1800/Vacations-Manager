const axios = require('axios');
const assert = require('assert');
const dotenv = require('dotenv');
const jwt = require(`jsonwebtoken`);

dotenv.config();

const URL = process.env.URL_TESTING; 

function getToken(role) {
    if (role === "admin") {
      return jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_KEY, { expiresIn: '1h' });
    }else{
      return jwt.sign({ id: 1, role: 'regular' }, process.env.JWT_KEY, { expiresIn: '1h' });
    }
  }
  

describe("DELETE /vacations/delete/:id with JWT token", () => {
    it("should delete a vacation and return success status", async () => {
      const vacationId = 1; 
      const mockTokenAdmin = getToken("admin");
      try {
        const result = await axios.delete(`${URL}/vacations/delete/${vacationId}`, {
          headers: {
            Cookie: `accessToken=${mockTokenAdmin}`, 
          },
        });
  
        assert.strictEqual(result.status, 200); 
        assert.strictEqual(result.data.message, "Vacation deleted successfully"); 
      } catch (error) {
        console.error("Error during DELETE request:", error);
        assert.fail("Failed to delete vacation");
      }
    });
    it("should return 400 for an invalid vacation ID", async () => {
      const invalidVacationId = "abc"; 
      const mockTokenAdmin = getToken("admin");
      try {
        await axios.delete(`${URL}/vacations/delete/${invalidVacationId}`, {
          headers: {
            Cookie: `accessToken=${mockTokenAdmin}`,
          },
        });
        assert.fail("Request should have failed with a 400 status");
      } catch (error) {
        assert.strictEqual(error.response.status, 400);
        assert.strictEqual(error.response.data.message, "Invalid vacation ID");
      }
    });
  
    it("should return 401 if no token is provided", async () => {
      const vacationId = 2;
  
      try {
        await axios.delete(`${URL}/vacations/delete/${vacationId}`);
        assert.fail("Request should have failed with a 401 status");
      } catch (error) {
        assert.strictEqual(error.response.status, 401);
        assert.strictEqual(error.response.data.message, "No token found.");
      }
    });
  
    it("should return 403 if the user is not an admin", async () => {
      const vacationId = 3;
      const userToken = getToken(); 
  
      try {
        await axios.delete(`${URL}/vacations/delete/${vacationId}`, {
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
  
    it("should return 400 if vacation ID is negative", async () => {
      const invalidVacationId = -1;
      const mockTokenAdmin = getToken("admin");
      try {
        await axios.delete(`${URL}/vacations/delete/${invalidVacationId}`, {
          headers: {
            Cookie: `accessToken=${mockTokenAdmin}`,
          },
        });
        assert.fail("Request should have failed with a 400 status");
      } catch (error) {
        assert.strictEqual(error.response.status, 400);
        assert.strictEqual(error.response.data.message, "Invalid vacation ID");
      }
    }); 
    
  });

  