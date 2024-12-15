const axios = require('axios');
const assert = require('assert');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const URL = process.env.URL_TESTING; 

function getToken(role) {
  if (role === 'admin') {
    return jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_KEY, { expiresIn: '1h' });
  } else {
    return jwt.sign({ id: 1, role: 'regular' }, process.env.JWT_KEY, { expiresIn: '1h' });
  }
}

describe('GET /vacations', () => {
  it('should retrieve all vacations', async () => {
    const mockToken = getToken();
    try {
      const result = await axios.get(`${URL}/vacations`, {
        headers: { Cookie: `accessToken=${mockToken}` },
      });

      assert.strictEqual(result.status, 200);
      assert.ok(result.data.length > 0, 'Vacations should be returned');
    } catch (error) {
      console.error('Error during GET request:', error);
      assert.fail('Failed to retrieve vacations');
    }
  });

  it('should filter by followed vacations', async () => {
    const mockToken = getToken();
    const filters = { followed: true };

    try {
      const result = await axios.get(`${URL}/vacations`, {
        headers: { Cookie: `accessToken=${mockToken}` },
        params: filters,
      });

      assert.strictEqual(result.status, 200);
      assert.ok(result.data.every(vacation => vacation.isLiked), 'All vacations should be followed by the user');
    } catch (error) {
      console.error('Error during GET request:', error);
      assert.fail('Failed to retrieve followed vacations');
    }
  });

  it('should filter by new vacations', async () => {
    const mockToken = getToken();
    const filters = { new: true };

    try {
      const result = await axios.get(`${URL}/vacations`, {
        headers: { Cookie: `accessToken=${mockToken}` },
        params: filters,
      });

      assert.strictEqual(result.status, 200);
      assert.ok(result.data.every(vacation => new Date(vacation.start_date) > new Date()), 'All vacations should have a future start date');
    } catch (error) {
      console.error('Error during GET request:', error);
      assert.fail('Failed to retrieve new vacations');
    }
  });

  it('should filter by active vacations', async () => {
    const mockToken = getToken();
    const filters = { active: true };

    try {
      const result = await axios.get(`${URL}/vacations`, {
        headers: { Cookie: `accessToken=${mockToken}` },
        params: filters,
      });

      assert.strictEqual(result.status, 200);
      assert.ok(result.data.every(vacation => 
        new Date(vacation.start_date) <= new Date() && new Date(vacation.end_date) >= new Date()
      ), 'All vacations should be active');
    } catch (error) {
      console.error('Error during GET request:', error);
      assert.fail('Failed to retrieve active vacations');
    }
  });

//   it('should return 401 if no token is provided', async () => {
//     try {
//       await axios.get(`${URL}/vacations`);
//       assert.fail('Request should have failed with a 401 status');
//     } catch (error) {
//       assert.strictEqual(error.response?.status, 401,'Status should be 401 for no token');
//       assert.strictEqual(error.response?.data.message,'Invalid or expired token', 'Error message should match');
//     }
//   });

});
