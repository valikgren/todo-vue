<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dense
    >
      <h1 class="white--text">ToDo App</h1>
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
