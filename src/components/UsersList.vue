<template>
  <v-card class="user-list">
    <div class="user-list_search d-flex align-end">
      <v-text-field prepend-icon="mdi-magnify" v-model="search" class="mt-0" />
      <v-btn class="ml-5" color="green" fab small dark @click="userAdd()">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
    </div>

    <v-list two-line>
      <v-list-item v-for="(user, index) in filteredList" class="user-list_item" two-line :key="index" >
        <template>
          <v-list-item-avatar width="40" max-width="40" height="40">
            <v-img src="@/assets/default-ava.jpg" width="40" height="40" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="user.username" class="font-weight-medium"/>
            <v-list-item-subtitle class="text--primary" v-text="user.email" />
            <v-list-item-subtitle v-text="user.address.city + ', ' + user.address.street" />
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="primary" fab x-small dark @click="userEdit(user)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="mt-2" color="red" fab x-small dark @click="userDelete(user)">
              <v-icon>mdi-account-multiple-minus</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>

    <p
      v-if="!filteredList || filteredList && !filteredList.length"
      class="grey--text text-center pb-6"
    >
      No result
    </p>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

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
    ...mapMutations('user', ['deleteUser']),
    userEdit(user) {
      this.$emit('userEdit', user);
    },
    userAdd() {
      this.$emit('userAdd');
    },
    userDelete(user) {
      this.deleteUser(user);
    },
  },
};
</script>

<style lang="scss" scoped>
  .user-list {
    &_search {
      padding: 20px;
    }
    &_item {
      border-bottom: 1px solid #b8b8b8;
      &:nth-child(2n) {
        background-color: #f7f7f7;
      }
    }
  }
</style>
