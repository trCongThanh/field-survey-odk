<template>
  <div class="bg-white p-5 rounded-[14px]">
    <h2 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-5">
      Mẫu Khảo Sát Mới
    </h2>

    <form @submit.prevent="saveSurvey" class="space-y-5">
      
      <!-- 1. Tên khu vực (Text) -->
      <div class="group">
        <label class="block text-sm font-bold text-slate-700 mb-1.5 transition-colors group-focus-within:text-indigo-600">
          Tên khu vực / Đối tượng
        </label>
        <input 
          v-model="formData.title" required type="text" 
          class="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-800 transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none hover:border-indigo-300 bg-slate-50 focus:bg-white" 
          placeholder="Nhập tên đối tượng khảo sát..." 
        />
      </div>

      <!-- 2. Loại hình (Select Dropdown) -->
      <div class="group">
        <label class="block text-sm font-bold text-slate-700 mb-1.5 transition-colors group-focus-within:text-indigo-600">
          Loại hình
        </label>
        <div class="relative">
          <select v-model="formData.category" class="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-800 transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none hover:border-indigo-300 bg-slate-50 focus:bg-white appearance-none cursor-pointer">
            <option value="Cơ sở hạ tầng">🏗️ Cơ sở hạ tầng</option>
            <option value="Môi trường">🌳 Môi trường</option>
            <option value="Dân cư">👥 Dân cư</option>
            <option value="Sự cố">⚠️ Sự cố khẩn cấp</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            ▼
          </div>
        </div>
      </div>

      <!-- 3. Tình trạng (Radio Buttons phong cách Tag) -->
      <div>
        <label class="block text-sm font-bold text-slate-700 mb-2">Tình trạng đánh giá</label>
        <div class="grid grid-cols-3 gap-3">
          <label v-for="option in ['Tốt', 'Khá', 'Kém']" :key="option" class="cursor-pointer relative">
            <input type="radio" v-model="formData.condition" :value="option" class="peer sr-only" />
            <div class="text-center px-2 py-2.5 rounded-lg border-2 border-slate-200 text-slate-600 font-semibold transition-all peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:bg-slate-50">
              {{ option }}
            </div>
          </label>
        </div>
      </div>

      <!-- 4. Ghi chú (Textarea) -->
      <div class="group">
        <label class="block text-sm font-bold text-slate-700 mb-1.5 transition-colors group-focus-within:text-indigo-600">
          Ghi chú hiện trạng
        </label>
        <textarea 
          v-model="formData.description" rows="2" 
          class="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-800 transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none hover:border-indigo-300 bg-slate-50 focus:bg-white resize-none" 
          placeholder="Mô tả chi tiết vấn đề..."></textarea>
      </div>

      <!-- 5. Tọa độ GPS -->
      <div class="bg-indigo-50/50 p-4 rounded-xl border-2 border-indigo-100 transition-all hover:bg-indigo-50">
        <label class="block text-sm font-bold text-indigo-900 mb-2">Vị trí hiện trường</label>
        <button type="button" @click="getLocation" :class="isLocating ? 'animate-pulse bg-indigo-200 text-indigo-700' : 'bg-white text-indigo-600 hover:bg-indigo-500 hover:text-white hover:shadow-md hover:shadow-indigo-500/30'" class="w-full font-bold py-2.5 rounded-lg border-2 border-indigo-200 flex items-center justify-center gap-2 transition-all duration-300">
          <span class="text-lg">📍</span> 
          {{ isLocating ? 'Đang quét vệ tinh...' : 'Lấy tọa độ GPS' }}
        </button>
        <div v-if="formData.latitude" class="flex justify-between items-center mt-3 bg-white px-3 py-2 rounded-lg border border-indigo-100 shadow-sm">
          <span class="text-xs font-semibold text-slate-500">Tọa độ:</span>
          <span class="text-sm text-indigo-700 font-mono font-bold">{{ formData.latitude.toFixed(5) }}, {{ formData.longitude?.toFixed(5) }}</span>
        </div>
      </div>

      <!-- 6. Camera -->
      <div>
        <label class="block text-sm font-bold text-slate-700 mb-1.5">Ảnh hiện trường</label>
        <div class="relative overflow-hidden">
          <input type="file" accept="image/*" capture="environment" @change="handlePhotoUpload" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-blue-50 file:to-indigo-50 file:text-indigo-700 hover:file:shadow-md hover:file:from-blue-100 hover:file:to-indigo-100 transition-all file:cursor-pointer" />
        </div>
        <transition name="pop">
          <img v-if="formData.photoBase64" :src="formData.photoBase64" class="mt-4 rounded-xl w-full h-56 object-cover border-4 border-white shadow-lg" />
        </transition>
      </div>

      <!-- Nút Lưu -->
      <button type="submit" class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-extrabold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transform transition-all hover:-translate-y-1 active:translate-y-0 mt-6">
        LƯU DỮ LIỆU
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { db, type SurveyRecord } from '../db/database';

const formData = ref<Partial<SurveyRecord>>({
  title: '',
  category: 'Cơ sở hạ tầng', // Giá trị mặc định cho Dropdown
  condition: 'Tốt',         // Giá trị mặc định cho Radio
  description: '',
  latitude: null,
  longitude: null,
  photoBase64: null,
});

const isLocating = ref(false);

const getLocation = () => {
  isLocating.value = true;
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        formData.value.latitude = position.coords.latitude;
        formData.value.longitude = position.coords.longitude;
        isLocating.value = false;
      },
      () => {
        alert('Không thể lấy vị trí. Vui lòng cấp quyền GPS.');
        isLocating.value = false;
      }
    );
  } else {
    alert('Trình duyệt không hỗ trợ GPS');
    isLocating.value = false;
  }
};

const handlePhotoUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      formData.value.photoBase64 = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const emit = defineEmits(['saved']);

const saveSurvey = async () => {
  try {
    const newRecord: SurveyRecord = {
      title: formData.value.title || '',
      category: formData.value.category || 'Khác',
      condition: formData.value.condition || 'Chưa rõ',
      description: formData.value.description || '',
      latitude: formData.value.latitude || null,
      longitude: formData.value.longitude || null,
      photoBase64: formData.value.photoBase64 || null,
      status: navigator.onLine ? 'synced' : 'draft',
      createdAt: new Date().toISOString()
    };

    await db.surveys.add(newRecord);
    alert(`Đã lưu thành công! Trạng thái: ${newRecord.status === 'draft' ? 'Lưu nháp (Offline)' : 'Đã đồng bộ'}`);
    
    // Reset form
    formData.value = { title: '', category: 'Cơ sở hạ tầng', condition: 'Tốt', description: '', latitude: null, longitude: null, photoBase64: null };
    emit('saved');
  } catch (error) {
    console.error('Lỗi khi lưu:', error);
    alert('Có lỗi xảy ra khi lưu dữ liệu.');
  }
};
</script>

<style scoped>
.pop-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
</style>