<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <Header />
    
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Paket Layanan Hukum
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Pilih paket layanan hukum yang sesuai dengan kebutuhan dan budget Anda
        </p>
        <router-link to="/" class="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
          ← Kembali ke Home
        </router-link>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Range Harga Penanganan Kasus
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan berbagai paket layanan dengan harga yang kompetitif dan transparan
          </p>
        </div>

        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Basic Package -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="p-8">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Konsultasi Dasar</h3>
                <div class="text-4xl font-bold text-blue-600 mb-2">
                  Rp 500.000 - 1.500.000
                </div>
                <p class="text-gray-600">Per konsultasi</p>
              </div>
              
              <ul class="space-y-4 mb-8">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Konsultasi hukum umum
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Review dokumen sederhana
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Surat hukum dasar
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Follow up 1 minggu
                </li>
              </ul>
              
              <button @click="selectPackage('basic')" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                Pilih Paket
              </button>
            </div>
          </div>

          <!-- Standard Package -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-blue-500 relative">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-b-lg text-sm font-semibold">
              Populer
            </div>
            <div class="p-8 pt-12">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Penanganan Kasus Standar</h3>
                <div class="text-4xl font-bold text-blue-600 mb-2">
                  Rp 5.000.000 - 25.000.000
                </div>
                <p class="text-gray-600">Per kasus</p>
              </div>
              
              <ul class="space-y-4 mb-8">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Kasus perdata ringan
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Pembuatan kontrak
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Mediasi dan negosiasi
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Representasi di pengadilan
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Follow up hingga selesai
                </li>
              </ul>
              
              <button @click="selectPackage('standard')" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                Pilih Paket
              </button>
            </div>
          </div>

          <!-- Premium Package -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="p-8">
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Penanganan Kasus Premium</h3>
                <div class="text-4xl font-bold text-blue-600 mb-2">
                  Rp 25.000.000+
                </div>
                <p class="text-gray-600">Per kasus kompleks</p>
              </div>
              
              <ul class="space-y-4 mb-8">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Kasus pidana berat
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Kasus korporat kompleks
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Tim ahli multidisiplin
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Strategi hukum mendalam
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Layanan 24/7 prioritas
                </li>
              </ul>
              
              <button @click="selectPackage('premium')" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                Konsultasi Khusus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Types Section -->
    <section class="py-20 bg-gray-100">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Jenis Kasus yang Kami Tangani
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami memiliki pengalaman dalam berbagai bidang hukum
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Hukum Perdata</h3>
            <p class="text-gray-600 mb-3">Sengketa kontrak, properti, warisan</p>
            <p class="text-blue-600 font-semibold">Rp 5M - 20M</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Hukum Pidana</h3>
            <p class="text-gray-600 mb-3">Kasus pidana umum, korupsi, narkoba</p>
            <p class="text-blue-600 font-semibold">Rp 10M - 50M</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Hukum Bisnis</h3>
            <p class="text-gray-600 mb-3">Korporat, M&A, kepatuhan</p>
            <p class="text-blue-600 font-semibold">Rp 15M - 100M</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Hukum Keluarga</h3>
            <p class="text-gray-600 mb-3">Perceraian, adopsi, hak asuh</p>
            <p class="text-blue-600 font-semibold">Rp 3M - 15M</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-900 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Butuh Konsultasi Khusus?
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Kami siap membantu Anda dengan konsultasi gratis untuk menentukan paket yang sesuai dengan kebutuhan Anda
        </p>
        <div class="space-x-4">
          <router-link to="/register" class="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block">
            Daftar Sekarang
          </router-link>
          <router-link to="/login" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-300 inline-block">
            Login
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
  name: 'PricingPage',
  components: {
    Header,
    Footer
  },
  methods: {
    selectPackage(packageType) {
      // Handle package selection
      const user = localStorage.getItem('user')
      if (!user) {
        // Redirect to login if not authenticated
        this.$router.push('/login?redirect=pricing&package=' + packageType)
      } else {
        // Show confirmation and handle package selection
        alert(`Anda memilih paket ${packageType}. Kami akan menghubungi Anda segera.`)
        // Here you can add API call to handle package selection
      }
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
