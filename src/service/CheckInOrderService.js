import { useAuthStore } from '@/stores/auth';

const API_BASE_URL = 'http://localhost:9999/HotelSleepGun';

export class CheckInOrderService {
  static async createCheckInOrder(checkInData) {
    try {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      }

      console.log('🔄 ส่งข้อมูล Check-in Order:', checkInData);

      const response = await fetch(`${API_BASE_URL}/checkInOrder/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(checkInData)
      });

      const result = await response.json();

      console.log('📥 Response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการสร้าง Check-in Order');
      }

      return result;
    } catch (error) {
      console.error('❌ Error creating check-in order:', error);
      throw error;
    }
  }

  static async getAllCheckInOrders(partnerId, page = 1, limit = 10, status = null) {
    try {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      }

      let url = `${API_BASE_URL}/checkInOrder/partner/${partnerId}?page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล Check-in Orders');
      }

      return result;
    } catch (error) {
      console.error('❌ Error getting check-in orders:', error);
      throw error;
    }
  }

  static async getCheckInOrderById(id) {
    try {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      }

      const response = await fetch(`${API_BASE_URL}/checkInOrder/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล Check-in Order');
      }

      return result;
    } catch (error) {
      console.error('❌ Error getting check-in order by ID:', error);
      throw error;
    }
  }

  static async getCheckInOrderByOrderId(checkInOrderId, partnerId = null) {
    try {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      }

      let url = `${API_BASE_URL}/checkInOrder/order/${checkInOrderId}`;
      if (partnerId) {
        url += `?partnerId=${partnerId}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล Check-in Order');
      }

      return result;
    } catch (error) {
      console.error('❌ Error getting check-in order by order ID:', error);
      throw error;
    }
  }

  static async updateCheckInOrder(id, updateData) {
    try {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      }

      const response = await fetch(`${API_BASE_URL}/checkInOrder/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการอัปเดต Check-in Order');
      }

      return result;
    } catch (error) {
      console.error('❌ Error updating check-in order:', error);
      throw error;
    }
  }

  static async deleteCheckInOrder(id) {
    try {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      }

      const response = await fetch(`${API_BASE_URL}/checkInOrder/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการลบ Check-in Order');
      }

      return result;
    } catch (error) {
      console.error('❌ Error deleting check-in order:', error);
      throw error;
    }
  }

  static async getCheckInOrderStats(partnerId, startDate = null, endDate = null) {
    try {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      }

      let url = `${API_BASE_URL}/checkInOrder/stats/${partnerId}`;
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงสถิติ Check-in Orders');
      }

      return result;
    } catch (error) {
      console.error('❌ Error getting check-in order stats:', error);
      throw error;
    }
  }

  // ฟังก์ชันดึงข้อมูล aboutHotel ตาม partnerId
  static async getAboutHotelByPartnerId(partnerId) {
    try {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      }

      const response = await fetch(`${API_BASE_URL}/pos/about-hotel`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล About Hotel');
      }

      return result;
    } catch (error) {
      console.error('❌ Error getting about hotel:', error);
      throw error;
    }
  }
} 