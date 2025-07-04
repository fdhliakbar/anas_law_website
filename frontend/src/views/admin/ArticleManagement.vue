<template>
  <div class="max-w-3xl mx-auto py-10">
    <!-- Back to Dashboard Button -->
    <div class="mb-6">
      <button
        @click="goToDashboard"
        class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Dashboard Admin
      </button>
    </div>

    <!-- Navigation Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">
        {{ isEditMode ? "Edit Artikel" : "Tambah Artikel Baru" }}
      </h2>
      <div class="flex space-x-2">
        <button
          @click="goToArticles"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke Articles
        </button>
        <button
          @click="goToDashboard"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard
        </button>
      </div>
    </div>
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
        <input
          type="file"
          accept="image/*"
          @change="onFileChange"
          :required="!isEditMode"
        />
        <div v-if="imagePreview" class="mt-2">
          <img :src="imagePreview" alt="Preview" class="h-32 rounded shadow" />
        </div>
        <div v-else-if="isEditMode && currentArticle?.gambar" class="mt-2">
          <img
            :src="currentArticle.gambar"
            alt="Current"
            class="h-32 rounded shadow"
          />
          <p class="text-sm text-gray-500 mt-1">
            Gambar saat ini (pilih file baru untuk mengubah)
          </p>
        </div>
      </div>
      <button
        type="submit"
        class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        :disabled="loading"
      >
        {{
          loading
            ? isEditMode
              ? "Memperbarui..."
              : "Menyimpan..."
            : isEditMode
            ? "Perbarui Artikel"
            : "Simpan Artikel"
        }}
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
      isEditMode: false,
      currentArticle: null,
      articleId: null,
    };
  },
  created() {
    // Check if this is edit mode
    if (this.$route.query.mode === "edit" && this.$route.query.id) {
      this.isEditMode = true;
      this.articleId = this.$route.query.id;
      this.loadArticleForEdit();
    }
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

    async loadArticleForEdit() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/article/get-articles?artikel_id=${this.articleId}`
        );

        if (!response.ok) {
          throw new Error("Gagal memuat artikel");
        }

        const data = await response.json();
        this.currentArticle = data.data;

        // Fill form with existing data
        this.form.judul = this.currentArticle.judul;
        this.form.deskripsi = this.currentArticle.deskripsi;
        this.form.link_artikel = this.currentArticle.link_artikel || "";
      } catch (error) {
        console.error("Error loading article:", error);
        this.error = "Gagal memuat artikel untuk diedit";
      }
    },

    async handleSubmit() {
      this.loading = true;
      this.error = "";
      this.success = "";

      try {
        if (this.isEditMode) {
          await this.updateArticle();
        } else {
          await this.createArticle();
        }
      } catch (err) {
        this.error = err.message || "Terjadi kesalahan";
      } finally {
        this.loading = false;
      }
    },

    async createArticle() {
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
      this.resetForm();
    },

    async updateArticle() {
      // For update, we need to handle file upload separately if there's a new image
      let gambarPath = this.currentArticle.gambar;

      if (this.imageFile) {
        // Upload new image
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
          throw new Error(data.message || "Gagal memperbarui artikel");
        }

        // Delete old article and use new one (simple approach)
        await this.deleteOldArticle();
        this.success = "Artikel berhasil diperbarui!";
        this.$router.push("/articles");
      } else {
        // Update without changing image using update endpoint
        const updateData = {
          artikel_id: this.articleId,
          judul: this.form.judul,
          deskripsi: this.form.deskripsi,
          link_artikel: this.form.link_artikel || null,
        };

        const response = await fetch(
          "http://localhost:3000/api/article/update-article",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal memperbarui artikel");
        }

        this.success = "Artikel berhasil diperbarui!";
        setTimeout(() => {
          this.$router.push("/articles");
        }, 1500);
      }
    },

    async deleteOldArticle() {
      try {
        await fetch(
          `http://localhost:3000/api/article/delete-article?artikel_id=${this.articleId}`,
          {
            method: "DELETE",
          }
        );
      } catch (error) {
        console.error("Error deleting old article:", error);
      }
    },

    resetForm() {
      this.form.judul = "";
      this.form.deskripsi = "";
      this.form.link_artikel = "";
      this.imageFile = null;
      this.imagePreview = null;
    },

    goToArticles() {
      this.$router.push("/articles");
    },

    goToDashboard() {
      this.$router.push("/admin/dashboard");
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
