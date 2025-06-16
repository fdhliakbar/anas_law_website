<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <Header />
    
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Tentang Kami
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Firm hukum terpercaya dengan pengalaman lebih dari 15 tahun melayani klien di berbagai bidang hukum
        </p>
        <router-link to="/" class="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
          ← Kembali ke Home
        </router-link>
      </div>
    </section>

    <!-- About Content -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Mengapa Memilih Kami?
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Kami adalah firma hukum yang berkomitmen memberikan layanan hukum berkualitas tinggi dengan pendekatan personal dan profesional. Tim kami terdiri dari lawyer berpengalaman yang siap membantu menyelesaikan berbagai permasalahan hukum Anda.
            </p>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">Berpengalaman</h3>
                  <p class="text-gray-600">Lebih dari 15 tahun pengalaman dalam berbagai bidang hukum</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">Tim Profesional</h3>
                  <p class="text-gray-600">Lawyer tersertifikasi dan berpengalaman</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">Terpercaya</h3>
                  <p class="text-gray-600">Ratusan klien puas dengan layanan kami</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p class="text-gray-600">Konsultasi dan bantuan kapan saja Anda butuhkan</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src="../assets/images/justice.jpg" alt="About Us" class="rounded-lg shadow-lg w-full h-auto">
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="py-20 bg-gray-100">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Layanan Kami
        </h2>
        <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami menyediakan berbagai layanan hukum untuk memenuhi kebutuhan Anda
        </p>
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Konsultasi Hukum</h3>
            <p class="text-gray-600">Dapatkan advice hukum dari para ahli kami</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Representasi Pengadilan</h3>
            <p class="text-gray-600">Kami siap mewakili Anda di pengadilan</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Drafting Dokumen</h3>
            <p class="text-gray-600">Pembuatan dokumen hukum profesional</p>
          </div>
        </div>
        <router-link to="/pricing" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 inline-block">
          Lihat Paket Harga
        </router-link>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-900 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Siap Berkolaborasi dengan Kami?
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Hubungi kami sekarang untuk konsultasi gratis dan solusi hukum terbaik
        </p>
        <div class="space-x-4">
          <router-link to="/register" class="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block">
            Daftar Sekarang
          </router-link>
          <router-link to="/login" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-300 inline-block">
            Masuk
          </router-link>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'AboutPage',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
