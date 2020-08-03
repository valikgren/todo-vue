<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
    </v-app-bar>

    <v-main>
      <v-container class="container">
        <UsersList @userEdit="userEdit" @userAdd="userAdd" />
      </v-container>
    </v-main>

    <Popup
      v-model="isShowPopup"
      :edit-mode="!!Object.values(selectedUser).length"
      :user="selectedUser"
    />
  </v-app>
</template>

<script>
import UsersList from './components/UsersList.vue';
import Popup from './components/Popup.vue';

export default {
  name: 'App',

  components: {
    UsersList,
    Popup,
  },

  data: () => ({
    isShowPopup: false,
    selectedUser: {},
    //
  }),
  methods: {
    userEdit(user) {
      this.selectedUser = user;
      this.showPopup();
    },
    userAdd() {
      this.selectedUser = {};
      this.showPopup();
    },
    showPopup() {
      this.isShowPopup = true;
    },
    hidePopup() {
      this.isShowPopup = false;
    },
  },
};
</script>
