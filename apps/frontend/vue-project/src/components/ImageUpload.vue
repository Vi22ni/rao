<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [File, null] as unknown as () => File | null,
    default: null
  }
});

const fileInput = ref<HTMLInputElement | null>(null);
const errorMessage = ref<string>('');
const previewUrl = ref<string>('');

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    errorMessage.value = 'Apenas arquivos JPG ou PNG são permitidos';
    return;
  }

  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    errorMessage.value = 'O arquivo deve ter no máximo 2MB';
    return;
  }

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
  previewUrl.value = URL.createObjectURL(file);

  errorMessage.value = '';
  console.log("🚀 ~ handleFileChange ~ file:", file)
  emit('update:modelValue', file);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});
</script>

<template>
  <div class="imageUploadContainer">
    <input ref="fileInput" type="file" accept=".jpg,.jpeg,.png" @change="handleFileChange" hidden />

    <div v-if="!previewUrl" class="imageUploadBox" @click="triggerFileInput">
      <div class="placeholder">
        <span>Adicione uma imagem</span>
      </div>
    </div>

    <div v-else class="imageUploadBox-preview" @click="triggerFileInput" :style="{
      background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 100%), url(${previewUrl}) lightgray 50% / cover no-repeat`
    }"></div>

    <div v-if="errorMessage" class="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.imageUploadContainer {
  width: fit-content;
}

.imageUploadBox,
.imageUploadBox-preview {
  display: flex;
  width: 200px;
  height: 200px;
  padding: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  border-radius: 5px;
  border: 2px solid rgba(60, 60, 60, 0.15);
  background: rgba(183, 183, 183, 0.80);
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.30);
  background-position: center;
  background-size: cover;
}

.imageUploadBox-preview {
  border: none;
}

.imageUploadBox:hover {
  border-color: #888;
  background: rgba(183, 183, 183, 0.90);
}

.placeholder {
  color: rgba(60, 60, 60, 0.90);
  font-size: 16px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}

.preview {
  width: 100%;
  height: 100%;
}

.preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.errorMessage {
  color: #dc3545;
  font-size: 14px;
  text-align: center;
}

@media(min-width: 800px) {

  .imageUploadContainer {
    width: 33%;
  }

  .imageUploadBox,
  .imageUploadBox-preview {
    width: 100%;
  }
}
@media(min-width: 1000px) {

  .imageUploadBox,
  .imageUploadBox-preview {
    height: 250px;
  }
}
</style>