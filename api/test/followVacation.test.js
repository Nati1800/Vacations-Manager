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
describe("POST /vacations/follow", () => {
    it("should return 400 if vacation ID is missing", async () => {
        const mockToken = getToken(); 
        const vacationData = {}; 

        try {
            await axios.post(`${URL}/vacations/follow`, vacationData, {
                headers: {
                    Cookie: `accessToken=${mockToken}`, 
                },
            });
            assert.fail("Request should have failed with a 400 status");
        } catch (error) {
            assert.strictEqual(error.response.status, 400); 
            assert.strictEqual(error.response.data.message, "Vacation ID and user ID are required"); 
        }
    });

    it("should return 400 if no token is provided", async () => {
        const vacationData = {
            vacationId: 1,  
        };

        try {
            await axios.post(`${URL}/vacations/follow`, vacationData);
            assert.fail("Request should have failed with a 400 status");
        } catch (error) {
            assert.strictEqual(error.response.status, 400); 
            assert.strictEqual(error.response.data.message, "Vacation ID and user ID are required"); 
        }
    });

    
});
