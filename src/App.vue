<template>
  <div class="relative flex flex-col h-screen bg-slate-900 font-sans overflow-hidden">
    
    <!-- Hiệu ứng Particles chạy ngầm -->
    <vue-particles
      id="tsparticles"
      class="absolute inset-0 z-0"
      :options="particleOptions"
    />

    <!-- Toàn bộ nội dung đè lên trên (z-10) -->
    <div class="z-10 flex flex-col h-full w-full max-w-2xl mx-auto">
      <!-- Header Gradient -->
      <header class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg sticky top-0 flex justify-between items-center z-20 rounded-b-2xl border-b border-indigo-400/30">
        <h1 class="text-xl font-extrabold tracking-tight drop-shadow-md">ODK Collect Pro</h1>
        <span 
          :class="isOnline ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/50' : 'bg-rose-400/20 text-rose-300 border-rose-400/50'" 
          class="text-xs px-3 py-1 rounded-full font-bold border backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-colors duration-500"
        >
          {{ isOnline ? '● Online' : '○ Offline' }}
        </span>
      </header>

      <!-- Main Body -->
      <main class="flex-1 overflow-y-auto p-4 scroll-smooth pb-24">
        <!-- Bọc Form bằng Glassmorphism -->
        <div class="bg-white/85 backdrop-blur-xl p-1 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
          <SurveyForm @saved="loadDrafts" />
        </div>

        <div class="mt-8">
          <h3 class="font-bold text-white/90 mb-4 flex items-center justify-between text-lg drop-shadow-sm">
            <span>Dữ liệu đã thu thập ({{ drafts.length }})</span>
          </h3>
          
          <div v-if="drafts.length === 0" class="text-center text-slate-400/80 text-sm py-8 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-md">
            Chưa có dữ liệu nào
          </div>
          
          <!-- Animation List trượt mượt mà -->
          <div v-else class="space-y-4">
            <TransitionGroup name="list" tag="div" class="space-y-4">
              <div v-for="item in drafts" :key="item.id" 
                class="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/40 shadow-lg flex items-start gap-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white"
              >
                <img v-if="item.photoBase64" :src="item.photoBase64" class="w-16 h-16 rounded-lg object-cover border-2 border-indigo-100 shadow-sm" />
                <div v-else class="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                  <span class="text-2xl">📷</span>
                </div>
                
                <div class="flex-1">
                  <h4 class="font-bold text-slate-800">{{ item.title }}</h4>
                  <!-- THÊM ĐOẠN NÀY ĐỂ HIỂN THỊ PHÂN LOẠI VÀ TÌNH TRẠNG -->
                  <div class="flex gap-2 mt-1">
                    <span class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                      {{ item.category }}
                    </span>
                    <span :class="item.condition === 'Kém' ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100'" class="text-[10px] font-bold px-1.5 py-0.5 rounded border">
                      {{ item.condition }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1.5 line-clamp-1 italic" v-if="item.description">"{{ item.description }}"</p>
                  <!-- KẾT THÚC ĐOẠN THÊM -->
                  <p class="text-xs text-slate-500 mt-1">🕒 {{ new Date(item.createdAt).toLocaleString('vi-VN') }}</p>
                  <span 
                    :class="item.status === 'draft' ? 'text-amber-700 bg-amber-100 border-amber-200' : 'text-emerald-700 bg-emerald-100 border-emerald-200'" 
                    class="text-[10px] px-2 py-0.5 rounded-md mt-2 inline-block border font-semibold uppercase tracking-wider"
                  >
                    {{ item.status === 'draft' ? 'Chờ đồng bộ' : 'Đã gửi' }}
                  </span>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SurveyForm from './components/SurveyForm.vue';
import { db, type SurveyRecord } from './db/database';

const isOnline = ref(navigator.onLine);
const drafts = ref<SurveyRecord[]>([]);

window.addEventListener('online', () => isOnline.value = true);
window.addEventListener('offline', () => isOnline.value = false);

const loadDrafts = async () => {
  drafts.value = await db.surveys.orderBy('id').reverse().toArray();
};

onMounted(() => {
  loadDrafts();
});

// Cấu hình Particles: Hạt phân tử kết nối (Tech/Data vibe)
const particleOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: "#6366f1" }, // Màu Indigo mờ
    links: {
      color: "#6366f1",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5, // Chuyển động chậm, sang trọng
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "bounce" },
    },
    number: { density: { enable: true, area: 800 }, value: 40 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};
</script>

<style>
/* Hiệu ứng khi thêm item mới vào danh sách */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>