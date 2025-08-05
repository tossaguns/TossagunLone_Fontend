// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9999/HotelSleepGun';

class TagService {
  // สร้างแท็กใหม่
  static async createTag(tagData) {
    try {
      console.log('🚀 Sending request to:', `${API_BASE_URL}/tag/create`);
      console.log('📦 Request data:', tagData);

      const response = await fetch(`${API_BASE_URL}/tag/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagData)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      // ตรวจสอบว่า response เป็น JSON หรือไม่
      const contentType = response.headers.get('content-type');
      console.log('📄 Content-Type:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text);
        throw new Error('Server returned non-JSON response. Please check if the server is running.');
      }

      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการสร้างแท็ก');
      }

      return result;
    } catch (error) {
      console.error('❌ Error creating tag:', error);
      
      // ตรวจสอบประเภทของ error
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์กำลังทำงานอยู่');
      }
      
      if (error.message.includes('JSON')) {
        throw new Error('เกิดข้อผิดพลาดในการประมวลผลข้อมูลจากเซิร์ฟเวอร์');
      }
      
      throw error;
    }
  }

  // ดึงข้อมูลแท็กทั้งหมด
  static async getAllTags() {
    try {
      console.log('🔄 Fetching tags from:', `${API_BASE_URL}/tag/getAll`);

      const response = await fetch(`${API_BASE_URL}/tag/getAll`);

      console.log('📡 Response status:', response.status);

      // ตรวจสอบว่า response เป็น JSON หรือไม่
      const contentType = response.headers.get('content-type');
      console.log('📄 Content-Type:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text);
        throw new Error('Server returned non-JSON response. Please check if the server is running.');
      }

      const result = await response.json();
      console.log('✅ Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลแท็ก');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Error fetching tags:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์กำลังทำงานอยู่');
      }
      
      if (error.message.includes('JSON')) {
        throw new Error('เกิดข้อผิดพลาดในการประมวลผลข้อมูลจากเซิร์ฟเวอร์');
      }
      
      throw error;
    }
  }

  // ดึงข้อมูลแท็กตาม ID
  static async getTagById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/tag/get/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลแท็ก');
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching tag by ID:', error);
      throw error;
    }
  }

  // อัปเดตแท็ก
  static async updateTag(id, tagData) {
    try {
      const response = await fetch(`${API_BASE_URL}/tag/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการอัปเดตแท็ก');
      }

      return result;
    } catch (error) {
      console.error('Error updating tag:', error);
      throw error;
    }
  }

  // ลบแท็กตาม ID
  static async deleteTagById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/tag/delete/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการลบแท็ก');
      }

      return result;
    } catch (error) {
      console.error('Error deleting tag:', error);
      throw error;
    }
  }

  // ลบแท็กทั้งหมด
  static async deleteAllTags() {
    try {
      const response = await fetch(`${API_BASE_URL}/tag/deleteAll`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เกิดข้อผิดพลาดในการลบแท็กทั้งหมด');
      }

      return result;
    } catch (error) {
      console.error('Error deleting all tags:', error);
      throw error;
    }
  }
}

export default TagService; 