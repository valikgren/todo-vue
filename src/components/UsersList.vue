<template>
  <div>
    <v-text-field prepend-icon="mdi-magnify" v-model="search"/>
    <v-list two-line>
      <v-list-item-group>
        <template v-for="(user, index) in filteredList">
          <v-list-item two-line :key="index">
            <template>
              <v-list-item-avatar width="40" max-width="40" height="40">
                <v-img src="@/assets/default-ava.jpg" width="40" height="40" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="user.username" class="font-weight-medium"/>
                <v-list-item-subtitle class="text--primary" v-text="user.email" />
                <v-list-item-subtitle v-text="user.address.city + ', ' + user.address.street" />
              </v-list-item-content>
              <v-btn color="primary" fab x-small dark @click="editUser(user)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-list-item>
          <v-divider v-if="index + 1 < filteredList.length" :key="'divider-' + index" />
        </template>
      </v-list-item-group>
    </v-list>
    <p
      v-if="!filteredList || filteredList && !filteredList.length"
      class="grey--text text-center"
    >
      No result
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'users-list',
  data: () => ({
    search: '',
  }),
  computed: {
    ...mapState('user', ['userList', 'listLoading']),
    filteredList() {
      return this.userList.filter((_) => {
        if (!_.username) {
          return false;
        }
        return _.username.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions('user', ['getList']),
    editUser(user) {
      console.log(user);
    },
  },
};
</script>
