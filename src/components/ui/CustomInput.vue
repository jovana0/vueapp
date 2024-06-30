<template>
  <div class="custom-input">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.custom-input {
  margin-bottom: 1rem;
}
.custom-input label {
  display: block;
  margin-bottom: 0.5rem;
}
.custom-input input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.custom-input p {
  color: red;
  margin-top: 0.5rem;
}
</style>
