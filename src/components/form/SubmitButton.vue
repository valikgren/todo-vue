<template>
  <div
    :class="{'is-requested' : isRequested}"
    class="submit-button"
  >
    <md-button
      class="submit-button_button"
      :type="type"
    >
      <slot />
      <div class="submit-button_loader">
        <!-- class="md-accent"-->
        <md-progress-spinner
          v-if="isRequested"
          :md-diameter="23"
          :md-stroke="3"
          md-mode="indeterminate"
        />
      </div>
    </md-button>
  </div>
</template>

<script>

export default {
  name: 'SubmitButton',
  components: {},
  props: {
    isRequested: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'submit',
    },
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style scoped lang="scss">
  @import '/~@/styles/varibles.scss';

  .submit-button {
    position: relative;
    &.is-requested {
      pointer-events: none;
      .submit-button_button {
        background: #aaaaaa;
      }
    }
    &_button {
      font-weight: 700;
      color: #fff;
      box-shadow: 0 10px 25px rgba(0,0,0,.25);
    }
    &_loader {
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translate(100%, -50%);
      margin-top: 1px;
    }
  }
</style>

<style lang="scss">
  .submit-button{
    &_button {
      .md-ripple {
        padding: 0 36px;
      }
    }
  }
</style>
