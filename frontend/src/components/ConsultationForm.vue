<template>
  <div class="consultation-form bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto">
    <!-- Progress Bar -->
    <div class="bg-gradient-to-r from-indigo-600 to-blue-500 p-1">
      <div class="flex justify-between px-4 py-3">
        <h2 class="text-xl font-bold text-white">Legal Consultation Request</h2>
        <div class="flex space-x-3">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500"
              :class="[
                currentStep > index 
                  ? 'bg-green-500 text-white' 
                  : currentStep === index 
                    ? 'bg-white text-indigo-700' 
                    : 'bg-indigo-400 text-white'
              ]"
            >
              <span v-if="currentStep > index">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div v-if="index < steps.length - 1" class="w-10 h-1 mx-1" :class="currentStep > index ? 'bg-green-500' : 'bg-indigo-400'"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <div class="p-6 md:p-8">
      <!-- Step 1: Personal Information -->
      <transition
        enter-active-class="transition-all duration-500 ease-in-out transform"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-500 ease-in-out transform"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-full"
      >
        <div v-if="currentStep === 0" key="step1" class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-800">Personal Information</h3>
          <p class="text-gray-600">Please provide your contact details so we can get back to you.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input 
                  id="fullName" 
                  v-model="formData.fullName" 
                  type="text" 
                  class="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                  :class="{'border-red-500': errors.fullName}"
                  placeholder="John Doe"
                />
              </div>
              <p v-if="errors.fullName" class="text-red-500 text-xs mt-1 animate-pulse">{{ errors.fullName }}</p>
            </div>
            
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input 
                  id="email" 
                  v-model="formData.email" 
                  type="email"
                  class="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                  :class="{'border-red-500': errors.email}"
                  placeholder="john@example.com"
                />
              </div>
              <p v-if="errors.email" class="text-red-500 text-xs mt-1 animate-pulse">{{ errors.email }}</p>
            </div>
            
            <div class="space-y-2">
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <input 
                  id="phone" 
                  v-model="formData.phone" 
                  type="tel" 
                  class="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                  :class="{'border-red-500': errors.phone}"
                  placeholder="+62 812 3456 7890"
                />
              </div>
              <p v-if="errors.phone" class="text-red-500 text-xs mt-1 animate-pulse">{{ errors.phone }}</p>
            </div>
            
            <div class="space-y-2">
              <label for="preferredContact" class="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
              <select 
                id="preferredContact" 
                v-model="formData.preferredContact" 
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
          </div>
        </div>
      </transition>

      <!-- Step 2: Case Information -->
      <transition
        enter-active-class="transition-all duration-500 ease-in-out transform"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-500 ease-in-out transform"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-full"
      >
        <div v-if="currentStep === 1" key="step2" class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-800">Case Information</h3>
          <p class="text-gray-600">Tell us about your legal matter so we can assist you better.</p>
          
          <div class="space-y-6">
            <div class="space-y-2">
              <label for="caseType" class="block text-sm font-medium text-gray-700">Type of Legal Matter</label>
              <select 
                id="caseType" 
                v-model="formData.caseType" 
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                :class="{'border-red-500': errors.caseType}"
              >
                <option value="" disabled selected>Select Case Type</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Property Law">Property Law</option>
                <option value="Tax Law">Tax Law</option>
                <option value="Labor Law">Labor Law</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="Other">Other</option>
              </select>
              <p v-if="errors.caseType" class="text-red-500 text-xs mt-1 animate-pulse">{{ errors.caseType }}</p>
            </div>
            
            <div v-if="formData.caseType === 'Other'" class="space-y-2">
              <label for="otherCaseType" class="block text-sm font-medium text-gray-700">Please Specify</label>
              <input 
                id="otherCaseType" 
                v-model="formData.otherCaseType" 
                type="text" 
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="Specify your legal matter"
              />
            </div>
            
            <div class="space-y-2">
              <label for="caseDescription" class="block text-sm font-medium text-gray-700">Brief Description</label>
              <textarea 
                id="caseDescription" 
                v-model="formData.caseDescription" 
                rows="4" 
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                :class="{'border-red-500': errors.caseDescription}"
                placeholder="Please provide details about your legal issue..."
              ></textarea>
              <p v-if="errors.caseDescription" class="text-red-500 text-xs mt-1 animate-pulse">{{ errors.caseDescription }}</p>
              <p class="text-xs text-gray-500 mt-1">
                {{ 1000 - formData.caseDescription.length }} characters remaining
              </p>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Urgency Level</label>
              <div class="flex items-center space-x-4">
                <label class="inline-flex items-center">
                  <input type="radio" v-model="formData.urgency" value="Low" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                  <span class="ml-2 text-sm text-gray-700">Low</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="formData.urgency" value="Medium" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                  <span class="ml-2 text-sm text-gray-700">Medium</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="formData.urgency" value="High" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                  <span class="ml-2 text-sm text-gray-700">High</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Step 3: Additional Information -->
      <transition
        enter-active-class="transition-all duration-500 ease-in-out transform"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-500 ease-in-out transform"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-full"
      >
        <div v-if="currentStep === 2" key="step3" class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-800">Additional Information</h3>
          <p class="text-gray-600">Help us schedule your consultation.</p>
          
          <div class="space-y-6">
            <div class="space-y-2">
              <label for="preferredDate" class="block text-sm font-medium text-gray-700">Preferred Consultation Date</label>
              <input 
                id="preferredDate" 
                v-model="formData.preferredDate" 
                type="date" 
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
                :min="minDate"
              />
            </div>
            
            <div class="space-y-2">
              <label for="preferredTime" class="block text-sm font-medium text-gray-700">Preferred Time</label>
              <select 
                id="preferredTime" 
                v-model="formData.preferredTime" 
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3"
              >
                <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                <option value="Afternoon (1PM - 5PM)">Afternoon (1PM - 5PM)</option>
                <option value="Evening (6PM - 8PM)">Evening (6PM - 8PM)</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <label for="consultationType" class="block text-sm font-medium text-gray-700">Consultation Type</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  v-for="type in consultationTypes" 
                  :key="type.value"
                  @click="selectConsultationType(type.value)"
                  class="relative rounded-lg border-2 p-4 flex flex-col items-center cursor-pointer transition-all duration-200 hover:bg-indigo-50"
                  :class="formData.consultationType === type.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'"
                >
                  <div 
                    class="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    :class="formData.consultationType === type.value ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'"
                  >
                    <!-- In-person icon -->
                    <svg v-if="type.value === 'in-person'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    
                    <!-- Video call icon -->
                    <svg v-else-if="type.value === 'video-call'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    
                    <!-- Phone call icon -->
                    <svg v-else-if="type.value === 'phone-call'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div class="text-sm font-medium text-center" :class="formData.consultationType === type.value ? 'text-indigo-700' : 'text-gray-900'">
                    {{ type.label }}
                  </div>
                  <div v-if="formData.consultationType === type.value" class="absolute -top-2 -right-2 h-6 w-6 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="formData.agreeToTerms" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                <span class="ml-2 text-sm text-gray-700">
                  I agree to the 
                  <a href="#" class="text-indigo-600 hover:text-indigo-500">terms of service</a> 
                  and 
                  <a href="#" class="text-indigo-600 hover:text-indigo-500">privacy policy</a>
                </span>
              </label>
              <p v-if="errors.agreeToTerms" class="text-red-500 text-xs mt-1 animate-pulse">{{ errors.agreeToTerms }}</p>
            </div>
          </div>
        </div>
      </transition>

      <!-- Step 4: Confirmation -->
      <transition
        enter-active-class="transition-all duration-500 ease-in-out transform"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-500 ease-in-out transform"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-full"
      >
        <div v-if="currentStep === 3" key="step4" class="space-y-6">
          <div class="text-center space-y-4">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800">Thank You!</h3>
            <p class="text-gray-600">
              Your consultation request has been submitted successfully. Our team will review your information and get back to you soon.
            </p>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-6 space-y-4">
            <h4 class="font-medium text-gray-700">Request Summary</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-500">Name</p>
                <p class="font-medium">{{ formData.fullName }}</p>
              </div>
              <div>
                <p class="text-gray-500">Email</p>
                <p class="font-medium">{{ formData.email }}</p>
              </div>
              <div>
                <p class="text-gray-500">Phone</p>
                <p class="font-medium">{{ formData.phone }}</p>
              </div>
              <div>
                <p class="text-gray-500">Case Type</p>
                <p class="font-medium">{{ formData.caseType === 'Other' ? formData.otherCaseType : formData.caseType }}</p>
              </div>
              <div>
                <p class="text-gray-500">Urgency</p>
                <p class="font-medium">{{ formData.urgency }}</p>
              </div>
              <div>
                <p class="text-gray-500">Preferred Date & Time</p>
                <p class="font-medium">{{ formatDate(formData.preferredDate) }} ({{ formData.preferredTime }})</p>
              </div>
              <div class="md:col-span-2">
                <p class="text-gray-500">Consultation Type</p>
                <p class="font-medium">{{ getConsultationTypeLabel(formData.consultationType) }}</p>
              </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200">
              <p class="text-gray-500 text-sm">Reference ID</p>
              <p class="font-medium">{{ referenceId }}</p>
            </div>
          </div>
          
          <div class="text-center space-y-4">
            <p class="text-sm text-gray-600">
              We've sent a confirmation email to <span class="font-medium">{{ formData.email }}</span> with all the details.
            </p>
            <button 
              @click="resetForm" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </transition>

      <!-- Form Navigation -->
      <div v-if="currentStep < 3" class="mt-8 flex justify-between">
        <button 
          v-if="currentStep > 0" 
          @click="prevStep" 
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Previous
        </button>
        <div v-else class="w-20"></div>
        
        <button 
          @click="nextStep" 
          class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <span v-if="currentStep < 2">Next</span>
          <span v-else>Submit</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 -mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultationForm',
  data() {
    return {
      steps: [
        'Personal Information',
        'Case Information',
        'Additional Information',
        'Confirmation'
      ],
      currentStep: 0,
      errors: {},
      formData: {
        // Step 1: Personal Information
        fullName: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        
        // Step 2: Case Information
        caseType: '',
        otherCaseType: '',
        caseDescription: '',
        urgency: 'Medium',
        
        // Step 3: Additional Information
        preferredDate: '',
        preferredTime: 'Morning (9AM - 12PM)',
        consultationType: 'in-person',
        agreeToTerms: false
      },
      consultationTypes: [
        { value: 'in-person', label: 'In-Person' },
        { value: 'video-call', label: 'Video Call' },
        { value: 'phone-call', label: 'Phone Call' }
      ],
      referenceId: 'CONS-' + Math.floor(100000 + Math.random() * 900000)
    };
  },
  computed: {
    minDate() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
  },
  methods: {
    validateStep(step) {
      this.errors = {};
      let isValid = true;
      
      if (step === 0) {
        // Validate personal information
        if (!this.formData.fullName.trim()) {
          this.errors.fullName = 'Full name is required';
          isValid = false;
        }
        
        if (!this.formData.email.trim()) {
          this.errors.email = 'Email is required';
          isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(this.formData.email)) {
          this.errors.email = 'Please enter a valid email address';
          isValid = false;
        }
        
        if (!this.formData.phone.trim()) {
          this.errors.phone = 'Phone number is required';
          isValid = false;
        }
      } else if (step === 1) {
        // Validate case information
        if (!this.formData.caseType) {
          this.errors.caseType = 'Please select a case type';
          isValid = false;
        }
        
        if (this.formData.caseDescription.trim().length < 20) {
          this.errors.caseDescription = 'Please provide more details (at least 20 characters)';
          isValid = false;
        }
      } else if (step === 2) {
        // Validate additional information
        if (!this.formData.agreeToTerms) {
          this.errors.agreeToTerms = 'You must agree to the terms and conditions';
          isValid = false;
        }
      }
      
      return isValid;
    },
    
    nextStep() {
      if (this.validateStep(this.currentStep)) {
        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++;
        }
        
        if (this.currentStep === 3) {
          // Submit the form
          this.submitForm();
        }
      }
    },
    
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    
    submitForm() {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', this.formData);
      
      // The confirmation step will be shown automatically since we increment currentStep
    },
    
    resetForm() {
      this.formData = {
        fullName: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        caseType: '',
        otherCaseType: '',
        caseDescription: '',
        urgency: 'Medium',
        preferredDate: '',
        preferredTime: 'Morning (9AM - 12PM)',
        consultationType: 'in-person',
        agreeToTerms: false
      };
      this.currentStep = 0;
      this.errors = {};
      this.referenceId = 'CONS-' + Math.floor(100000 + Math.random() * 900000);
    },
    
    selectConsultationType(type) {
      this.formData.consultationType = type;
    },
    
    getConsultationTypeLabel(value) {
      const type = this.consultationTypes.find(t => t.value === value);
      return type ? type.label : '';
    },
    
    formatDate(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    }
  }
};
</script>

<style scoped>
.consultation-form {
  position: relative;
  overflow: hidden;
}

/* Custom animations for form transitions */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>