<template>
  <v-list two-line>
    <v-list-item-group active-class="secondary--text">
      <template v-for="(user, index) in filteredList">
        <a
          target="_blank"
          class="locale-editor_link"
          :href="'https://' + user.website"
          :key="user.title"
        >
          <v-list-item two-line :key="user.title">
            <template>
              <v-list-item-avatar width="40" max-width="40" height="40">
                <v-img src="@/assets/default-ava.jpg" width="40" height="40" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="user.username" />
                <v-list-item-subtitle class="text--primary" v-text="user.email" />
                <v-list-item-subtitle v-text="user.address.city" />
              </v-list-item-content>
            </template>
          </v-list-item>
        </a>
        <v-divider v-if="index + 1 < filteredList.length" :key="index" />
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'users-list',
  computed: {
    ...mapState('user', ['userList', 'listLoading']),
    filteredList() {
      return this.userList;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions('user', ['getList']),
  },
};
</script>
