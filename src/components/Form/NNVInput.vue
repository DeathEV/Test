<template>
  <div class="form-item-box">
    <label class="form-item-label" :class="[errorMessage ? errorClass : '']">
      {{ label }}
    </label>
    <q-input class="form-item-input"
           :type="type || 'text'"
           :class="[errorMessage ? errorClass : '']"
           :disabled="disabled"
           :placeholder="placeholder"
           :value="modelValue"
           @input="updateModelValue"
           ref="mainInput"
    >
    </q-input>
    <p class="form-error-text" v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onMounted, ref} from "vue";
  export default defineComponent({
    props: {
      modelValue: {type: [String, Number], default: ''},
      label: {type: String, required: true},
      placeholder: String,
      type: String,
      errorMessage: String,
      disabled: {type: Boolean, default: false},
      isFocus: {type: Boolean, defatult: false}
    },
    emits: ['update:modelValue'],
    setup(props) {
      const errorClass = "form-error-text";
      const mainInput = ref(null);
      onMounted(() => {
        if (props.isFocus) {
          mainInput.value.focus();
        }
      });
      return {
        errorClass,
        mainInput
      }
    },
    methods: {
      updateModelValue(event) {
        this.$emit('update:modelValue', event.target.value);
      }
    }
  });
</script>
