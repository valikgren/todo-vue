<template>
  <v-dialog
    :value="value"
    @input="onInput"
    width="600"
    max-width="90%"
    content-class="user-editing"
  >
    <v-card>
      <ValidationObserver v-slot="{ handleSubmit }" tag="form" ref="form">
        <form
          @submit.prevent="handleSubmit(onSubmit)"
          @keypress.enter.prevent
          novalidate
          class="pa-10"
        >
          <h1 class="user-form_title text-center">
            {{ editMode ? 'Edit User' : 'Add new User' }}
          </h1>

          <ValidationProvider mode="eager"
                              rules="required"
                              name="username"
                              tag="div"
                              class="mb-6"
                              v-slot="{ errors }"
          >
              <v-text-field
                hide-details="auto"
                label="Name"
                v-model="username"
                :error-messages="errors"
              />
          </ValidationProvider>

          <ValidationProvider mode="eager"
                              rules="required|email"
                              name="email"
                              tag="div"
                              class="mb-6"
                              v-slot="{ errors }"
          >
            <v-text-field
              hide-details="auto"
              label="Email"
              v-model="email"
              :error-messages="errors"
            />
          </ValidationProvider>

          <ValidationProvider mode="eager"
                              rules="required"
                              name="city"
                              tag="div"
                              class="mb-6"
                              v-slot="{ errors }"
          >
            <v-text-field
              hide-details="auto"
              label="City"
              v-model="city"
              :error-messages="errors"
            />
          </ValidationProvider>

          <ValidationProvider mode="eager"
                              rules="required"
                              name="street"
                              tag="div"
                              class="mb-6"
                              v-slot="{ errors }"
          >
            <v-text-field
              hide-details="auto"
              label="Street"
              v-model="street"
              :error-messages="errors"
            />
          </ValidationProvider>

          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="primary darken-1" text type="submit">Save</v-btn>
          </v-card-actions>
        </form>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

export default {
  name: 'user-popup',
  props: {
    value: Boolean,
    editMode: Boolean,
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    username: '',
    email: '',
    city: '',
    street: '',
  }),
  watch: {
    value(value) {
      if (value) {
        this.setUserInfo();
      }
    },
  },
  methods: {
    onSubmit() {
    },
    close() {
      this.$emit('input', false);
    },
    onInput(value) {
      this.$emit('input', value);
    },
    setUserInfo() {
      if (typeof this.user === 'object') {
        if (Object.values(this.user).length) {
          this.username = this.user.username;
          this.email = this.user.email;
          this.city = this.user.address.city;
          this.street = this.user.address.street;
        } else {
          this.username = '';
          this.email = '';
          this.city = '';
          this.street = '';
        }
      }
    },
  },
  mounted() {
    extend('email', {
      ...email,
    });
    extend('required', {
      ...required,
      message: 'required field',
    });
  },
};
</script>

<style lang="scss">
  .v-input {
    height: 44px;
    position: relative;
  }
  .v-text-field__details{
    position: absolute;
    top: calc(100% + 2px);
  }
</style>
