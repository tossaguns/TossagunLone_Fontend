// POS Service สำหรับจัดการ API calls ไปยัง backend
class POSService {
  constructor() {
    this.baseURL = 'http://localhost:9999/HotelSleepGun';
  }

  // ดึง token จาก localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // ตรวจสอบ token
  checkAuth() {
    const token = this.getToken();
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }
    return token;
  }

  // ดึงข้อมูล POS รวมทั้งหมด
  async getPOSData() {
    try {
      console.log('🔄 Fetching POS data...');
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/pos/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล POS');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Error fetching POS data:', error);
      throw error;
    }
  }

  // ดึงข้อมูลสถิติ POS
  async getPOSStatistics() {
    try {
      console.log('🔄 Fetching POS statistics...');
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/pos/statistics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ POS');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Error fetching POS statistics:', error);
      throw error;
    }
  }

  // สร้าง POS ใหม่
  async createPOS(posData) {
    try {
      console.log('🚀 Creating POS...');
      console.log('📦 Request data:', posData);
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/pos/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(posData)
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการสร้าง POS');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Error creating POS:', error);
      throw error;
    }
  }

  // อัปเดตข้อมูล POS
  async updatePOS(posData) {
    try {
      console.log('🔄 Updating POS...');
      console.log('📦 Request data:', posData);
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/pos/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(posData)
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการอัปเดต POS');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Error updating POS:', error);
      throw error;
    }
  }

  // อัปเดตสถิติ POS
  async updatePOSStatistics() {
    try {
      console.log('🔄 Updating POS statistics...');
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/pos/statistics`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการอัปเดตสถิติ POS');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Error updating POS statistics:', error);
      throw error;
    }
  }

  // ลบ POS
  async deletePOS() {
    try {
      console.log('🗑️ Deleting POS...');
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/pos/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการลบ POS');
      }

      return result;
    } catch (error) {
      console.error('❌ Error deleting POS:', error);
      throw error;
    }
  }

  // สร้างตึกใหม่
  async createBuilding(buildingData) {
    try {
      console.log('🚀 Creating building...');
      console.log('📦 Request data:', buildingData);
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/building/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buildingData)
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการสร้างตึก');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Error creating building:', error);
      throw error;
    }
  }

  // สร้างห้องใหม่
  async createRoom(roomData) {
    try {
      console.log('🚀 Creating room...');
      console.log('📦 Request data:', roomData);
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/room/create`, {
        method: 'POST',
        body: roomData, // FormData
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการสร้างห้อง');
      }

      return result;
    } catch (error) {
      console.error('❌ Error creating room:', error);
      throw error;
    }
  }

  // สร้างแท็กใหม่
  async createTag(tagData) {
    try {
      console.log('🚀 Creating tag...');
      console.log('📦 Request data:', tagData);
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/tag/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagData)
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการสร้างแท็ก');
      }

      return result;
    } catch (error) {
      console.error('❌ Error creating tag:', error);
      throw error;
    }
  }

  // ลบแท็ก
  async deleteTag(tagId) {
    try {
      console.log('🗑️ Deleting tag...');
      console.log('📦 Tag ID:', tagId);
      
      const token = this.checkAuth();
      const response = await fetch(`${this.baseURL}/tag/delete/${tagId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการลบแท็ก');
      }

      return result;
    } catch (error) {
      console.error('❌ Error deleting tag:', error);
      throw error;
    }
  }
}

// สร้าง instance เดียว
const posService = new POSService();

export default posService; 