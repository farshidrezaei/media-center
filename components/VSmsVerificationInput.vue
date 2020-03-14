<template>
  <v-row dense dir="ltr" justify="center" align="center">
    <v-col cols="2" v-for="(item, index) in amount" :key="`code_${index}`">
      <v-text-field
        solo-inverted
        dense
        class="code-input"
        :key="`code${index}`"
        :ref="`code_${index}`"
        @paste="handlePaste"
        title="code"
        maxlength="1"
        :autofocus="index === 0"
        @input="handleInput($event, index)"
        @keyup.delete="onDelete($event, index)"
        v-model="code[index]"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'VSmsVerificationInput',
  props: {
    amount: {
      type: Number,
      default: 6
    }
  },
  created() {
    this.code = new Array(this.amount).fill('')
  },
  methods: {
    handleInput($event, index) {
      this.currentIndex = index
      this.code[index] = this.validateNumber(this.code[index])
      if (this.code[index] !== '' && this.currentIndex <= this.amount - 1)
        this.currentIndex++
      if (this.currentIndex <= this.amount - 1)
        this.$refs['code_' + this.currentIndex][0].focus()
      if (this.currentIndex === this.amount) {
        this.$refs['code_' + --this.currentIndex][0].blur()
        if (!this.code.includes(''))
          this.$emit('codeEntered', this.code.join(''))
      }
    },
    onDelete($event, index) {
      if (this.currentIndex !== 0 && this.code[index] === '')
        this.currentIndex = index - 1
      if (this.currentIndex >= 0) {
        this.$refs['code_' + this.currentIndex][0].focus()
        this.code[this.currentIndex] = ''
      }
    },
    validateNumber(val) {
      return val.replace(/\D/g, '')
    },
    handlePaste($event) {
      $event.preventDefault()
      let value = $event.clipboardData.getData('Text')
      let code = value.split('')
      let status = false
      if (code.length === this.amount) {
        code.map((item, index) => {
          status = !!this.validateNumber(item)
        })
      }

      if (status) {
        this.code = code
        this.$refs.code_1[0].focus()
        this.$refs.code_1[0].blur()
      }
      console.log(status)
    }
  },
  data() {
    return {
      code: [],
      currentIndex: 0
    }
  }
}
</script>

<style scoped lang="scss">
.code-input {
  text-align: center !important;
  font-weight: bolder !important;
  font-size: 1.3rem !important;
}
</style>
