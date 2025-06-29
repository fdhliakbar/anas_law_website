<template>
  <div class="max-w-3xl mx-auto py-10">
    <h2 class="text-2xl font-bold mb-6">Tambah Artikel Baru</h2>
    <form
      @submit.prevent="handleSubmit"
      enctype="multipart/form-data"
      class="space-y-6 bg-white p-6 rounded shadow"
    >
      <div>
        <label class="block mb-1 font-medium">Judul</label>
        <input
          v-model="form.judul"
          type="text"
          class="w-full border px-3 py-2 rounded"
          required
          maxlength="50"
        />
      </div>
      <div>
        <label class="block mb-1 font-medium">Deskripsi</label>
        <textarea
          v-model="form.deskripsi"
          class="w-full border px-3 py-2 rounded"
          required
          rows="4"
        ></textarea>
      </div>
      <div>
        <label class="block mb-1 font-medium">Link Artikel</label>
        <input
          v-model="form.link_artikel"
          type="url"
          class="w-full border px-3 py-2 rounded"
          placeholder="https://example.com/artikel"
        />
        <small class="text-gray-500"
          >Link eksternal ke artikel (opsional)</small
        >
      </div>
      <div>
        <label class="block mb-1 font-medium">Gambar</label>
        <input type="file" accept="image/*" @change="onFileChange" required />
        <div v-if="imagePreview" class="mt-2">
          <img :src="imagePreview" alt="Preview" class="h-32 rounded shadow" />
        </div>
      </div>
      <button
        type="submit"
        class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        :disabled="loading"
      >
        {{ loading ? "Menyimpan..." : "Simpan Artikel" }}
      </button>
      <div v-if="error" class="text-red-600 mt-2">{{ error }}</div>
      <div v-if="success" class="text-green-600 mt-2">{{ success }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ArticleManagement",
  data() {
    return {
      form: {
        judul: "",
        deskripsi: "",
        link_artikel: "",
      },
      imageFile: null,
      imagePreview: null,
      loading: false,
      error: "",
      success: "",
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.imageFile = file;
      if (file) {
        this.imagePreview = URL.createObjectURL(file);
      } else {
        this.imagePreview = null;
      }
    },
    async handleSubmit() {
      this.loading = true;
      this.error = "";
      this.success = "";
      try {
        const formData = new FormData();
        formData.append("judul", this.form.judul);
        formData.append("deskripsi", this.form.deskripsi);
        formData.append("link_artikel", this.form.link_artikel);
        formData.append("gambar", this.imageFile);

        const response = await fetch(
          "http://localhost:3000/api/article/post-article",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal menyimpan artikel");
        }

        this.success = "Artikel berhasil disimpan!";
        this.form.judul = "";
        this.form.deskripsi = "";
        this.form.link_artikel = "";
        this.imageFile = null;
        this.imagePreview = null;
      } catch (err) {
        this.error = err.message || "Terjadi kesalahan saat menyimpan artikel";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  border: 1px solid #d1d5db;
  padding: 6px;
  border-radius: 4px;
}
</style>
