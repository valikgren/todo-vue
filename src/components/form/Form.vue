<template>
  <ValidationObserver v-slot="{ handleSubmit }" tag="form" ref="form">
    <form
      v-if="!isShowLoginState"
      class="user-form"
      @submit.prevent="handleSubmit(onSubmit)"
      @keypress.enter.prevent
      novalidate
    >
      <p class="user-form_title">
        Add new User
      </p>
      <v-text-field
        class="quick-analyze-bar_input mr-9"
        placeholder="Search..."
        single-line
        prepend-icon="mdi-magnify"
        hide-details
        v-model="name"
      />
      <SubmitButton :is-requested="isRequested || localBusinessInfoRequesting">
         <span class="submit-text" v-if="currentStep < steps">
           {{ $root.translate('step', '_global', 'Step')}}
           {{ currentStep + 1 }}
           <IcoChevronRight />
        </span>
        <span v-else>
          {{ $root.translate('register', '_global', 'Register')}}
        </span>
      </SubmitButton>
    </form>
    <div v-else
         class="register user-layout_section register__success"
    >
      <p class="register-step_text register-step_text__login-text">
        {{ $root.translate('password_sent_to_email', '_global', 'Password sent to email')}}
      </p>
      <a href="https://suite.xovi.net/user/login" target="_blank" class="register_link-btn">
        <SubmitButton>
          {{ $root.translate('login', 'zfcuser', 'Login')}}
        </SubmitButton>
      </a>
    </div>
  </ValidationObserver>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'users-list',
  computed: {
    ...mapState('user', ['userList', 'listLoading']),
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions('user', ['getList']),
    onSubmit() {},
  },
};
</script>
